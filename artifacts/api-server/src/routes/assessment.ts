import { Router, Request, Response } from "express";
import { neon } from "@neondatabase/serverless";
import { resolveMx, resolve4, resolve6 } from "dns/promises";
import disposableDomains from "disposable-email-domains";
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

function escapeHtml(s: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Email template (maroon glassmorphism + white inner panel) ──
const generateEmailTemplate = (
  title: string,
  subtitle: string,
  content: string,
  ctaLink: string,
  ctaText: string
) => `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
  </style>
  <title>Route 2 Migrate — ${escapeHtml(title)}</title>
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings>
  </xml>
  <style>
    .glass-card { background-color:#5a1818 !important; border:1px solid #8a3838 !important; }
    .white-glass-panel { background-color:#f5f1f1 !important; border:1px solid #ffffff !important; }
    .pattern-overlay { display:none !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <!--[if mso]>
  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
    <v:fill type="gradient" color="#3b0a0a" color2="#7f1d1d" angle="135" />
  </v:background>
  <![endif]-->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#3b0a0a;background-image:linear-gradient(135deg, #3b0a0a 0%, #7f1d1d 50%, #3b0a0a 100%);padding:48px 24px;">
    <tr>
      <td align="center">
        <div style="position:relative;max-width:580px;margin:0 auto;">
          <div style="position:absolute;inset:0;opacity:0.1;background-image:repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 12px);background-size:12px 12px;pointer-events:none;border-radius:24px;" aria-hidden="true"></div>
          <table role="presentation" width="580" cellpadding="0" cellspacing="0" class="glass-card" style="position:relative;z-index:1;max-width:580px;width:100%;background-color:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:24px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.37);">
            <tr>
              <td style="padding:40px 40px 32px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.1);">
                <h1 style="color:#ffffff;margin:0 0 16px;font-family:'Poppins','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:28px;font-weight:700;letter-spacing:0.5px;">Route 2 Migrate</h1>
                <span style="display:inline-block;font-size:11px;color:rgba(255,255,255,0.7);letter-spacing:2.5px;text-transform:uppercase;font-weight:700;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);padding:8px 16px;border-radius:20px;">${escapeHtml(subtitle)}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:48px 40px;">
                <h2 style="margin:0 0 32px;color:#ffffff;font-family:'Poppins','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;line-height:1.4;text-align:center;font-weight:600;">${escapeHtml(title)}</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="white-glass-panel" style="font-size:14px;color:#3b0a0a;background-color:rgba(255,255,255,0.92);border-radius:12px;border:1px solid rgba(255,255,255,0.6);backdrop-filter:blur(10px);">
                  ${content}
                </table>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;">
                  <tr>
                    <td align="center">
                      <a href="${escapeHtml(ctaLink)}" style="background-color:#ffffff;color:#7f1d1d;text-decoration:none;padding:14px 36px;border-radius:999px;font-size:14px;font-weight:700;display:inline-block;border:1px solid rgba(255,255,255,0.6);box-shadow:0 4px 12px rgba(0,0,0,0.2);">${escapeHtml(ctaText)} &rarr;</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px;border-top:1px solid rgba(255,255,255,0.1);text-align:center;">
                <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.5);line-height:1.5;">This is an automated notification sent from the Route 2 Migrate WebMail Service.</p>
                <p style="margin:16px 0 0;font-size:12px;color:rgba(255,255,255,0.5);">
                  Designed and Engineered with <span style="color:#ef4444;">&#10084;</span> by
                  <a href="https://www.linkedin.com/in/farbista/" style="color:#ffffff;text-decoration:none;font-weight:600;">Foyaj Ahmmad Farabi</a>
                </p>
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;

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
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(59,10,10,0.08);"><span style="display:inline-block;width:140px;color:rgba(59,10,10,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Name</span> <span style="color:#3b0a0a;font-weight:500;font-size:14px;">${escapeHtml(fullName)}</span></td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(59,10,10,0.08);"><span style="display:inline-block;width:140px;color:rgba(59,10,10,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Email</span> <a href="mailto:${escapeHtml(email)}" style="color:#7f1d1d;text-decoration:none;font-weight:500;font-size:14px;">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(59,10,10,0.08);"><span style="display:inline-block;width:140px;color:rgba(59,10,10,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Phone</span> <span style="color:#3b0a0a;font-weight:500;font-size:14px;">${escapeHtml(phone)}</span></td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(59,10,10,0.08);"><span style="display:inline-block;width:140px;color:rgba(59,10,10,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Country</span> <span style="color:#3b0a0a;font-weight:500;font-size:14px;">${escapeHtml(country)}</span></td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(59,10,10,0.08);"><span style="display:inline-block;width:140px;color:rgba(59,10,10,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Status</span> <span style="color:#3b0a0a;font-weight:500;font-size:14px;">${escapeHtml(immigrationStatus)}</span></td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid rgba(59,10,10,0.08);"><span style="display:inline-block;width:140px;color:rgba(59,10,10,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Service</span> <span style="color:#3b0a0a;font-weight:500;font-size:14px;">${escapeHtml(service)}</span></td></tr>
      <tr><td style="padding:16px 24px;"><span style="display:inline-block;width:140px;color:rgba(59,10,10,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;vertical-align:top;">Description</span> <span style="display:inline-block;max-width:360px;line-height:1.6;color:rgba(59,10,10,0.85);font-size:14px;">${escapeHtml(description) || "N/A"}</span></td></tr>
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