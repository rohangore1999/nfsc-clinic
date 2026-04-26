"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  itemVariant,
  containerVariant,
  makeContainerVariant,
  SCROLL_VIEWPORT,
} from "@/lib/motion";
import { toSlug } from "@/lib/strings";

// Slightly tighter stagger for the procedure grid than the default header.
const gridVariant = makeContainerVariant({ stagger: 0.06, delay: 0.2 });

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
        viewport: SCROLL_VIEWPORT,
      };
  const headerProps = reduceMotion ? {} : { variants: containerVariant };
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
