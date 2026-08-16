// src/lib/db.ts
import { neon } from '@neondatabase/serverless';

if (!process.env.NEON_DATABASE_URL) {
  throw new Error('NEON_DATABASE_URL is not set in .env.local');
}

// This creates a SQL function you can use to query your Neon DB safely
export const sql = neon(process.env.NEON_DATABASE_URL);