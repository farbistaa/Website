// artifacts/route2migrate/api/newsletter/subscribe.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { resolveMx, resolve4, resolve6 } from "dns/promises";
import { createRequire } from "module";

// ── Config ─────────────────────────────────────────────────────────
const MAX_ATTEMPTS_PER_HOUR = 10;

// Well-known disposable domains missing from (or added later than) the npm blocklist.
// Extend this freely — anything here is blocked instantly.
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
// Node's ESM loader refuses to import JSON without `with { type: "json" }`
// (ERR_IMPORT_ATTRIBUTE_MISSING), which crashes the function on Vercel.
// Loading it via CJS require handles JSON natively and works regardless of
// how the function is bundled. Wrapped in try/catch so the function stays
// alive even if the list fails to load (CUSTOM_DISPOSABLE still applies).
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

// npm blocklist (121k+ domains) + our custom list, deduped by the Set
const disposableSet = new Set(
  [...disposableList, ...CUSTOM_DISPOSABLE].map((d) => d.toLowerCase())
);

// Common misspelled domains → suggested correction
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

/**
 * Lowercase/trim. For Gmail only: strip dots and +tags
 * (Gmail ignores them — same inbox). NEVER touch other providers:
 * dots/+ are real characters there (john.smith@yahoo.com ≠ johnsmith@).
 */
function normalizeEmail(raw: string): string {
  const email = raw.trim().toLowerCase();
  const at = email.lastIndexOf("@");
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);

  if (domain === "gmail.com" || domain === "googlemail.com") {
    const cleaned = local.split("+")[0].replace(/\./g, "");
    return `${cleaned}@gmail.com`;
  }
  return email;
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
      // Domain exists but no MX — check direct A/AAAA delivery (RFC 5321)
      const [a, aaaa] = await Promise.all([
        resolve4(domain).catch(() => [] as string[]),
        resolve6(domain).catch(() => [] as string[]),
      ]);
      return a.length > 0 || aaaa.length > 0;
    }
    if (code === "ENOTFOUND") return false; // domain doesn't exist
    return true; // transient DNS problem — don't block a possibly-real user
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
      return res.status(200).json({ success: true });
    }

    const rawEmail = typeof req.body?.email === "string" ? req.body.email : "";
    const ip = getClientIp(req);

    // Occasional cleanup of old attempt rows (keeps table small, 7-day window)
    if (Math.random() < 0.1) {
      await sql`DELETE FROM newsletter_attempts WHERE created_at < now() - interval '7 days'`;
    }

    // 2) Rate limit: max attempts per IP per hour (counts ALL attempts,
    //    including invalid ones, so probing scripts get throttled too)
    const rateRows = await sql`
      SELECT COUNT(*)::int AS count FROM newsletter_attempts
      WHERE ip = ${ip} AND created_at > now() - interval '1 hour'
    `;
    if ((rateRows[0]?.count ?? 0) >= MAX_ATTEMPTS_PER_HOUR) {
      return res.status(429).json({ error: "Too many attempts. Please try again later." });
    }

    const logAttempt = (email: string, outcome: string) =>
      sql`INSERT INTO newsletter_attempts (ip, email, outcome) VALUES (${ip}, ${email}, ${outcome})`;

    // 3) Format validation
    if (!rawEmail) {
      await logAttempt("", "invalid");
      return res.status(400).json({ error: "Please enter your email address." });
    }
    const email = rawEmail.trim().toLowerCase();
    const formatError = basicValidate(email);
    if (formatError) {
      await logAttempt(email, "invalid");
      return res.status(400).json({ error: formatError });
    }

    const domain = email.slice(email.lastIndexOf("@") + 1);

    // 4) Typo check ("did you mean…?")
    const typo = TYPO_DOMAINS[domain];
    if (typo) {
      await logAttempt(email, "invalid");
      return res.status(400).json({ error: `Did you mean @${typo}? Please check the spelling.` });
    }

    // 5) Disposable/temporary domain blocklist (npm list + custom list)
    if (disposableSet.has(domain)) {
      await logAttempt(email, "blocked");
      return res.status(400).json({ error: "Temporary or disposable email addresses are not allowed." });
    }

    // 6) MX check — domain must be able to receive mail
    const canReceive = await domainCanReceiveMail(domain);
    if (!canReceive) {
      await logAttempt(email, "invalid");
      return res.status(400).json({ error: "This email domain can't receive mail. Please check for typos." });
    }

    // 7) Normalize (Gmail only) and insert
    const normalized = normalizeEmail(email);
    try {
      await sql`
        INSERT INTO newsletter (email, source) VALUES (${normalized}, 'website')
      `;
      await logAttempt(normalized, "success");
      return res.status(200).json({ success: true });
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      const isUniqueViolation =
        e?.code === "23505" || /duplicate key|unique constraint/i.test(e?.message ?? "");
      if (isUniqueViolation) {
        await logAttempt(normalized, "duplicate");
        return res.status(200).json({ success: true, alreadySubscribed: true });
      }
      throw err;
    }
  } catch (error) {
    console.error("Newsletter Subscribe Error:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}