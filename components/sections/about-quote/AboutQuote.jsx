"use client";

import { motion, useReducedMotion } from "motion/react";
import { Quote as QuoteIcon } from "lucide-react";
import { site } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1];

const containerVariant = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * About → philosophical quote section.
 * Centered: gold quote-bubble icon, italic light Playfair quote, attribution.
 * Distinct from the home Quote section (which pairs a quote with career stats).
 */
export function AboutQuote() {
  const reduceMotion = useReducedMotion();

  const containerProps = reduceMotion
    ? {}
    : {
        variants: containerVariant,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.3 },
      };
  const itemProps = reduceMotion ? {} : { variants: itemVariant };

  return (
    <section
      aria-labelledby="about-quote-heading"
      className="border-y border-hairline bg-background px-6 py-24 md:px-8 md:py-32"
    >
      <motion.div
        {...containerProps}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.div {...itemProps} className="mb-6">
          <QuoteIcon
            className="h-10 w-10 text-gold/50"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </motion.div>

        <motion.h2
          {...itemProps}
          id="about-quote-heading"
          className="text-2xl font-light italic leading-relaxed text-navy md:text-3xl lg:text-4xl"
        >
          &ldquo;{site.doctor.philosophyQuote}&rdquo;
        </motion.h2>

        <motion.p
          {...itemProps}
          className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-text-muted"
        >
          — {site.doctor.name}
        </motion.p>
      </motion.div>
    </section>
  );
}
