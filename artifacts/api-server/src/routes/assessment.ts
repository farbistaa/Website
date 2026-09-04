// artifacts/api-server/src/routes/assessment.ts
import { Router } from "express";
import { neon } from "@neondatabase/serverless";
import { resolveMx, resolve4, resolve6 } from "dns/promises";
import disposableDomains from "disposable-email-domains";

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

router.post("/submit", async (req, res): Promise<void> => {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      res.status(500).json({ error: "DATABASE_URL is not set" });
      return;
    }

    // Honeypot — silent fake success for bots
    const honeypot = typeof req.body?.company === "string" ? req.body.company.trim() : "";
    if (honeypot) {
      res.status(200).json({ success: true, id: 0 });
      return;
    }

    const ip = req.ip ?? "unknown";

    const body = req.body ?? {};
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const country = typeof body.country === "string" ? body.country.trim() : "";
    const immigrationStatus =
      typeof body.immigrationStatus === "string" ? body.immigrationStatus.trim() : "";
    const service = typeof body.service === "string" ? body.service.trim() : "";
    const description =
      typeof body.description === "string" ? body.description.slice(0, 2000) : "";

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
    res.status(200).json({ success: true, id: result[0].id });
  } catch (error) {
    console.error("Assessment Submit Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;