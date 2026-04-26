"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { validateContactForm, FIELD_LIMITS } from "@/lib/validation";

const inputBase = cn(
  "w-full rounded-lg bg-white/10 px-4 py-3 text-white",
  "placeholder:text-white/50 transition-colors",
  "focus:outline-none focus:ring-2 focus:ring-gold/40"
);

/** Returns the input className with an error-state border swap when needed. */
function fieldCls(hasError, extra) {
  return cn(
    inputBase,
    hasError
      ? "border border-red-400/80 focus:border-red-300"
      : "border border-white/20 focus:border-gold",
    extra
  );
}

const INITIAL_VALUES = {
  name: "",
  phone: "",
  email: "",
  treatment: "",
  message: "",
};

const ALL_TOUCHED = {
  name: true,
  phone: true,
  email: true,
  treatment: true,
  message: true,
};

/**
 * Compact booking form for the dark CTA banner.
 *
 * Validation strategy (live):
 *   - Inputs are controlled. Errors recompute on every change.
 *   - Each field's error is *displayed* only after the user blurs that
 *     field (or attempts submit) — avoids yelling about empty fields the
 *     user hasn't touched yet.
 *   - The submit button is disabled whenever the form has any error, so
 *     users can't fire bad submissions; the button only enables when valid.
 *   - On a submit attempt while invalid (e.g. via Enter), all fields are
 *     marked touched so every error becomes visible at once.
 *
 * Spam protection: hidden honeypot field `website`. Bots auto-fill it;
 * /api/contact silently drops any submission where it has content.
 */
export function InlineBookingForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);

  const errors = useMemo(() => validateContactForm(values), [values]);
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((t) => (t[name] ? t : { ...t, [name]: true }));
  }

  /** Show the error for a field only if user has touched it. */
  const visibleError = (field) => (touched[field] ? errors[field] : null);

  async function onSubmit(event) {
    event.preventDefault();
    setServerError(null);

    if (hasErrors) {
      // Reveal every field's error in case the user submitted via Enter
      // before blurring through the form.
      setTouched(ALL_TOUCHED);
      return;
    }

    setSubmitting(true);
    try {
      // Include the honeypot value if present (server drops it).
      const honeypot =
        event.currentTarget.elements.namedItem("website")?.value ?? "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(
          json.error || "Something went wrong. Please try again."
        );
      }
      setSubmitted(true);
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Could not submit. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-gold/30 bg-white/5 p-6 text-center"
      >
        <p className="font-serif text-lg text-gold">Thank you!</p>
        <p className="mt-2 text-sm text-white/60">
          We&apos;ll reach out shortly to confirm your consultation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex w-full max-w-md flex-col gap-4"
      aria-label="Book a free consultation"
    >
      {/* Name */}
      <div>
        <input
          name="name"
          type="text"
          required
          placeholder={site.ctaBanner.fields.name}
          autoComplete="name"
          maxLength={FIELD_LIMITS.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!visibleError("name")}
          aria-describedby={visibleError("name") ? "name-error" : undefined}
          className={fieldCls(!!visibleError("name"))}
        />
        {visibleError("name") ? (
          <p id="name-error" className="mt-1 text-xs text-red-300">
            {errors.name}
          </p>
        ) : null}
      </div>

      {/* Phone */}
      <div>
        <input
          name="phone"
          type="tel"
          required
          inputMode="tel"
          placeholder={site.ctaBanner.fields.phone}
          autoComplete="tel"
          maxLength={FIELD_LIMITS.phone}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!visibleError("phone")}
          aria-describedby={visibleError("phone") ? "phone-error" : undefined}
          className={fieldCls(!!visibleError("phone"))}
        />
        {visibleError("phone") ? (
          <p id="phone-error" className="mt-1 text-xs text-red-300">
            {errors.phone}
          </p>
        ) : null}
      </div>

      {/* Email (optional) */}
      <div>
        <input
          name="email"
          type="email"
          inputMode="email"
          placeholder={site.ctaBanner.fields.email}
          autoComplete="email"
          maxLength={FIELD_LIMITS.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!visibleError("email")}
          aria-describedby={visibleError("email") ? "email-error" : undefined}
          className={fieldCls(!!visibleError("email"))}
        />
        {visibleError("email") ? (
          <p id="email-error" className="mt-1 text-xs text-red-300">
            {errors.email}
          </p>
        ) : null}
      </div>

      {/* Treatment */}
      <div>
        <div className="relative">
          <select
            name="treatment"
            required
            value={values.treatment}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!visibleError("treatment")}
            aria-describedby={
              visibleError("treatment") ? "treatment-error" : undefined
            }
            className={fieldCls(
              !!visibleError("treatment"),
              cn(
                "appearance-none pr-10 [&>option]:text-navy",
                // When no selection yet, render the placeholder text muted
                // so it doesn't look like a pre-filled value.
                !values.treatment && "text-white/50"
              )
            )}
          >
            <option value="" disabled>
              {site.ctaBanner.fields.treatment}
            </option>
            <option value="Facial Surgery">Facial Surgery</option>
            <option value="Hair Treatment">Hair Treatment</option>
            <option value="Other">Other</option>
          </select>
          {/* Gold chevron — `pointer-events-none` so clicks pass through to
              the select beneath. */}
          <ChevronDown
            aria-hidden="true"
            strokeWidth={1.75}
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold"
          />
        </div>
        {visibleError("treatment") ? (
          <p id="treatment-error" className="mt-1 text-xs text-red-300">
            {errors.treatment}
          </p>
        ) : null}
      </div>

      {/* Message (optional) */}
      <div>
        <textarea
          name="message"
          rows={4}
          maxLength={FIELD_LIMITS.message}
          placeholder={site.ctaBanner.fields.message}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!visibleError("message")}
          aria-describedby={
            visibleError("message") ? "message-error" : undefined
          }
          className={fieldCls(
            !!visibleError("message"),
            "resize-none leading-relaxed"
          )}
        />
        {visibleError("message") ? (
          <p id="message-error" className="mt-1 text-xs text-red-300">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot — visible to bots, off-screen for humans. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <label>
          Website (leave this empty)
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {serverError ? (
        <p role="alert" className="text-sm text-red-300">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting || hasErrors}
        title={
          hasErrors && !submitting
            ? "Please fill in all required fields correctly."
            : undefined
        }
        className={cn(
          "mt-2 inline-flex items-center justify-center gap-2 rounded-lg",
          "bg-gold px-6 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white",
          "transition-colors hover:bg-gold-dark",
          "disabled:opacity-60",
          submitting ? "disabled:cursor-wait" : "disabled:cursor-not-allowed"
        )}
      >
        {submitting ? "Sending…" : site.ctaBanner.fields.submit}
        {!submitting ? (
          <ArrowRight
            className="h-4 w-4"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        ) : null}
      </button>
    </form>
  );
}
