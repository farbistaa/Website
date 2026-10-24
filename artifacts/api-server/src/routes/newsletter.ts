// artifacts/api-server/src/routes/newsletter.ts
import { Router, Request, Response } from "express";
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

function normalizeEmail(raw: string): string {
  const email = raw.trim().toLowerCase();
  const at = email.lastIndexOf("@");
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);

  if (domain === "gmail.com" || domain === "googlemail.com") {
    return `${local.split("+")[0].replace(/\\./g, "")}@gmail.com`;
  }
  return email;
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
// LOGO DISCOVERY + PUBLIC SERVING ENDPOINT
// =========================================================
const LOGO_FILENAME = "White_logo_With_Transparent_Backgrund_1782379235056.png";

function findLogoPath(): string | null {
  const candidates = [
    path.join(process.cwd(), "attached_assets", LOGO_FILENAME),
    path.join(process.cwd(), "artifacts", "route2migrate", "src", "attached_assets", LOGO_FILENAME),
    path.resolve(__dirname, "..", "..", "..", "artifacts", "route2migrate", "src", "attached_assets", LOGO_FILENAME),
    path.resolve(__dirname, "..", "..", "..", "attached_assets", LOGO_FILENAME),
    path.resolve(__dirname, "..", "..", "..", "..", "attached_assets", LOGO_FILENAME),
    path.join(process.cwd(), "artifacts", "route2migrate", "dist", "assets", LOGO_FILENAME),
    path.join(process.cwd(), "dist", "assets", LOGO_FILENAME),
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        return p;
      }
    } catch {
      // try next
    }
  }
  return null;
}

const LOGO_FILE = findLogoPath();

router.get("/email-logo", (_req: Request, res: Response) => {
  if (!LOGO_FILE) {
    return res.status(404).send("Logo not found");
  }
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.sendFile(path.resolve(LOGO_FILE));
});

function getLogoUrl(req: Request): string {
  if (process.env.LOGO_URL && /^https?:\/\//.test(process.env.LOGO_URL)) {
    return process.env.LOGO_URL;
  }
  if (!LOGO_FILE) return "";

  const siteUrl = process.env.SITE_URL || process.env.API_URL;
  if (siteUrl && /^https?:\/\//.test(siteUrl)) {
    return `${siteUrl.replace(/\/$/, "")}${req.baseUrl || ""}/email-logo`;
  }

  const proto =
    (req.headers["x-forwarded-proto"] as string) || req.protocol || "https";
  const host =
    (req.headers["x-forwarded-host"] as string) || req.get("host") || "";
  if (host) {
    return `${proto}://${host}${req.baseUrl || ""}/email-logo`;
  }
  return "";
}
// =========================================================

const generateEmailTemplate = (
  title: string,
  subtitle: string,
  content: string,
  ctaLink: string,
  ctaText: string,
  logoUrl: string
) => `
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

          <tr>
            <td style="padding:40px 40px 32px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);background-color:#0d0d18;">
              ${logoUrl
                ? `<img src="${logoUrl}" alt="Route 2 Migrate" width="200" style="width:200px;height:auto;margin:0 auto 24px;display:block;border:0;outline:none;text-decoration:none;" />`
                : `<h1 style="color:#ffffff;margin:0 0 24px;font-family:Georgia,serif;font-size:24px;font-weight:bold;letter-spacing:0.5px;">Route 2 Migrate</h1>`
              }
              <span style="display:inline-block;font-size:11px;color:#94a3b8;letter-spacing:2.5px;text-transform:uppercase;font-weight:700;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:8px 16px;border-radius:20px;">${subtitle}</span>
            </td>
          </tr>

          <tr>
            <td style="padding:48px 40px;background-color:#0d0d18;">
              <h2 style="margin:0 0 32px;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.4;border-bottom:2px solid #ef4444;display:inline-block;padding-bottom:12px;">${title}</h2>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#cbd5e1;background-color:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
                ${content}
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;">
                <tr>
                  <td align="center">
                    <a href="${ctaLink}" style="background-color:#ef4444;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:600;display:inline-block;box-shadow:0 4px 12px rgba(239,68,68,0.3);border:1px solid rgba(255,255,255,0.1);">${ctaText} &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color:#08080f;padding:32px 40px;border-top:1px solid rgba(255,255,255,0.08);text-align:center;">
              <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">This is an automated notification sent from the Route 2 Migrate WebMail Service.</p>
              <p style="margin:16px 0 0;font-size:12px;color:#64748b;">
                Designed and Engineered with <span style="color:#ef4444;">&#10084;</span> by
                <a href="https://www.linkedin.com/in/farbista/" style="color:#ffffff;text-decoration:none;font-weight:600;">Foyaj Ahmmad Farabi</a>
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

router.post("/subscribe", async (req, res): Promise<void> => {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      res.status(500).json({ error: "DATABASE_URL is not set" });
      return;
    }

    const honeypot = typeof req.body?.company === "string" ? req.body.company.trim() : "";
    if (honeypot) {
      res.status(200).json({ success: true, message: "Subscribed successfully" });
      return;
    }

    const forwardedFor = req.headers["x-forwarded-for"];
    const ip =
      (typeof forwardedFor === "string" ? forwardedFor.split(",")[0].trim() : "") ||
      req.ip ||
      "unknown";
    const body = req.body ?? {};
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const sql = neon(databaseUrl);

    if (Math.random() < 0.1) {
      await sql`DELETE FROM newsletter_attempts WHERE created_at < now() - interval '7 days'`;
    }

    const rateRows = await sql`
      SELECT COUNT(*)::int AS count FROM newsletter_attempts
      WHERE ip = ${ip} AND created_at > now() - interval '1 hour'
    `;
    if ((rateRows[0]?.count ?? 0) >= MAX_ATTEMPTS_PER_HOUR) {
      res.status(429).json({ error: "Too many attempts. Please try again later." });
      return;
    }

    const logAttempt = (em: string, outcome: string) =>
      sql`INSERT INTO newsletter_attempts (ip, email, outcome) VALUES (${ip}, ${em}, ${outcome})`;

    if (!email) {
      await logAttempt("", "invalid");
      res.status(400).json({ error: "Email is required" });
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
      res.status(400).json({ error: "Temporary or disposable email addresses are not allowed." });
      return;
    }

    const canReceive = await domainCanReceiveMail(domain);
    if (!canReceive) {
      await logAttempt(email, "invalid");
      res.status(400).json({ error: "This email domain can't receive mail. Please check for typos." });
      return;
    }

    const normalized = normalizeEmail(email);
    const inserted = await sql`
      INSERT INTO newsletter (email, source)
      VALUES (${normalized}, 'website')
      ON CONFLICT (email) DO NOTHING
      RETURNING email
    `;

    if (inserted.length === 0) {
      await logAttempt(normalized, "duplicate");
      res.status(200).json({ success: true, alreadySubscribed: true });
      return;
    }

    await logAttempt(normalized, "success");

    const emailContent = `
      <tr>
        <td style="padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="display:inline-block;width:120px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Email Address</span>
          <a href="mailto:${email}" style="color:#ef4444;text-decoration:none;font-weight:500;font-size:14px;">${email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px;">
          <span style="display:inline-block;width:120px;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Source</span>
          <span style="color:#ffffff;font-weight:500;font-size:14px;">Website Newsletter Form</span>
        </td>
      </tr>
    `;

    const logoUrl = getLogoUrl(req);

    await sendNotificationEmail({
      to: process.env.NOTIFICATION_EMAIL || "contact@rmigrate.ca",
      subject: `New Newsletter Subscriber: ${email}`,
      html: generateEmailTemplate("New Subscription Confirmed", "Newsletter Signup", emailContent, `mailto:${email}`, "Welcome Subscriber", logoUrl),
    });

    res.status(200).json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    logger.error({ error }, "Newsletter Subscribe Error:");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;