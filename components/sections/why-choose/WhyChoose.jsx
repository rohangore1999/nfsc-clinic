"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { WhyChooseCard } from "./WhyChooseCard";
import { KeywordRow } from "./KeywordRow";
import {
  containerVariant,
  itemVariant,
  makeContainerVariant,
} from "@/lib/motion";

// Nested stagger inside the grid so each card reveals after the heading row.
const cardsContainerVariant = makeContainerVariant({ stagger: 0.08, delay: 0 });

export function WhyChoose() {
  const reduceMotion = useReducedMotion();

  const containerProps = reduceMotion
    ? {}
    : {
        variants: containerVariant,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.2 },
      };
  const itemProps = reduceMotion ? {} : { variants: itemVariant };
  const gridProps = reduceMotion ? {} : { variants: cardsContainerVariant };

  return (
    <section
      aria-labelledby="why-choose-heading"
      className="relative overflow-hidden bg-gradient-to-b from-navy to-[#0F0F1A] px-6 py-24 md:px-8 md:py-32"
    >
      {/* Decorative gold orb — static CSS gradient (GPU-friendly) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,160,79,0.15)_0%,transparent_70%)] mix-blend-screen" />
      </div>

      <motion.div
        {...containerProps}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center"
      >
        {/* Title */}
        <motion.h2
          {...itemProps}
          id="why-choose-heading"
          className="mb-4 text-center font-serif text-4xl font-semibold text-white md:text-5xl"
        >
          {site.whyChoose.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          {...itemProps}
          className="mb-6 text-center text-xl italic text-white/70"
        >
          {site.whyChoose.subtitle}
        </motion.p>

        {/* Gold divider */}
        <motion.div
          {...itemProps}
          aria-hidden="true"
          className="mb-16 h-[2px] w-[60px] bg-gold"
        />

        {/* Cards grid */}
        <motion.div
          {...gridProps}
          className="grid w-full grid-cols-1 gap-8 md:grid-cols-3"
        >
          {site.whyChoose.cards.map((card) => (
            <WhyChooseCard key={card.title} {...card} />
          ))}
        </motion.div>

        {/* Keyword row */}
        <motion.div {...itemProps} className="mt-16 w-full">
          <KeywordRow items={site.whyChoose.keywords} />
        </motion.div>
      </motion.div>
    </section>
  );
}
