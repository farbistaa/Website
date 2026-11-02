// artifacts/api-server/src/routes/newsletter.ts
import { Router } from "express";
import { neon } from "@neondatabase/serverless";
import { resolveMx, resolve4, resolve6 } from "dns/promises";
import disposableDomains from "disposable-email-domains";
import { logger } from "../lib/logger";
import { sendNotificationEmail } from "../lib/mailer";

const router = Router();

const MAX_ATTEMPTS_PER_HOUR = 15;

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

// Premium Dark-Themed Email Template (matching About.tsx design)
const generateEmailTemplate = (title: string, content: string) => `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #08080f; padding: 40px 20px; margin: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
      <!-- Header -->
      <tr>
        <td style="background-color: #08080f; padding: 30px 40px; text-align: center; border-bottom: 2px solid #1e3a8a;">
          <h1 style="color: #ffffff; margin: 0; font-family: Georgia, serif; font-size: 28px; font-weight: bold;">Route 2 Migrate</h1>
          <p style="color: #94a3b8; margin: 8px 0 0; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase;">WebMail Service</p>
        </td>
      </tr>
      <!-- Body -->
      <tr>
        <td style="padding: 40px; background-color: #ffffff;">
          <h2 style="margin-top: 0; color: #08080f; font-family: Georgia, serif; font-size: 24px; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px;">${title}</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 15px; color: #4a5568;">
            ${content}
          </table>
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td style="background-color: #08080f; padding: 25px 40px; border-top: 1px solid #1e293b; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">This is an automated notification sent from the Route2Migrate WebMail Service.</p>
          <p style="margin: 10px 0 0; font-size: 12px; color: #94a3b8;">
            Designed and Engineered with <span style="color: #ef4444;">&#10084;</span> by 
            <a href="https://www.linkedin.com/in/farbista/" style="color: #3b82f6; text-decoration: none; font-weight: 600;">Foyaj Ahmmad Farabi</a>
          </p>
        </td>
      </tr>
    </table>
  </div>
`;

router.post("/subscribe", async (req, res): Promise<void> => {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      res.status(500).json({ error: "DATABASE_URL is not set" });
      return;
    }

    // Honeypot
    const honeypot = typeof req.body?.company === "string" ? req.body.company.trim() : "";
    if (honeypot) {
      res.status(200).json({ success: true, message: "Subscribed successfully" });
      return;
    }

    const ip = req.ip ?? "unknown";
    const body = req.body ?? {};
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const sql = neon(databaseUrl);

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const formatError = basicValidate(email);
    if (formatError) {
      res.status(400).json({ error: formatError });
      return;
    }

    const domain = email.slice(email.lastIndexOf("@") + 1);

    const typo = TYPO_DOMAINS[domain];
    if (typo) {
      res.status(400).json({ error: `Did you mean @${typo}? Please check the spelling.` });
      return;
    }

    if (disposableSet.has(domain)) {
      res.status(400).json({ error: "Temporary or disposable email addresses are not allowed." });
      return;
    }

    const canReceive = await domainCanReceiveMail(domain);
    if (!canReceive) {
      res.status(400).json({ error: "This email domain can't receive mail. Please check for typos." });
      return;
    }

    // Insert into database (ignoring conflicts if email already exists)
    await sql`
      INSERT INTO newsletter (email, source)
      VALUES (${email}, 'website')
      ON CONFLICT (email) DO NOTHING
    `;

    // Send beautiful email notification (Premium Design)
    const emailContent = `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
          <strong style="display: inline-block; width: 120px; color: #1e3a8a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email Address:</strong>
          <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0;">
          <strong style="display: inline-block; width: 120px; color: #1e3a8a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Source:</strong>
          Website Newsletter Form
        </td>
      </tr>
    `;

    await sendNotificationEmail({
      to: process.env.NOTIFICATION_EMAIL || "contact@rmigrate.ca",
      subject: `New Newsletter Subscriber: ${email}`,
      html: generateEmailTemplate("New Newsletter Subscription", emailContent),
    });

    res.status(200).json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    logger.error({ error }, "Newsletter Subscribe Error:");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;