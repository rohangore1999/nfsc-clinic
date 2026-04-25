"use client";

import { motion } from "motion/react";
import { Scissors, Wind, Droplet } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProcedurePills } from "./ProcedurePills";
import { GoldLink } from "@/components/cta/GoldLink";

const EASE = [0.16, 1, 0.3, 1];

const ICON_MAP = {
  scissors: Scissors,
  wind: Wind,
  droplet: Droplet,
};

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

const imageVariant = {
  hidden: { opacity: 0, scale: 1.03 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

/**
 * Single alternating treatment row.
 * `reverse` flips image/content sides on desktop (md+); mobile always stacks
 * with image on top, content below.
 *
 * Image area is currently a gradient placeholder + lucide icon. Replace the
 * inner div with <Image src="..." /> when real photography arrives.
 */
export function TreatmentRow({ row, reverse }) {
  const Icon = ICON_MAP[row.icon];

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={cn(
        "flex flex-col items-center gap-12 md:gap-16",
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      {/* Image / placeholder */}
      <motion.div
        variants={imageVariant}
        className="group aspect-[4/3] w-full overflow-hidden rounded-xl border border-hairline bg-section-alt shadow-sm md:aspect-square md:w-1/2"
      >
        <div
          className={cn(
            "flex h-full w-full items-center justify-center",
            "bg-gradient-to-br from-section-alt to-hairline",
            "transition-transform duration-700 group-hover:scale-105"
          )}
        >
          {Icon ? (
            <Icon
              className="h-16 w-16 text-gold/30"
              strokeWidth={1}
              aria-hidden="true"
            />
          ) : null}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariant}
        className="flex w-full flex-col md:w-1/2"
      >
        <motion.span
          variants={itemVariant}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold"
        >
          {row.index} — {row.label}
        </motion.span>

        <motion.h3
          variants={itemVariant}
          className="mb-6 font-serif text-3xl font-semibold text-navy md:text-4xl"
        >
          {row.title}
        </motion.h3>

        <motion.p
          variants={itemVariant}
          className="mb-8 text-lg font-light leading-relaxed text-text-secondary"
        >
          {row.description}
        </motion.p>

        <motion.div variants={itemVariant} className="mb-8">
          <ProcedurePills items={row.procedures} />
        </motion.div>

        <motion.div variants={itemVariant}>
          <GoldLink href={`/treatments/${row.slug}`}>
            Explore {row.title}
          </GoldLink>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
