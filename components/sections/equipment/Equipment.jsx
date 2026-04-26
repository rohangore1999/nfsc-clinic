"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { EquipmentCard } from "./EquipmentCard";
import {
  containerVariant as headerVariant,
  itemVariant,
  makeContainerVariant,
} from "@/lib/motion";

// Cards stagger after header (delay 0.2s).
const gridVariant = makeContainerVariant({ stagger: 0.08, delay: 0.2 });

/**
 * About → Advanced Technology section.
 * Centered header (title, gold short underline, subtitle) + 3-up card grid.
 */
export function Equipment() {
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
      aria-labelledby="equipment-heading"
      className="bg-background px-6 py-24 md:px-8 md:py-32"
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
            id="equipment-heading"
            className="mb-4 font-serif text-3xl font-semibold text-navy md:text-4xl lg:text-5xl"
          >
            {site.about.equipment.title}
          </motion.h2>
          <motion.div
            {...itemProps}
            aria-hidden="true"
            className="mb-6 h-1 w-16 bg-gold"
          />
          <motion.p
            {...itemProps}
            className="text-lg font-light text-text-secondary"
          >
            {site.about.equipment.subtitle}
          </motion.p>
        </motion.div>

        {/* 3-up cards */}
        <motion.div
          {...sectionRevealProps}
          {...gridProps}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {site.about.equipment.items.map((item) => (
            <EquipmentCard key={item.title} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
