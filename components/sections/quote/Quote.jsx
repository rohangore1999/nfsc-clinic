"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { Stats } from "./Stats";
import { containerVariant, itemVariant } from "@/lib/motion";

/**
 * Doctor quote + career stats on white background.
 * Stagger reveal on scroll: gold quote mark → headline → attribution → divider → stats.
 */
export function Quote() {
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
      aria-labelledby="quote-heading"
      className="bg-background px-6 py-24 md:px-8 md:py-32"
    >
      <motion.div
        {...containerProps}
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.span
          {...itemProps}
          aria-hidden="true"
          className="mb-2 block font-serif text-6xl leading-none text-gold"
        >
          &ldquo;
        </motion.span>

        <motion.h2
          {...itemProps}
          id="quote-heading"
          className="mb-6 text-3xl font-light italic leading-relaxed text-navy md:text-4xl"
        >
          {site.doctor.quote}
        </motion.h2>

        <motion.p
          {...itemProps}
          className="mb-12 text-sm font-medium uppercase tracking-[0.18em] text-text-muted"
        >
          — {site.doctor.name}, {site.doctor.role}
        </motion.p>

        <motion.div
          {...itemProps}
          aria-hidden="true"
          className="mb-16 h-px w-[100px] bg-gold"
        />

        <motion.div {...itemProps} className="w-full">
          <Stats items={site.stats} />
        </motion.div>
      </motion.div>
    </section>
  );
}
