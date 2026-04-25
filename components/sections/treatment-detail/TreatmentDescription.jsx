"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Long-form narrative paragraph for a treatment category.
 * Centered max-w-3xl, large body text. Sits between the hero photo and the
 * procedure list.
 */
export function TreatmentDescription({ description }) {
  const reduceMotion = useReducedMotion();

  const animateProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.6, ease: EASE },
      };

  return (
    <section className="bg-background px-6 py-20 md:px-8 md:py-24">
      <motion.div
        {...animateProps}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-lg font-light leading-relaxed text-text-secondary md:text-xl md:leading-[1.7]">
          {description}
        </p>
      </motion.div>
    </section>
  );
}
