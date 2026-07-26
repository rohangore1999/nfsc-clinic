import { ArrowRight, Star } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Multi-color Google "G" SVG — reused in both cards */
function GoogleG() {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-background"
    >
      <svg className="h-5 w-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083L43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
      </svg>
    </span>
  );
}

/**
 * Two-card row:
 *   Left  — "See all reviews" → Google Maps listing
 *   Right — "Leave a Review" → direct Google review form (gold filled)
 */
export function GoogleReviewCta() {
  const cta = site.testimonials.googleCta;

  return (
    <section
      aria-label="Google reviews"
      className="bg-background px-6 pb-20 md:px-8"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row">
        {/* See all reviews */}
        <a
          href={site.contact.mapDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex flex-1 items-center justify-between gap-4 rounded-2xl border border-gold bg-background p-5",
            "shadow-sm transition-all duration-300 hover:shadow-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          )}
        >
          <div className="flex items-center gap-3">
            <GoogleG />
            <div>
              <p className="font-serif text-sm font-bold text-text-primary">{cta.title}</p>
              <p className="text-xs text-text-muted">{cta.subtitle}</p>
            </div>
          </div>
          <ArrowRight
            className="h-4 w-4 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </a>

        {/* Leave a review — gold filled */}
        <a
          href={cta.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex flex-1 items-center justify-between gap-4 rounded-2xl border border-gold bg-gold p-5",
            "shadow-sm transition-all duration-300 hover:bg-gold/90 hover:shadow-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          )}
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20"
            >
              <Star className="h-5 w-5 fill-white text-white" strokeWidth={1.5} />
            </span>
            <div>
              <p className="font-serif text-sm font-bold text-white">{cta.reviewCta}</p>
              <p className="text-xs text-white/70">{cta.reviewSubtitle}</p>
            </div>
          </div>
          <ArrowRight
            className="h-4 w-4 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
