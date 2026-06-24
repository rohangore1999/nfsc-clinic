"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
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
 * Each procedure title links to its dedicated detail page.
 * Used on /treatments/[slug] pages.
 *
 * @param {Object} props
 * @param {Array<{ title: string, description: string }>} props.procedures
 * @param {string} props.categorySlug - parent treatment slug for building links
 */
export function ProcedureList({ procedures, categorySlug }) {
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
          {procedures.map((p) => {
            const procedureSlug = toSlug(p.title);
            const href = `/treatments/${categorySlug}/${procedureSlug}`;
            return (
              <motion.li
                key={p.title}
                id={procedureSlug}
                variants={reduceMotion ? undefined : itemVariant}
                className="flex scroll-mt-24 flex-col gap-3"
              >
                <Link
                  href={href}
                  className="group flex items-center gap-3 transition-transform duration-300 hover:translate-x-1"
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-gold transition-all duration-300 group-hover:w-12"
                  />
                  <h3 className="font-serif text-2xl font-semibold text-navy transition-colors duration-300 group-hover:text-gold">
                    {p.title}
                  </h3>
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
                <p className="text-base font-light leading-relaxed text-text-secondary">
                  {p.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
