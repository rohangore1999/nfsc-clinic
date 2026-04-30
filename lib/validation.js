/**
 * Shared form validation for the booking inquiry.
 *
 * The same rules run on:
 *   - Client (InlineBookingForm) — for live UX feedback / disabled submit
 *   - Server (/api/contact)      — for the actual submission gate
 *
 * Single source of truth so the two layers can never disagree.
 */

// Indian mobile: exactly 10 digits, starting 6/7/8/9. No +91 prefix.
export const PHONE_RE = /^[6-9]\d{9}$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Treatment options accepted by the form. */
export const ALLOWED_TREATMENTS = new Set([
  "Facial Surgery",
  "Hair Treatment",
  "Other",
]);

export const FIELD_LIMITS = {
  name: 100,
  phone: 10,
  email: 120,
  message: 1000,
};

/**
 * Validate booking form values. Returns an errors map keyed by field name;
 * empty object means the form is valid.
 *
 * @param {{ name?: string, phone?: string, email?: string, treatment?: string, message?: string }} input
 * @returns {Record<string, string>}
 */
export function validateContactForm({
  name,
  phone,
  email,
  treatment,
  message,
} = {}) {
  const errs = {};
  const n = (name || "").trim();
  const p = (phone || "").trim();
  const e = (email || "").trim();
  const m = message || "";

  if (!n) errs.name = "Please enter your name.";
  else if (n.length > FIELD_LIMITS.name) errs.name = "Name is too long.";

  if (!p) errs.phone = "Please enter your phone number.";
  else if (!PHONE_RE.test(p))
    errs.phone = "Please enter a valid 10-digit mobile number.";

  // Email is optional, but must be valid when provided.
  if (e && (e.length > FIELD_LIMITS.email || !EMAIL_RE.test(e))) {
    errs.email = "Please enter a valid email address.";
  }

  if (!treatment) errs.treatment = "Please pick a treatment of interest.";
  else if (!ALLOWED_TREATMENTS.has(treatment))
    errs.treatment = "Please pick a valid treatment.";

  if (m.length > FIELD_LIMITS.message)
    errs.message = `Message is too long (max ${FIELD_LIMITS.message} characters).`;

  return errs;
}
