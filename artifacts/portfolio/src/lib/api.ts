// Lightweight API helper for the portfolio.
// The api-server is mounted at /api on the same origin via the workspace
// proxy, so a relative path is enough for both dev and prod.

const API_BASE = "/api";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  subject?: string;
};

export type ContactResponse =
  | { ok: true; delivered?: boolean; message?: string }
  | { ok: false; error: string };

export async function sendContactMessage(
  payload: ContactPayload,
  opts?: { honeypot?: string },
): Promise<ContactResponse> {
  try {
    const r = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        honeypot: opts?.honeypot ?? "",
      }),
    });
    const data = (await r.json().catch(() => ({}))) as ContactResponse & {
      error?: string;
    };
    if (!r.ok) {
      return {
        ok: false,
        error: data.error || `Request failed (${r.status}).`,
      };
    }
    return data;
  } catch (err) {
    return { ok: false, error: (err as Error).message || "Network error." };
  }
}
