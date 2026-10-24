const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendNotificationEmail(
  subject: string,
  heading: string,
  fields: Record<string, string>,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is missing; skipping notification email.");
    return;
  }

  const rows = Object.entries(fields)
    .map(([label, value]) => `<tr><th align="left" style="padding:10px;border-bottom:1px solid #e5e7eb">${escapeHtml(label)}</th><td style="padding:10px;border-bottom:1px solid #e5e7eb">${escapeHtml(value || "—")}</td></tr>`)
    .join("");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "WebMail Notification <farabi@rmigrate.ca>",
        to: [process.env.NOTIFICATION_EMAIL || "contact@rmigrate.ca"],
        subject,
        html: `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111827"><h2>${escapeHtml(heading)}</h2><table style="border-collapse:collapse;width:100%">${rows}</table><p style="color:#6b7280;font-size:12px">Automated notification from Route 2 Migrate.</p></body></html>`,
      }),
    });

    if (!response.ok) {
      console.error("Notification email failed:", response.status, await response.text());
    }
  } catch (error) {
    console.error("Notification email request failed:", error);
  }
}
