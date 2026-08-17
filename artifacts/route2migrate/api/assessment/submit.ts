// artifacts/route2migrate/api/assessment/submit.ts
import { neon } from '@neondatabase/serverless';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const databaseUrl = (globalThis as any).process?.env?.NEON_DATABASE_URL || (import.meta as any).env?.NEON_DATABASE_URL;
    
    if (!databaseUrl) {
      throw new Error("NEON_DATABASE_URL is not set in environment variables.");
    }

    const sql = neon(databaseUrl);

    const data = await req.json();
    const { 
      fullName, 
      email, 
      phone, 
      country, 
      immigrationStatus, 
      services, 
      description 
    } = data;

    // FIX: Changed table name to 'free_assessment_requests' and column 'service' to 'required_service'
    const result = await sql`
      INSERT INTO free_assessment_requests (
        full_name, email, phone, country, immigration_status, required_service, description
      ) 
      VALUES (
        ${fullName}, ${email}, ${phone}, ${country}, ${immigrationStatus}, ${services}, ${description ?? ''}
      )
      RETURNING id;
    `;

    return new Response(JSON.stringify({ success: true, id: result[0].id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Assessment Submit Error:", error);
    return new Response(JSON.stringify({ 
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}