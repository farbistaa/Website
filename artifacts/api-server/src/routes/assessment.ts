// artifacts/api-server/src/routes/assessment.ts
import { Router } from "express";
import { neon } from "@neondatabase/serverless";

const router = Router();

router.post("/submit", async (req, res): Promise<void> => {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      res.status(500).json({ error: "DATABASE_URL is not set" });
      return; // Fix: return to stop execution
    }

    const sql = neon(databaseUrl);

    const {
      fullName,
      email,
      phone,
      country,
      immigrationStatus,
      service,
      description
    } = req.body;

    if (!service) {
      res.status(400).json({ error: "Service is required" });
      return; // Fix: return to stop execution
    }

    const result = await sql`
      INSERT INTO assessment (
        full_name, email, phone, country, immigration_status, services, description
      ) 
      VALUES (
        ${fullName}, ${email}, ${phone}, ${country}, ${immigrationStatus}, ${service}, ${description ?? ''}
      )
      RETURNING id;
    `;

    res.status(200).json({ success: true, id: result[0].id });
  } catch (error) {
    console.error("Assessment Submit Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;