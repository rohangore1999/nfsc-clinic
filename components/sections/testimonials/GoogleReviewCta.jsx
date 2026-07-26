import { ArrowRight, Star } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Multi-color Google "G" SVG */
function GoogleG({ className }) {
  return (
    <svg className={cn("h-5 w-5", className)} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083L43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

/**
 * Two-card row:
 *   Left  — "See all reviews" → Google Maps listing (outlined, airy)
 *   Right — "Leave a Review" → direct review form (gold, premium)
 */
export function GoogleReviewCta() {
  const cta = site.testimonials.googleCta;

  return (
    <section
      aria-label="Google reviews"
      className="bg-background px-6 pb-20 md:px-8"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row">

        {/* ── Left: See all reviews ── */}
        <a
          href={site.contact.mapDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group relative flex flex-1 flex-col justify-between gap-3 overflow-hidden rounded-2xl border border-hairline bg-background p-6",
            "transition-all duration-300 hover:border-gold hover:shadow-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          )}
        >
          {/* Google G + rating */}
          <div className="flex items-center gap-2">
            <GoogleG />
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#FFC107] text-[#FFC107]" strokeWidth={0} aria-hidden="true" />
              ))}
              <span className="ml-1 text-xs font-semibold text-text-primary">5.0</span>
            </div>
          </div>
          <div>
            <p className="font-serif text-sm font-bold text-text-primary">{cta.title}</p>
            <p className="mt-0.5 text-xs text-text-muted">{cta.subtitle}</p>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-gold transition-all duration-300 group-hover:gap-2">
            View on Google
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          </span>
        </a>

        {/* ── Right: Leave a Review ── */}
        <a
          href={cta.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group relative flex flex-1 flex-col justify-between gap-3 overflow-hidden rounded-2xl border border-gold bg-gold p-6",
            "transition-all duration-300 hover:shadow-lg hover:shadow-gold/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          )}
        >
          {/* Decorative glow blob */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-2xl transition-all duration-500 group-hover:scale-150"
          />

          {/* 5 stars */}
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} className="h-4 w-4 fill-white text-white" strokeWidth={0} aria-hidden="true" />
            ))}
          </div>

          <div>
            <p className="font-serif text-base font-bold text-white">{cta.reviewCta}</p>
            <p className="mt-0.5 text-xs text-white/70">{cta.reviewSubtitle}</p>
          </div>

          <span className="flex items-center gap-1 text-xs font-medium text-white/90 transition-all duration-300 group-hover:gap-2">
            Open Google review form
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          </span>
        </a>

      </div>
    </section>
  );
}
