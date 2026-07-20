import { createAPIFileRoute } from "@tanstack/react-start/api";

/* ── Rate Limiting (IP memory store) ── */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max 5 submissions per 10 minutes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count += 1;
  return false;
}

/* ── Validation Helper ── */
type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  turnstileToken?: string;
};

function validatePayload(body: Partial<ContactPayload>) {
  const errors: Record<string, string> = {};

  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
    errors.name = "Please enter your name (minimum 2 characters).";
  } else if (body.name.length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!body.email || typeof body.email !== "string" || !emailRegex.test(body.email.trim())) {
    errors.email = "Please enter a valid email address.";
  } else if (body.email.length > 150) {
    errors.email = "Email must be 150 characters or fewer.";
  }

  if (body.company && typeof body.company === "string" && body.company.length > 100) {
    errors.company = "Company name must be 100 characters or fewer.";
  }

  if (!body.subject || typeof body.subject !== "string" || body.subject.trim().length < 2) {
    errors.subject = "Please share what you are building or looking for.";
  } else if (body.subject.length > 150) {
    errors.subject = "Project subject must be 150 characters or fewer.";
  }

  if (!body.message || typeof body.message !== "string" || body.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters long.";
  } else if (body.message.length > 2000) {
    errors.message = "Message cannot exceed 2000 characters.";
  }

  return errors;
}

/* ── Cloudflare Turnstile Verification ── */
async function verifyTurnstile(token: string, secretKey: string): Promise<boolean> {
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/* ── Resend Email Sender ── */
async function sendResendEmail({
  apiKey,
  from,
  to,
  subject,
  html,
}: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend API error (${res.status}): ${errorText}`);
  }

  return res.json();
}

/* ── HTML Email Templates ── */
function buildAdminEmailHtml(data: ContactPayload, timestamp: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', -apple-system, sans-serif; background-color: #141416; color: #f5f5f4; margin: 0; padding: 32px 16px; }
          .card { max-width: 580px; margin: 0 auto; background-color: #1c1c1f; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; }
          .header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 24px; }
          .label { font-size: 10px; font-family: monospace; text-transform: uppercase; tracking: 0.2em; color: #dcb880; margin-bottom: 4px; }
          .value { font-size: 14px; color: #ffffff; margin-bottom: 20px; line-height: 1.6; }
          .message-box { background-color: #242428; border-left: 2px solid #dcb880; padding: 16px; border-radius: 8px; font-size: 14px; color: #e0e0e0; line-height: 1.7; white-space: pre-wrap; }
          .footer { font-size: 11px; font-family: monospace; color: #888888; text-align: center; margin-top: 32px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div class="label">PORTFOLIO INQUIRY</div>
            <h2 style="margin: 0; font-size: 22px; font-weight: 500; color: #ffffff;">New Message Received</h2>
          </div>

          <div class="label">SENDER NAME</div>
          <div class="value">${escapeHtml(data.name)}</div>

          <div class="label">SENDER EMAIL</div>
          <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #dcb880;">${escapeHtml(data.email)}</a></div>

          ${
            data.company
              ? `<div class="label">COMPANY / ORGANIZATION</div><div class="value">${escapeHtml(data.company)}</div>`
              : ""
          }

          <div class="label">WHAT THEY ARE BUILDING</div>
          <div class="value">${escapeHtml(data.subject)}</div>

          <div class="label">MESSAGE</div>
          <div class="message-box">${escapeHtml(data.message)}</div>

          <div class="footer">
            Received on ${timestamp} via Portfolio Contact System
          </div>
        </div>
      </body>
    </html>
  `;
}

function buildUserConfirmationEmailHtml(name: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', -apple-system, sans-serif; background-color: #141416; color: #f5f5f4; margin: 0; padding: 32px 16px; }
          .card { max-width: 580px; margin: 0 auto; background-color: #1c1c1f; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 36px; }
          .accent { color: #dcb880; font-weight: 600; }
          h1 { font-size: 24px; font-weight: 400; margin-top: 0; color: #ffffff; }
          p { font-size: 15px; line-height: 1.7; color: #d0d0d4; margin-bottom: 20px; }
          .footer { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; font-size: 12px; font-family: monospace; color: #888888; margin-top: 32px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Thanks for reaching out 👋</h1>
          <p>Hi ${escapeHtml(name)},</p>
          <p>Thank you for getting in touch. I’ve received your message regarding your project opportunity.</p>
          <p>I read every inquiry carefully and will respond to your email <span class="accent">within 24 hours</span>.</p>
          <p>Best regards,<br/><strong style="color: #ffffff;">Gopi Neeraj Kumar</strong><br/><span style="font-size: 12px; color: #888888;">Product Designer & UI/UX Specialist</span></p>
          <div class="footer">
            Designed with curiosity. Refined through iteration.
          </div>
        </div>
      </body>
    </html>
  `;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ── API Route Handler ── */
export const APIRoute = createAPIFileRoute("/api/contact")({
  POST: async ({ request }) => {
    try {
      // 1. IP Rate Limiting
      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("cf-connecting-ip") ||
        "127.0.0.1";

      if (isRateLimited(ip)) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Too many requests. Please wait a few minutes before trying again.",
          }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }

      // 2. Parse JSON Payload
      const body = (await request.json().catch(() => ({}))) as Partial<ContactPayload>;

      // 3. Server-side Validation
      const errors = validatePayload(body);
      if (Object.keys(errors).length > 0) {
        return new Response(
          JSON.stringify({ success: false, errors }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // 4. Cloudflare Turnstile Spam Check (if configured)
      const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
      if (turnstileSecret && body.turnstileToken) {
        const isValid = await verifyTurnstile(body.turnstileToken, turnstileSecret);
        if (!isValid) {
          return new Response(
            JSON.stringify({ success: false, error: "Security check failed. Please try again." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
      }

      // 5. Environment Variables
      const resendApiKey = process.env.RESEND_API_KEY;
      const toEmail = process.env.TO_EMAIL || "neerajkumar.gopi2025@gmail.com";
      const fromEmail = process.env.FROM_EMAIL || "Gopi Neeraj <onboarding@resend.dev>";
      const timestamp = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        dateStyle: "full",
        timeStyle: "medium",
      });

      const payload = body as ContactPayload;

      // 6. Send Emails via Resend (if RESEND_API_KEY is present)
      if (resendApiKey) {
        // Send Admin Notification Email
        await sendResendEmail({
          apiKey: resendApiKey,
          from: fromEmail,
          to: toEmail,
          subject: `New Portfolio Inquiry — ${payload.subject}`,
          html: buildAdminEmailHtml(payload, timestamp),
        });

        // Send Confirmation Email to User
        await sendResendEmail({
          apiKey: resendApiKey,
          from: fromEmail,
          to: payload.email,
          subject: "Thanks for reaching out 👋",
          html: buildUserConfirmationEmailHtml(payload.name),
        });
      } else {
        console.log(
          "[API/contact] Mock email sent (RESEND_API_KEY not configured):",
          payload
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Thank you for reaching out. Your message has been sent successfully.",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (err: unknown) {
      console.error("[API/contact Error]:", err);
      return new Response(
        JSON.stringify({
          success: false,
          error: "An unexpected error occurred while sending your message. Please try again or email directly.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});
