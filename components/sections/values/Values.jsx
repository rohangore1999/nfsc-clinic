"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { ValueCard } from "./ValueCard";

const EASE = [0.16, 1, 0.3, 1];

const headerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const gridVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

/**
 * About → Our Core Values section.
 * Centered header + 3-up grid of editorial value cards (big gold watermark numbers).
 * Top hairline border separates from previous section.
 */
export function Values() {
  const reduceMotion = useReducedMotion();

  const sectionRevealProps = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.2 },
      };

  const headerProps = reduceMotion ? {} : { variants: headerVariant };
  const itemProps = reduceMotion ? {} : { variants: itemVariant };
  const gridProps = reduceMotion ? {} : { variants: gridVariant };

  return (
    <section
      aria-labelledby="values-heading"
      className="border-t border-hairline bg-background px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          {...sectionRevealProps}
          {...headerProps}
          className="mb-16 flex flex-col items-center text-center"
        >
          <motion.h2
            {...itemProps}
            id="values-heading"
            className="mb-4 font-serif text-3xl font-semibold text-navy md:text-4xl lg:text-5xl"
          >
            {site.about.values.title}
          </motion.h2>
          <motion.div
            {...itemProps}
            aria-hidden="true"
            className="h-1 w-16 bg-gold"
          />
        </motion.div>

        {/* Grid */}
        <motion.div
          {...sectionRevealProps}
          {...gridProps}
          className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8"
        >
          {site.about.values.items.map((item) => (
            <ValueCard key={item.number} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
