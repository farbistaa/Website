// artifacts/api-server/src/lib/mailer.ts
import { Resend } from "resend";
import { logger } from "./logger";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

export const sendNotificationEmail = async ({ to, subject, html }: EmailParams) => {
  if (!process.env.RESEND_API_KEY) {
    logger.warn("RESEND_API_KEY is missing. Skipping email notification.");
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "WebMail Notification <farabi@rmigrate.ca>", // <-- UPDATED THIS LINE
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      throw error;
    }

    logger.info(`Email sent successfully to ${to} (ID: ${data?.id})`);
  } catch (error) {
    logger.error({ error }, "Failed to send notification email");
  }
};