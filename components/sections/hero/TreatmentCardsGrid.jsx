"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TreatmentCard } from "./TreatmentCard";
import { cn } from "@/lib/utils";

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

  return (
    <div className={cn("relative group w-full", className)}>
      {/* Embla Viewport */}
      <div className="overflow-hidden w-full pb-4" ref={emblaRef}>
        {/* Embla Container */}
        <div className="flex gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex-[0_0_100%] md:flex-[0_0_calc(33.333333%-16px)] min-w-0"
            >
              <TreatmentCard {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollLeft}
        className="absolute left-[-20px] top-[calc(50%-8px)] -translate-y-1/2 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-background border border-hairline shadow-md text-text-secondary transition-colors hover:text-navy hover:border-gold opacity-0 group-hover:opacity-100 md:flex"
        aria-label="Previous cards"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-[-20px] top-[calc(50%-8px)] -translate-y-1/2 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-background border border-hairline shadow-md text-text-secondary transition-colors hover:text-navy hover:border-gold opacity-0 group-hover:opacity-100 md:flex"
        aria-label="Next cards"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
