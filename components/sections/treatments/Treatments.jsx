"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { TreatmentRow } from "./TreatmentRow";
import {
  containerVariant as headerVariant,
  itemVariant,
} from "@/lib/motion";

/**
 * "Our Treatments" — alternating rows of category cards with editorial spacing.
 * Each TreatmentRow flips its image/content sides based on its index.
 * A thin gold divider sits between rows for visual rhythm.
 *
 * @param {Object} props
 * @param {boolean} [props.showHeader=true]
 *   - default true (home page where the section needs its own title)
 *   - pass false on /treatments index where PageHero already shows the title
 */
export function Treatments({ showHeader = true }) {
  const reduceMotion = useReducedMotion();

  const headerProps = reduceMotion
    ? {}
    : {
        variants: headerVariant,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.3 },
      };
  const itemProps = reduceMotion ? {} : { variants: itemVariant };

  return (
    <section
      aria-labelledby={showHeader ? "treatments-heading" : undefined}
      aria-label={!showHeader ? "Treatments" : undefined}
      className="bg-background px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {showHeader ? (
          <motion.div
            {...headerProps}
            className="mb-20 flex flex-col items-center text-center"
          >
            <motion.h2
              {...itemProps}
              id="treatments-heading"
              className="mb-4 font-serif text-3xl font-semibold text-navy md:text-4xl"
            >
              {site.treatments.title}
            </motion.h2>

            <motion.p
              {...itemProps}
              className="mb-6 text-xl italic text-text-secondary"
            >
              {site.treatments.subtitle}
            </motion.p>

            <motion.div
              {...itemProps}
              aria-hidden="true"
              className="h-px w-[80px] bg-gold"
            />
          </motion.div>
        ) : null}

        {/* Rows with thin gold dividers between */}
        <div className="flex flex-col">
          {site.treatments.rows.map((row, index) => (
            <div key={row.slug}>
              {index > 0 ? (
                <div
                  aria-hidden="true"
                  className="mx-auto my-20 h-px w-[80px] bg-gold/50"
                />
              ) : null}
              <TreatmentRow row={row} reverse={index % 2 === 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
