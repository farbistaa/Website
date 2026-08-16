// @ts-ignore
import express, { Request, Response } from "express";
// Use require to avoid TypeScript complaint if the package isn't in @types
// @ts-ignore
const { clerkClient } = require("@clerk/clerk-sdk-node");
// Use require to avoid TypeScript complaint if the package isn't in @types
// @ts-ignore
const cors = require("cors");
// Use require to avoid TypeScript complaint if the package isn't in @types
// This keeps the runtime behavior the same while preventing TS module resolution errors
// @ts-ignore
const { neon } = require("@neondatabase/serverless");

declare const process: {
  env: {
    DATABASE_URL?: string;
    PORT?: string;
    CLERK_SECRET_KEY?: string;
  };
};

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allow your React frontend to connect
app.use(express.json()); // Parse JSON bodies

const sql = neon(process.env.DATABASE_URL!);

// GET: Fetch comments for a specific blog post
app.get("/api/comments", async (req: Request, res: Response) => {
  try {
    const { slug } = req.query;
    if (!slug || typeof slug !== "string") {
      return res.status(400).json({ error: "Missing slug" });
    }

    const comments = await sql`
      SELECT id, blog_slug, user_id, user_name, user_avatar, user_provider, comment_text, created_at 
      FROM comments 
      WHERE blog_slug = ${slug} 
      ORDER BY created_at DESC
    `;
    
    return res.status(200).json(comments);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST: Save a new comment (Requires authentication)
app.post("/api/comments", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Verify the Clerk session token
    const clerkRes = await fetch("https://api.clerk.com/v1/sessions/verify", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    });

    if (!clerkRes.ok) {
      return res.status(401).json({ error: "Invalid session token" });
    }

    const sessionData = await clerkRes.json();
    const userId = sessionData.user_id;

    // Fetch user details from Clerk
    const client = clerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });
    const user = await client.users.getUser(userId);

    const { slug, text } = req.body;
    if (!slug || !text) {
      return res.status(400).json({ error: "Missing slug or comment text" });
    }

    // Extract user metadata
    const primaryEmail = user.emailAddresses.find((e: any) => e.id === user.primaryEmailAddressId)?.emailAddress;
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || primaryEmail || "Anonymous";
    const avatar = user.imageUrl || null;
    const provider = user.externalAccounts[0]?.provider || "email";

    // Insert into Neon database
    const [newComment] = await sql`
      INSERT INTO comments (blog_slug, user_id, user_name, user_avatar, user_provider, comment_text)
      VALUES (${slug}, ${userId}, ${name}, ${avatar}, ${provider}, ${text})
      RETURNING id, blog_slug, user_id, user_name, user_avatar, user_provider, comment_text, created_at
    `;

    return res.status(201).json(newComment);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
