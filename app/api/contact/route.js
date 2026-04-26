/**
 * POST /api/contact
 *
 * Receives consultation requests from the InlineBookingForm.
 * Validates the payload, drops bot submissions via honeypot, then forwards
 * the cleaned data to the Google Apps Script web app (which writes a row
 * to the inquiry sheet, sends a Gmail notification, and optionally pushes
 * a Telegram/WhatsApp alert).
 *
 * Env:
 *   APPS_SCRIPT_URL — required in production. Public web-app URL of the
 *                     Apps Script project. Leave unset in dev to enable
 *                     a console-log fallback (see below).
 */

const ALLOWED_TREATMENTS = new Set([
  "Facial Surgery",
  "Hair Treatment",
  "Other",
]);

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

  // 3. Sanitize + validate
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const treatment = String(body.treatment ?? "").trim();
  const message = String(body.message ?? "").trim();

  const PHONE_RE = /^[0-9+\-\s()]{6,20}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || name.length > 100) {
    return Response.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 }
    );
  }
  if (!phone || !PHONE_RE.test(phone)) {
    return Response.json(
      { ok: false, error: "Please enter a valid phone number." },
      { status: 400 }
    );
  }
  // Email is optional, but must be valid when present.
  if (email && (email.length > 120 || !EMAIL_RE.test(email))) {
    return Response.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!ALLOWED_TREATMENTS.has(treatment)) {
    return Response.json(
      { ok: false, error: "Please choose a treatment of interest." },
      { status: 400 }
    );
  }
  if (message.length > 1000) {
    return Response.json(
      { ok: false, error: "Message is too long (max 1000 characters)." },
      { status: 400 }
    );
  }

  // 4. Forward to Apps Script
  const url = process.env.APPS_SCRIPT_URL;

  if (!url) {
    // Dev fallback — keep the form usable locally before the Apps Script
    // endpoint is set up. Production deploys must have APPS_SCRIPT_URL set.
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] DEV: APPS_SCRIPT_URL not set — simulating success");
      console.log("[contact] payload:", { name, phone, treatment, message });
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
