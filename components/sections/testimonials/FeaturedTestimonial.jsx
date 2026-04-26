"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote as QuoteIcon, User } from "lucide-react";
import { site } from "@/content/site";
import { StarRow } from "@/components/ui/StarRow";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const AUTOPLAY_MS = 6000;

/**
 * Featured testimonial carousel.
 * Auto-rotates every 6s; pause on hover. Manual prev/next + dot indicators.
 * Smooth crossfade + slight Y motion on slide change.
 *
 * Image area is a side-by-side before/after placeholder; swap each half for
 * <Image src={...} /> when real photos arrive.
 */
export function FeaturedTestimonial() {
  const featured = site.testimonials.featured;
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || featured.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % featured.length),
      AUTOPLAY_MS
    );
    return () => clearInterval(id);
  }, [paused, featured.length]);

  const prev = () =>
    setIndex((i) => (i - 1 + featured.length) % featured.length);
  const next = () => setIndex((i) => (i + 1) % featured.length);

  const item = featured[index];

  return (
    <section
      aria-label="Featured patient testimonial"
      className="bg-background px-6 py-16 md:px-8 md:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl rounded-2xl border border-hairline bg-background p-6 md:p-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image — split before/after placeholder */}
          <div className="relative flex aspect-[4/3] gap-px overflow-hidden rounded-xl bg-section-alt">
            <div className="relative flex w-1/2 items-center justify-center bg-gradient-to-br from-section-alt to-hairline">
              <User
                className="h-16 w-16 text-text-muted"
                strokeWidth={1}
                aria-hidden="true"
              />
              <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-black/45 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md">
                Before
              </span>
            </div>
            <div className="relative flex w-1/2 items-center justify-center bg-gradient-to-br from-gold/10 to-gold/30">
              <User
                className="h-16 w-16 text-gold/70"
                strokeWidth={1}
                aria-hidden="true"
              />
              <span className="absolute right-3 top-3 rounded-full border border-gold/50 bg-black/45 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold backdrop-blur-md">
                After
              </span>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-gold"
            />
          </div>

          {/* Content — animated on slide change */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 12 }
                }
                animate={
                  reduceMotion ? false : { opacity: 1, y: 0 }
                }
                exit={
                  reduceMotion ? undefined : { opacity: 0, y: -12 }
                }
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col gap-4"
              >
                <QuoteIcon
                  className="h-10 w-10 text-gold/60"
                  strokeWidth={1}
                  aria-hidden="true"
                />
                <blockquote className="text-lg italic leading-relaxed text-navy md:text-xl">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <StarRow count={item.rating} className="mt-2" />
                <div>
                  <p className="font-serif text-xl font-semibold text-navy">
                    {item.author}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-gold bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-gold">
                      {item.treatment}
                    </span>
                    <span className="text-xs text-text-muted">
                      {item.timeline}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-4 flex items-center gap-4">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={prev}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold text-gold",
                  "transition-colors duration-200 hover:bg-gold hover:text-white",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                )}
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>

              <div className="flex items-center gap-2" role="tablist">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors duration-200",
                      i === index ? "bg-gold" : "bg-hairline hover:bg-gold/50"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next testimonial"
                onClick={next}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold text-gold",
                  "transition-colors duration-200 hover:bg-gold hover:text-white",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                )}
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
