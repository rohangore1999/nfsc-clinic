/**
 * Small, dependency-free string helpers used across the site.
 */

/**
 * "10+" → { value: 10, suffix: "+" }
 * "98%" → { value: 98, suffix: "%" }
 * "abc" → { value: 0,  suffix: "abc" }
 */
export function parseStat(raw) {
  const match = String(raw).match(/^(\d+)(.*)$/);
  if (!match) return { value: 0, suffix: String(raw) };
  return { value: Number(match[1]), suffix: match[2] ?? "" };
}

/**
 * "Hair Transplant" → "hair-transplant". URL-safe slug.
 */
export function toSlug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * "+91 9876543210" → "+919876543210"
 * Keeps a leading "+" so the result remains a valid `tel:` URI.
 */
export function cleanPhone(s) {
  return String(s || "").replace(/[^\d+]/g, "");
}

/**
 * "+91 9876543210" → "919876543210"
 * Digits only — used for `wa.me/...` WhatsApp URLs which don't accept "+".
 */
export function digitsOnly(s) {
  return String(s || "").replace(/[^\d]/g, "");
}
