/**
 * POST /api/contact
 *
 * Receives consultation requests from the InlineBookingForm.
 * Validates via the shared schema, drops bot submissions via honeypot, then
 * forwards the cleaned data to the Google Apps Script web app (which writes
 * a row to the inquiry sheet and sends a Gmail notification).
 *
 * Env:
 *   APPS_SCRIPT_URL — required in production. Public web-app URL of the
 *                     Apps Script project. Leave unset in dev to enable
 *                     a console-log fallback (see below).
 */

import { validateContactForm } from "@/lib/validation";

export async function POST(request) {
  // 1. Parse JSON
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  // 2. Honeypot — bots auto-fill the hidden `website` field, humans don't.
  //    Pretend success so bots don't retry; do nothing server-side.
  if (String(body.website ?? "").trim()) {
    return Response.json({ ok: true });
  }

  // 3. Validate via shared rules (same logic the client uses for live UX).
  const errors = validateContactForm(body);
  if (Object.keys(errors).length > 0) {
    // Surface the first error to the caller — the client already shows
    // per-field errors itself, this is just a defense-in-depth gate.
    const firstError = Object.values(errors)[0];
    return Response.json(
      { ok: false, error: firstError },
      { status: 400 }
    );
  }

  // 4. Sanitize for upstream payload.
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const treatment = String(body.treatment ?? "").trim();
  const message = String(body.message ?? "").trim();

  // 5. Forward to Apps Script.
  const url = process.env.APPS_SCRIPT_URL;

  if (!url) {
    // Dev fallback — keep the form usable locally before the Apps Script
    // endpoint is set up. Production deploys must have APPS_SCRIPT_URL set.
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] DEV: APPS_SCRIPT_URL not set — simulating success");
      console.log("[contact] payload:", { name, phone, email, treatment, message });
      return Response.json({ ok: true });
    }
    console.error("[contact] APPS_SCRIPT_URL is not configured in production");
    return Response.json(
      {
        ok: false,
        error:
          "Sorry, we couldn't submit right now. Please call us directly.",
      },
      { status: 500 }
    );
  }

  try {
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email: email || null,
        treatment,
        message: message || null,
        source: "website",
        submittedAt: new Date().toISOString(),
      }),
      // Apps Script can be slow on cold start — give it some headroom.
      signal: AbortSignal.timeout(15_000),
    });

    if (!upstream.ok) {
      console.error(
        "[contact] Apps Script returned non-OK",
        upstream.status,
        await upstream.text().catch(() => "")
      );
      return Response.json(
        {
          ok: false,
          error: "Submission failed. Please try again or call us.",
        },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] Apps Script fetch failed", err);
    return Response.json(
      {
        ok: false,
        error:
          "Network error. Please try again, or call us directly.",
      },
      { status: 502 }
    );
  }
}
