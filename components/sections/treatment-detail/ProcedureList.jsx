"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1];

/** Slugify a procedure title for use as an in-page anchor (#rhinoplasty, #hair-transplant). */
function toSlug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

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
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

/**
 * Procedure list — header + 2-col grid of named procedures with descriptions.
 * Each procedure: short gold rule + Playfair title + body description.
 * Used on /treatments/[slug] pages.
 *
 * @param {Object} props
 * @param {Array<{ title: string, description: string }>} props.procedures
 */
export function ProcedureList({ procedures }) {
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
      aria-labelledby="procedures-heading"
      className="bg-section-alt px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          {...sectionRevealProps}
          {...headerProps}
          className="mb-16 flex flex-col items-center text-center"
        >
          <motion.h2
            {...itemProps}
            id="procedures-heading"
            className="mb-4 font-serif text-3xl font-semibold text-navy md:text-4xl"
          >
            Procedures We Offer
          </motion.h2>
          <motion.div
            {...itemProps}
            aria-hidden="true"
            className="h-px w-[60px] bg-gold"
          />
        </motion.div>

        <motion.ul
          {...sectionRevealProps}
          {...gridProps}
          className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2"
        >
          {procedures.map((p) => (
            <motion.li
              key={p.title}
              id={toSlug(p.title)}
              variants={reduceMotion ? undefined : itemVariant}
              className="flex scroll-mt-24 flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-gold"
                />
                <h3 className="font-serif text-2xl font-semibold text-navy">
                  {p.title}
                </h3>
              </div>
              <p className="text-base font-light leading-relaxed text-text-secondary">
                {p.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
