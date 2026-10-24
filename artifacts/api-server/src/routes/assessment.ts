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
// PREMIUM SAAS EMAIL TEMPLATE — PRODUCTION READY
// Priority 1: LOGO_URL env var (works in ALL email clients)
// Priority 2: base64 fallback (dev only — Gmail/Outlook strip it)
// Priority 3: text header fallback
// =========================================================
function resolveLogo(): string {
  // 1. Public URL — always works in all clients
  const envUrl = process.env.LOGO_URL;
  if (envUrl && /^https?:\/\//.test(envUrl)) return envUrl;

  // 2. Local base64 fallback (dev only)
  const logoPaths = [
    path.join(process.cwd(), "attached_assets", "White_logo_With_Transparent_Backgrund_1782379235056.png"),
    path.join(process.cwd(), "artifacts", "route2migrate", "src", "attached_assets", "White_logo_With_Transparent_Backgrund_1782379235056.png"),
  ];
  for (const p of logoPaths) {
    try {
      if (fs.existsSync(p)) {
        return `data:image/png;base64,${fs.readFileSync(p).toString("base64")}`;
      }
    } catch {
      // try next
    }
  }
  // 3. Empty -> template renders text header fallback
  return "";
}
const logoSrc = resolveLogo();

const SITE_URL = process.env.SITE_URL || "https://rmigrate.ca";

const generateEmailTemplate = (title: string, subtitle: string, content: string, ctaLink: string, ctaText: string) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <title>Route 2 Migrate — ${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#08080f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#08080f;padding:48px 24px;">
    <tr>
      <td align="center">
        <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:580px;background-color:#0d0d18;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);box-shadow:0 20px 40px rgba(0,0,0,0.4);">

          <!-- HEADER -->
          <tr>
            <td style="padding:40px 40px 32px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);background-color:#0d0d18;">
              ${logoSrc
                ? `<img src="${logoSrc}" alt="Route 2 Migrate" width="200" style="width:200px;height:auto;margin:0 auto 24px;display:block;border:0;outline:none;text-decoration:none;" />`
                : `<h1 style="color:#ffffff;margin:0 0 24px;font-family:Georgia,serif;font-size:24px;font-weight:bold;letter-spacing:0.5px;">Route 2 Migrate</h1>`
              }
              <span style="display:inline-block;font-size:11px;color:#94a3b8;letter-spacing:2.5px;text-transform:uppercase;font-weight:700;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:8px 16px;border-radius:20px;">${subtitle}</span>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:48px 40px;background-color:#0d0d18;">
              <h2 style="margin:0 0 32px;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.4;border-bottom:2px solid #ef4444;display:inline-block;padding-bottom:12px;">${title}</h2>

              <!-- Glass Data Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#cbd5e1;background-color:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
                ${content}
              </table>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;">
                <tr>
                  <td align="center">
                    <a href="${ctaLink}" style="background-color:#ef4444;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:600;display:inline-block;box-shadow:0 4px 12px rgba(239,68,68,0.3);border:1px solid rgba(255,255,255,0.1);">${ctaText} &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#08080f;padding:32px 40px;border-top:1px solid rgba(255,255,255,0.08);text-align:center;">
              <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">This is an automated notification sent from the Route 2 Migrate WebMail Service.</p>
              <p style="margin:16px 0 0;font-size:12px;color:#64748b;">
                Designed and Engineered with <span style="color:#ef4444;">&#10084;</span> by
                <a href="https://www.linkedin.com/in/farbista/" style="color:#ffffff;text-decoration:none;font-weight:600;">Foyaj Ahmmad Farabi</a>
              </p>
              <p style="margin:16px 0 0;font-size:11px;color:#475569;">
                <a href="${SITE_URL}" style="color:#475569;text-decoration:none;">${SITE_URL.replace(/^https?:\/\//, '')}</a>
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
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06);"><span style="display:inline-block;width:140px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Name</span> <span style="color:#ffffff;font-weight:500;font-size:14px;">${fullName}</span></td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06);"><span style="display:inline-block;width:140px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Email</span> <a href="mailto:${email}" style="color:#ef4444;text-decoration:none;font-weight:500;font-size:14px;">${email}</a></td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06);"><span style="display:inline-block;width:140px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Phone</span> <span style="color:#ffffff;font-weight:500;font-size:14px;">${phone}</span></td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06);"><span style="display:inline-block;width:140px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Country</span> <span style="color:#ffffff;font-weight:500;font-size:14px;">${country}</span></td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06);"><span style="display:inline-block;width:140px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Status</span> <span style="color:#ffffff;font-weight:500;font-size:14px;">${immigrationStatus}</span></td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06);"><span style="display:inline-block;width:140px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Service</span> <span style="color:#ffffff;font-weight:500;font-size:14px;">${service}</span></td></tr>
      <tr><td style="padding:16px 24px;"><span style="display:inline-block;width:140px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;vertical-align:top;">Description</span> <span style="display:inline-block;max-width:360px;line-height:1.6;color:#cbd5e1;font-size:14px;">${description || 'N/A'}</span></td></tr>
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