// artifacts/api-server/src/routes/newsletter.ts
import { Router, type IRouter } from "express";
import { neon } from "@neondatabase/serverless";

const router: IRouter = Router();

router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const databaseUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
    if (!databaseUrl) throw new Error("Database URL is missing");

    const sql = neon(databaseUrl);

    // Insert email into your database (change table name if needed)
    await sql`
      INSERT INTO newsletter_subscribers (email)
      VALUES (${email})
      ON CONFLICT DO NOTHING
    `;

    res.json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Newsletter Error:", error);
    res.status(500).json({ error: "Failed to subscribe. Please try again." });
  }
});

export default router;