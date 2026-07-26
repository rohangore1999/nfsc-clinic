"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Scissors, Wind } from "lucide-react";
import { EASE } from "@/lib/motion";
import { useState } from "react";

const ICON_MAP = {
  "facial-surgery": Scissors,
  "hair-treatments": Wind,
};

const extensions = ["png", "jpeg", "jpg", "webp"];

/**
 * Inner image loader — keyed on `slug` by the parent so React remounts it
 * whenever the slug changes, resetting extIndex/hasError automatically.
 */
function HeroImage({ slug, title, Icon }) {
  const [extIndex, setExtIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-section-alt to-hairline">
        {Icon ? (
          <Icon
            className="h-24 w-24 text-gold/30"
            strokeWidth={1}
            aria-hidden="true"
          />
        ) : null}
      </div>
    );
  }

  return (
    <Image
      src={`/images/treatments/${slug}.${extensions[extIndex]}`}
      alt={title ? `${title} treatment at NFSC, Mumbai` : `${slug} treatment`}
      fill
      className="object-cover"
      sizes="(max-width: 1200px) 100vw, 1200px"
      priority
      onError={() => {
        if (extIndex < extensions.length - 1) {
          setExtIndex((prev) => prev + 1);
        } else {
          setHasError(true);
        }
      }}
    />
  );
}

/**
 * Wide hero photo block for treatment detail pages.
 * Loads an image based on the slug from /public/images/treatments/
 * Automatically tries .jpeg, .jpg, .png, .webp extensions.
 *
 * @param {Object} props
 * @param {string} props.slug - drives the image filename and fallback icon
 */
export function TreatmentHero({ slug, title }) {
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
        className="relative mx-auto aspect-[16/9] max-w-6xl overflow-hidden rounded-2xl border border-hairline bg-background"
      >
        <HeroImage key={slug} slug={slug} title={title} Icon={Icon} />
      </motion.div>
    </section>
  );
}
