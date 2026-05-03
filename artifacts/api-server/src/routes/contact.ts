import { Router, type IRouter } from "express";
import { promises as fs } from "node:fs";
import path from "node:path";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const STORE_PATH =
  process.env["CONTACT_STORE_PATH"] ?? "/tmp/portfolio-contact-messages.jsonl";

const TARGET_EMAIL =
  process.env["CONTACT_TARGET_EMAIL"] ?? "alidawood098@gmail.com";

const FROM_EMAIL =
  process.env["CONTACT_FROM_EMAIL"] ?? "Portfolio <onboarding@resend.dev>";

interface ContactBody {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  subject?: unknown;
  honeypot?: unknown;
}

function bad(res: import("express").Response, msg: string, code = 400) {
  return res.status(code).json({ ok: false, error: msg });
}

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function clip(s: string, n: number) {
  return s.length > n ? s.slice(0, n) : s;
}

// In-memory rate limiting per IP (per process; resets on restart).
const recent = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 4;

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (recent.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_MAX) {
    recent.set(ip, list);
    return true;
  }
  list.push(now);
  recent.set(ip, list);
  return false;
}

async function sendViaResend(payload: {
  name: string;
  email: string;
  message: string;
  subject: string;
}): Promise<{ ok: true; id?: string } | { ok: false; error: string }> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY not set" };

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height:1.55; color:#111;">
      <h2 style="margin:0 0 16px;">New portfolio inquiry</h2>
      <p style="margin:0 0 4px;"><strong>From:</strong> ${escapeHtml(payload.name)}</p>
      <p style="margin:0 0 4px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
      <p style="white-space:pre-wrap;margin:0;">${escapeHtml(payload.message)}</p>
    </div>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TARGET_EMAIL],
        reply_to: payload.email,
        subject: payload.subject,
        html,
        text: `${payload.message}\n\n— ${payload.name} <${payload.email}>`,
      }),
    });
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return { ok: false, error: `Resend ${r.status}: ${text.slice(0, 200)}` };
    }
    const json = (await r.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: json.id };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function persist(record: Record<string, unknown>) {
  try {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    await fs.appendFile(STORE_PATH, JSON.stringify(record) + "\n", "utf8");
  } catch (err) {
    logger.error({ err }, "Failed to persist contact message");
  }
}

router.post("/contact", async (req, res) => {
  const ip =
    (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ||
    req.ip ||
    "unknown";

  if (rateLimited(ip)) {
    return bad(res, "Too many requests, please try again in a minute.", 429);
  }

  const body = (req.body ?? {}) as ContactBody;

  // Honeypot — if filled, silently accept but drop.
  if (typeof body.honeypot === "string" && body.honeypot.length > 0) {
    return res.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const subject =
    typeof body.subject === "string" && body.subject.trim().length > 0
      ? clip(body.subject.trim(), 200)
      : `Portfolio inquiry from ${name || "visitor"}`;

  if (!name || !email || !message) {
    return bad(res, "Please provide name, email, and message.");
  }
  if (name.length > 120) return bad(res, "Name is too long.");
  if (email.length > 200 || !isValidEmail(email)) {
    return bad(res, "Please provide a valid email address.");
  }
  if (message.length < 5) return bad(res, "Message is too short.");
  if (message.length > 5000) return bad(res, "Message is too long.");

  const record = {
    receivedAt: new Date().toISOString(),
    ip,
    name: clip(name, 120),
    email,
    subject,
    message: clip(message, 5000),
  };

  await persist(record);

  const sent = await sendViaResend({
    name: record.name,
    email: record.email,
    message: record.message,
    subject: record.subject,
  });

  if (!sent.ok) {
    logger.warn({ reason: sent.error }, "contact: email not sent (logged only)");
    // Still treat as success from the user's perspective — the message is
    // persisted server-side and can be reviewed.
    return res.json({
      ok: true,
      delivered: false,
      message: "Message received. Email delivery is currently disabled.",
    });
  }

  logger.info({ id: sent.id }, "contact: email sent");
  return res.json({ ok: true, delivered: true });
});

export default router;
