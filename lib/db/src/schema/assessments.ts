//lib/db/src/schema/assessments.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const assessmentSubmissionsTable = pgTable("assessment", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  country: text("country").notNull(),
  immigrationStatus: text("immigration_status").notNull(),
  service: text("services").notNull(), // real column is "services"
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAssessmentSchema = createInsertSchema(assessmentSubmissionsTable).omit({ id: true, createdAt: true });
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessmentSubmissionsTable.$inferSelect;
