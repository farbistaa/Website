// artifacts/api-server/src/routes/assessment.ts
import { Router } from "express";
import { neon } from "@neondatabase/serverless";
import { resolveMx, resolve4, resolve6 } from "dns/promises";
import disposableDomains from "disposable-email-domains";
import fs from "fs";
import path from "path";
import { logger } from "../lib/logger";
import { sendNotificationEmail } from "../lib/mailer";

const router = Router();

const MAX_ATTEMPTS_PER_HOUR = 10;

const CUSTOM_DISPOSABLE = [
  "tempmail.com", "temp-mail.org", "tempmail.plus", "tempmailo.com",
  "tmailor.com", "tmpmail.org", "tmpmail.net", "tempmail.dev",
  "10minutemail.com", "10minutemail.net", "maildrop.cc", "trashmail.com",
  "throwawaymail.com", "getnada.com", "dispostable.com", "sharklasers.com",
  "mailnesia.com", "mohmal.com", "emailondeck.com", "fakeinbox.com",
  "mytemp.email", "moakt.com", "mailsac.com", "grr.la", "spam4.me",
  "yopmail.com", "yopmail.net", "cool.fr.nf", "jetable.org", "nospam.ze.tc",
];

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const disposableSet = new Set(
  [...disposableDomains, ...CUSTOM_DISPOSABLE].map((d) => d.toLowerCase())
);

const TYPO_DOMAINS: Record<string, string> = {
  "gmai.com": "gmail.com", "gmial.com": "gmail.com", "gnail.com": "gmail.com",
  "gmail.co": "gmail.com", "gmail.cm": "gmail.com", "gmaill.com": "gmail.com",
  "hotmial.com": "hotmail.com", "hotmail.co": "hotmail.com",
  "outlok.com": "outlook.com", "outllook.com": "outlook.com",
  "yaho.com": "yahoo.com", "yahooo.com": "yahoo.com",
  "iclod.com": "icloud.com", "icloud.co": "icloud.com",
};

function basicValidate(email: string): string | null {
  if (email.length > 254) return "Email address is too long.";
  const at = email.lastIndexOf("@");
  if (at <= 0 || at === email.length - 1) return "Please enter a valid email address.";
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (!local || local.length > 64 || domain.length > 253)
    return "Please enter a valid email address.";
  if (local.startsWith(".") || local.endsWith(".") || local.includes(".."))
    return "Please enter a valid email address.";
  if (!EMAIL_RE.test(email)) return "Please enter a valid email address.";
  return null;
}

async function domainCanReceiveMail(domain: string): Promise<boolean> {
  try {
    const mx = await resolveMx(domain);
    return mx.length > 0;
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code === "ENODATA") {
      const [a, aaaa] = await Promise.all([
        resolve4(domain).catch(() => [] as string[]),
        resolve6(domain).catch(() => [] as string[]),
      ]);
      return a.length > 0 || aaaa.length > 0;
    }
    if (code === "ENOTFOUND") return false;
    return true;
  }
}

// =========================================================
// PREMIUM SAAS EMAIL TEMPLATE (GRADIENT BG + DISTINCT WHITE CARD)
// =========================================================
let logoSrc = "";
const logoPaths = [
  path.join(process.cwd(), "attached_assets", "White_logo_With_Transparent_Backgrund_1782379235056.png"),
  path.join(process.cwd(), "artifacts", "route2migrate", "src", "attached_assets", "White_logo_With_Transparent_Backgrund_1782379235056.png")
];

for (const p of logoPaths) {
  try {
    if (fs.existsSync(p)) {
      const base64 = fs.readFileSync(p).toString("base64");
      logoSrc = `data:image/png;base64,${base64}`;
      break;
    }
  } catch (err) {
    // silent fail
  }
}

const generateEmailTemplate = (title: string, subtitle: string, content: string, ctaLink: string, ctaText: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
      .btn:hover { transform: scale(1.05); }
    </style>
  </head>
  <body style="margin: 0; padding: 0; -webkit-font-smoothing: antialiased; background-color: #3b0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <!-- Outer Table: Applies Gradient + Stripe Background -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #3b0a0a; background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 12px), linear-gradient(135deg, #3b0a0a 0%, #7f1d1d 50%, #3b0a0a 100%); padding: 48px 24px;">
      <tr>
        <td align="center">
          <!-- Inner Container: Solid White Card for Distinct Readability -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); overflow: hidden; border-collapse: separate;">
            
            <!-- Header -->
            <tr>
              <td style="padding: 40px 40px 24px 40px; border-bottom: 1px solid #f3f4f6; text-align: center;">
                ${logoSrc ? `<img src="${logoSrc}" alt="Route 2 Migrate" style="width: 180px; height: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;" />` : `<h1 style="color: #800000; margin: 0 0 20px; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; font-family: Georgia, 'Times New Roman', serif;">Route 2 Migrate</h1>`}
                <span style="display: inline-block; font-size: 11px; color: #800000; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 700; background: #fdf2f2; border: 1px solid #fadada; padding: 6px 16px; border-radius: 50px;">${subtitle}</span>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 32px 40px 16px 40px;">
                <!-- Using Georgia Serif font exactly like the font-serif class in the CTA -->
                <h2 style="margin: 0 0 24px 0; color: #111827; font-size: 24px; line-height: 1.3; font-weight: 700; letter-spacing: -0.5px; font-family: Georgia, 'Times New Roman', serif;">${title}</h2>
                
                <!-- Data Table inside Light Gray Box -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9fafb; border-radius: 12px; border: 1px solid #f3f4f6;">
                  <tr>
                    <td style="padding: 8px 24px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        ${content}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA Section -->
            <tr>
              <td style="padding: 24px 40px 40px 40px; text-align: center;">
                <a href="${ctaLink}" class="btn" style="background-color: #800000; color: #ffffff; text-decoration: none; padding: 14px 36px; border-radius: 8px; font-size: 14px; font-weight: 700; display: inline-block; box-shadow: 0 4px 6px rgba(128,0,0,0.2);">
                  ${ctaText} &rarr;
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #6b7280; line-height: 1.5;">This is an automated notification sent from the Route 2 Migrate WebMail Service.</p>
                <p style="margin: 8px 0 0; font-size: 12px; color: #6b7280;">
                  Designed and Engineered with <span style="color: #800000;">&#10084;</span> by 
                  <a href="https://www.linkedin.com/in/farbista/" style="color: #111827; text-decoration: none; font-weight: 600;">Foyaj Ahmmad Farabi</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;
// =========================================================

router.post("/submit", async (req, res): Promise<void> => {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      res.status(500).json({ error: "DATABASE_URL is not set" });
      return;
    }

    const honeypot = typeof req.body?.company === "string" ? req.body.company.trim() : "";
    if (honeypot) {
      res.status(200).json({ success: true, id: 0 });
      return;
    }

    const ip = req.ip ?? "unknown";

    const body = req.body ?? {};
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const country = typeof body.country === "string" ? body.country.trim() : "";
    const immigrationStatus = typeof body.immigrationStatus === "string" ? body.immigrationStatus.trim() : "";
    const service = typeof body.service === "string" ? body.service.trim() : "";
    const description = typeof body.description === "string" ? body.description.slice(0, 2000) : "";

    const sql = neon(databaseUrl);

    const logAttempt = (em: string, outcome: string) =>
      sql`INSERT INTO assessment_attempts (ip, email, outcome) VALUES (${ip}, ${em}, ${outcome})`;

    if (Math.random() < 0.1) {
      await sql`DELETE FROM assessment_attempts WHERE created_at < now() - interval '7 days'`;
    }

    const rateRows = await sql`
      SELECT COUNT(*)::int AS count FROM assessment_attempts
      WHERE ip = ${ip} AND created_at > now() - interval '1 hour'
    `;
    if ((rateRows[0]?.count ?? 0) >= MAX_ATTEMPTS_PER_HOUR) {
      res.status(429).json({ error: "Too many attempts. Please try again later." });
      return;
    }

    if (!fullName || !email || !phone || !country || !immigrationStatus || !service) {
      await logAttempt(email, "invalid");
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    if (fullName.length > 100 || phone.length > 30 || country.length > 100) {
      await logAttempt(email, "invalid");
      res.status(400).json({ error: "One or more fields are too long." });
      return;
    }

    const formatError = basicValidate(email);
    if (formatError) {
      await logAttempt(email, "invalid");
      res.status(400).json({ error: formatError });
      return;
    }

    const domain = email.slice(email.lastIndexOf("@") + 1);

    const typo = TYPO_DOMAINS[domain];
    if (typo) {
      await logAttempt(email, "invalid");
      res.status(400).json({ error: `Did you mean @${typo}? Please check the spelling.` });
      return;
    }

    if (disposableSet.has(domain)) {
      await logAttempt(email, "blocked");
      res.status(400).json({ error: "Temporary or disposable email addresses are not allowed. Please use your permanent email address." });
      return;
    }

    const canReceive = await domainCanReceiveMail(domain);
    if (!canReceive) {
      await logAttempt(email, "invalid");
      res.status(400).json({ error: "This email domain can't receive mail. Please check for typos." });
      return;
    }

    const result = await sql`
      INSERT INTO assessment
        (full_name, email, phone, country, immigration_status, services, description)
      VALUES
        (${fullName}, ${email}, ${phone}, ${country}, ${immigrationStatus}, ${service}, ${description})
      RETURNING id
    `;

    await logAttempt(email, "success");

    const emailContent = `
      <tr><td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6;"><span style="display: inline-block; width: 140px; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Name</span> <span style="color: #111827; font-weight: 500; font-size: 14px;">${fullName}</span></td></tr>
      <tr><td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6;"><span style="display: inline-block; width: 140px; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Email</span> <a href="mailto:${email}" style="color: #800000; text-decoration: none; font-weight: 600; font-size: 14px;">${email}</a></td></tr>
      <tr><td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6;"><span style="display: inline-block; width: 140px; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Phone</span> <span style="color: #111827; font-weight: 500; font-size: 14px;">${phone}</span></td></tr>
      <tr><td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6;"><span style="display: inline-block; width: 140px; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Country</span> <span style="color: #111827; font-weight: 500; font-size: 14px;">${country}</span></td></tr>
      <tr><td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6;"><span style="display: inline-block; width: 140px; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Status</span> <span style="color: #111827; font-weight: 500; font-size: 14px;">${immigrationStatus}</span></td></tr>
      <tr><td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6;"><span style="display: inline-block; width: 140px; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Service</span> <span style="color: #111827; font-weight: 500; font-size: 14px;">${service}</span></td></tr>
      <tr><td style="padding: 14px 0;"><span style="display: inline-block; width: 140px; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; vertical-align: top;">Description</span> <span style="display: inline-block; max-width: 340px; line-height: 1.6; color: #374151; font-size: 14px;">${description || 'N/A'}</span></td></tr>
    `;

    await sendNotificationEmail({
      to: process.env.NOTIFICATION_EMAIL || "contact@rmigrate.ca",
      subject: `New Assessment Submission: ${fullName}`,
      html: generateEmailTemplate("New Client Assessment Details", "Assessment Form Submitted", emailContent, `mailto:${email}`, "Reply to Client"),
    });

    res.status(200).json({ success: true, id: result[0].id });
  } catch (error) {
    logger.error({ error }, "Assessment Submit Error:");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;