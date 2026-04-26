"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { TeamMemberCard } from "./TeamMemberCard";
import {
  containerVariant as headerVariant,
  itemVariant,
  makeContainerVariant,
} from "@/lib/motion";

// Cards stagger after header reveals.
const gridVariant = makeContainerVariant({ stagger: 0.08, delay: 0.2 });

/**
 * About → Our Team section.
 * Centered header (with text-hugging gold underline, matching Stitch),
 * then a 4-up portrait card grid (1/2/4 cols at sm/md/lg).
 */
export function Team() {
  const reduceMotion = useReducedMotion();

  const sectionRevealProps = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.15 },
      };

  const headerProps = reduceMotion ? {} : { variants: headerVariant };
  const itemProps = reduceMotion ? {} : { variants: itemVariant };
  const gridProps = reduceMotion ? {} : { variants: gridVariant };

  return (
    <section
      aria-labelledby="team-heading"
      className="bg-background px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          {...sectionRevealProps}
          {...headerProps}
          className="mb-16 flex flex-col items-center text-center"
        >
          <motion.h2
            {...itemProps}
            id="team-heading"
            className="mb-4 font-serif text-3xl font-semibold text-navy md:text-4xl lg:text-5xl"
          >
            {site.about.team.title}
          </motion.h2>
          <motion.p
            {...itemProps}
            className="mb-6 text-xl italic text-text-secondary"
          >
            {site.about.team.subtitle}
          </motion.p>
          <motion.div
            {...itemProps}
            aria-hidden="true"
            className="h-px w-[80px] bg-gold"
          />
        </motion.div>

        {/* 4-up grid */}
        <motion.div
          {...sectionRevealProps}
          {...gridProps}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {site.about.team.members.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
