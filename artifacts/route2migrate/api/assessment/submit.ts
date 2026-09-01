// artifacts/route2migrate/api/assessment/submit.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return res.status(500).json({ error: "DATABASE_URL is not set" });
    }

    const { fullName, email, phone, country, immigrationStatus, service, description } =
      req.body ?? {};

    if (!fullName || !email || !phone || !country || !immigrationStatus || !service) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = neon(databaseUrl);

    const result = await sql`
      INSERT INTO assessment
        (full_name, email, phone, country, immigration_status, services, description)
      VALUES
        (${fullName}, ${email}, ${phone}, ${country}, ${immigrationStatus}, ${service}, ${description ?? ''})
      RETURNING id
    `;

    return res.status(200).json({ success: true, id: result[0].id });
  } catch (error) {
    console.error("Assessment Submit Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}