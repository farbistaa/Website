// artifacts/route2migrate/api/assessment/submit.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { resolveMx, resolve4, resolve6 } from "dns/promises";
import { createRequire } from "module";

// ── Config ─────────────────────────────────────────────────────────
const MAX_ATTEMPTS_PER_HOUR = 10;

// Well-known disposable domains missing from (or added later than) the npm blocklist.
const CUSTOM_DISPOSABLE = [
  "tempmail.com", "temp-mail.org", "tempmail.plus", "tempmailo.com",
  "tmailor.com", "tmpmail.org", "tmpmail.net", "tempmail.dev",
  "10minutemail.com", "10minutemail.net", "maildrop.cc", "trashmail.com",
  "throwawaymail.com", "getnada.com", "dispostable.com", "sharklasers.com",
  "mailnesia.com", "mohmal.com", "emailondeck.com", "fakeinbox.com",
  "mytemp.email", "moakt.com", "mailsac.com", "grr.la", "spam4.me",
  "yopmail.com", "yopmail.net", "cool.fr.nf", "jetable.org", "nospam.ze.tc",
];

// The disposable-email-domains package's entry point is a raw .json file.
// Node's ESM loader refuses JSON imports without `with { type: "json" }`
// (ERR_IMPORT_ATTRIBUTE_MISSING) — which crashes the function on Vercel.
// CJS require handles JSON natively. try/catch keeps the function alive
// even if the list fails to load (CUSTOM_DISPOSABLE still applies).
const require = createRequire(import.meta.url);

let disposableList: string[] = [];
try {
  const loaded: unknown = require("disposable-email-domains");
  const unwrapped = (loaded as { default?: unknown })?.default ?? loaded;
  if (Array.isArray(unwrapped)) disposableList = unwrapped as string[];
} catch (err) {
  console.error("Failed to load disposable-email-domains list:", err);
}

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const disposableSet = new Set(
  [...disposableList, ...CUSTOM_DISPOSABLE].map((d) => d.toLowerCase())
);

const TYPO_DOMAINS: Record<string, string> = {
  "gmai.com": "gmail.com", "gmial.com": "gmail.com", "gnail.com": "gmail.com",
  "gmail.co": "gmail.com", "gmail.cm": "gmail.com", "gmaill.com": "gmail.com",
  "hotmial.com": "hotmail.com", "hotmail.co": "hotmail.com",
  "outlok.com": "outlook.com", "outllook.com": "outlook.com",
  "yaho.com": "yahoo.com", "yahooo.com": "yahoo.com",
  "iclod.com": "icloud.com", "icloud.co": "icloud.com",
};

// ── Helpers ────────────────────────────────────────────────────────
function getClientIp(req: VercelRequest): string {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress ?? "unknown";
}

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

/** Can this domain actually receive email? (MX record, with A/AAAA fallback) */
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
    return true; // transient DNS problem — don't block a possibly-real lead
  }
}

// ── Handler ────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return res.status(500).json({ error: "DATABASE_URL is not set" });
    }

    const sql = neon(databaseUrl);

    // 1) Honeypot — hidden field humans never fill. If filled → bot.
    //    Return fake success so bots move on, without touching the DB.
    const honeypot =
      typeof req.body?.company === "string" ? req.body.company.trim() : "";
    if (honeypot) {
      return res.status(200).json({ success: true, id: 0 });
    }

    const ip = getClientIp(req);

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

    const logAttempt = (em: string, outcome: string) =>
      sql`INSERT INTO assessment_attempts (ip, email, outcome) VALUES (${ip}, ${em}, ${outcome})`;

    // Occasional cleanup of old attempt rows (7-day window)
    if (Math.random() < 0.1) {
      await sql`DELETE FROM assessment_attempts WHERE created_at < now() - interval '7 days'`;
    }

    // 2) Rate limit: max attempts per IP per hour (counts ALL attempts)
    const rateRows = await sql`
      SELECT COUNT(*)::int AS count FROM assessment_attempts
      WHERE ip = ${ip} AND created_at > now() - interval '1 hour'
    `;
    if ((rateRows[0]?.count ?? 0) >= MAX_ATTEMPTS_PER_HOUR) {
      return res.status(429).json({ error: "Too many attempts. Please try again later." });
    }

    // 3) Required fields
    if (!fullName || !email || !phone || !country || !immigrationStatus || !service) {
      await logAttempt(email, "invalid");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Sanity limits on free-text fields
    if (fullName.length > 100 || phone.length > 30 || country.length > 100) {
      await logAttempt(email, "invalid");
      return res.status(400).json({ error: "One or more fields are too long." });
    }

    // 4) Email format validation
    const formatError = basicValidate(email);
    if (formatError) {
      await logAttempt(email, "invalid");
      return res.status(400).json({ error: formatError });
    }

    const domain = email.slice(email.lastIndexOf("@") + 1);

    // 5) Typo check ("did you mean…?")
    const typo = TYPO_DOMAINS[domain];
    if (typo) {
      await logAttempt(email, "invalid");
      return res.status(400).json({ error: `Did you mean @${typo}? Please check the spelling.` });
    }

    // 6) Disposable/temporary domain blocklist
    if (disposableSet.has(domain)) {
      await logAttempt(email, "blocked");
      return res.status(400).json({ error: "Temporary or disposable email addresses are not allowed. Please use your permanent email address." });
    }

    // 7) MX check — domain must be able to receive mail
    const canReceive = await domainCanReceiveMail(domain);
    if (!canReceive) {
      await logAttempt(email, "invalid");
      return res.status(400).json({ error: "This email domain can't receive mail. Please check for typos." });
    }

    // 8) Insert — email stored EXACTLY as typed (trimmed + lowercased),
    //    no Gmail dot-stripping: this is a lead we need to contact, and
    //    duplicates are legitimate (people resubmit).
    const result = await sql`
      INSERT INTO assessment
        (full_name, email, phone, country, immigration_status, services, description)
      VALUES
        (${fullName}, ${email}, ${phone}, ${country}, ${immigrationStatus}, ${service}, ${description})
      RETURNING id
    `;

    await logAttempt(email, "success");
    return res.status(200).json({ success: true, id: result[0].id });
  } catch (error) {
    console.error("Assessment Submit Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}