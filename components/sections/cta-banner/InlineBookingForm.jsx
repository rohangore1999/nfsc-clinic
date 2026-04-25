"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const inputCls = cn(
  "w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white",
  "placeholder:text-white/50 transition-colors",
  "focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
);

/**
 * Compact booking form that lives in the dark CTA banner.
 *
 * Backend: not yet wired. On submit it currently stubs a network call and
 * shows a success state. Replace the body of `onSubmit` with a POST to
 * `/api/contact` once the Apps Script endpoint is set up (Phase 4 in PLAN.md).
 */
export function InlineBookingForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    // TODO: replace stub with `fetch("/api/contact", { method: "POST", body: ... })`
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
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
      className="flex w-full max-w-md flex-col gap-4"
      aria-label="Book a free consultation"
    >
      <input
        name="name"
        type="text"
        required
        placeholder={site.ctaBanner.fields.name}
        autoComplete="name"
        className={inputCls}
      />
      <input
        name="phone"
        type="tel"
        required
        placeholder={site.ctaBanner.fields.phone}
        autoComplete="tel"
        className={inputCls}
      />
      <select
        name="treatment"
        defaultValue=""
        required
        className={cn(inputCls, "appearance-none [&>option]:text-navy")}
      >
        <option value="" disabled>
          {site.ctaBanner.fields.treatment}
        </option>
        <option value="Facial Surgery">Facial Surgery</option>
        <option value="Hair Treatment">Hair Treatment</option>
        <option value="Other">Other</option>
      </select>
      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "mt-2 inline-flex items-center justify-center gap-2 rounded-lg",
          "bg-gold px-6 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white",
          "transition-colors hover:bg-gold-dark",
          "disabled:cursor-wait disabled:opacity-60"
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
