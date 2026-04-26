"use client";

import { motion, useReducedMotion } from "motion/react";
import { Scissors, Wind } from "lucide-react";
import { EASE } from "@/lib/motion";

const ICON_MAP = {
  "facial-surgery": Scissors,
  "hair-treatments": Wind,
};

/**
 * Wide hero photo block for treatment detail pages.
 * Currently a gradient placeholder; swap for <Image src="..." fill /> when
 * real photography arrives.
 *
 * @param {Object} props
 * @param {string} props.slug - drives the placeholder icon
 */
export function TreatmentHero({ slug }) {
  const reduceMotion = useReducedMotion();
  const Icon = ICON_MAP[slug];

  const animateProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 1.03 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.9, ease: EASE },
      };

  return (
    <section
      aria-label="Treatment hero image"
      className="bg-section-alt px-6 py-12 md:px-8 md:py-16"
    >
      <motion.div
        {...animateProps}
        className="mx-auto aspect-[16/9] max-w-6xl overflow-hidden rounded-2xl border border-hairline bg-background"
      >
        {/* TODO: swap placeholder for <Image src={`/images/treatments/${slug}.jpg`} alt={title} fill className="object-cover" /> */}
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-section-alt to-hairline">
          {Icon ? (
            <Icon
              className="h-24 w-24 text-gold/30"
              strokeWidth={1}
              aria-hidden="true"
            />
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
