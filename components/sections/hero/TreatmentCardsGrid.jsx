"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TreatmentCard } from "./TreatmentCard";
import { cn } from "@/lib/utils";

// Delay between auto-advances on mobile (ms).
const AUTOPLAY_DELAY = 2800;

/**
 * Carousel of treatment category cards using Embla Carousel.
 */
export function TreatmentCardsGrid({ items, className }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollLeft = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollRight = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-advance on both mobile and desktop, so users can tell the row is
  // scrollable (on mobile only one card shows; on desktop the arrows only
  // appear on hover). It loops back to the start at the end, honors
  // prefers-reduced-motion, pauses when the tab is hidden, pauses on hover
  // (so it doesn't move while reading or reaching for the arrows — hover is a
  // no-op on touch), and stops for good once the user swipes.
  useEffect(() => {
    if (!emblaApi || typeof window === "undefined") return;

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMq.matches) return;

    let stopped = false;
    let hovered = false;
    const tick = () => {
      if (stopped || hovered || document.hidden) return;
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else emblaApi.scrollTo(0);
    };
    const intervalId = window.setInterval(tick, AUTOPLAY_DELAY);

    // The `.group` wrapper (root's parent) also contains the nav arrows, so
    // hovering the arrows counts as hovering the carousel.
    const hoverTarget = emblaApi.rootNode()?.parentElement;
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const stop = () => {
      stopped = true;
      window.clearInterval(intervalId);
    };

    emblaApi.on("pointerDown", stop);
    hoverTarget?.addEventListener("mouseenter", onEnter);
    hoverTarget?.addEventListener("mouseleave", onLeave);

    return () => {
      window.clearInterval(intervalId);
      emblaApi.off("pointerDown", stop);
      hoverTarget?.removeEventListener("mouseenter", onEnter);
      hoverTarget?.removeEventListener("mouseleave", onLeave);
    };
  }, [emblaApi]);

  return (
    <div className={cn("relative group/carousel w-full", className)}>
      {/* Embla Viewport */}
      {/* pt-2 leaves room for the card's `hover:-translate-y-1` lift so the top
          border isn't clipped by `overflow-hidden` (needed for Embla). */}
      <div className="overflow-hidden w-full min-h-[280px] md:min-h-[320px] pt-2 pb-4" ref={emblaRef}>
        {/* Embla Container */}
        <div className="flex gap-6">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="flex-[0_0_100%] md:flex-[0_0_calc(33.333333%-16px)] min-w-0"
            >
              <TreatmentCard {...item} priority={index < 3} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollLeft}
        className="absolute left-[-20px] top-[calc(50%-8px)] -translate-y-1/2 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-background border border-hairline shadow-md text-text-secondary transition-colors hover:text-navy hover:border-gold opacity-0 group-hover/carousel:opacity-100 md:flex"
        aria-label="Previous cards"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-[-20px] top-[calc(50%-8px)] -translate-y-1/2 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-background border border-hairline shadow-md text-text-secondary transition-colors hover:text-navy hover:border-gold opacity-0 group-hover/carousel:opacity-100 md:flex"
        aria-label="Next cards"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
