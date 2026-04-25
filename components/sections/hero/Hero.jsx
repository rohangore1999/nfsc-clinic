"use client";

import { motion, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import { site } from "@/content/site";
import { BookButton } from "@/components/cta/BookButton";
import { CallButton } from "@/components/cta/CallButton";
import { TreatmentPills } from "./TreatmentPills";
import { TreatmentCardsGrid } from "./TreatmentCardsGrid";
import { TrustIconsRow } from "./TrustIconsRow";

const EASE = [0.16, 1, 0.3, 1];

const containerVariant = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  // When user prefers reduced motion, skip animation entirely.
  const containerProps = reduceMotion
    ? {}
    : {
        variants: containerVariant,
        initial: "hidden",
        animate: "show",
      };

  const itemProps = reduceMotion ? {} : { variants: itemVariant };

  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-background px-6 pt-16 pb-20 md:px-8 md:pt-24 md:pb-28"
    >
      <motion.div
        {...containerProps}
        className="mx-auto flex w-full max-w-6xl flex-col items-center text-center"
      >
        {/* 1. Eyebrow / credentials */}
        <motion.p
          {...itemProps}
          className="mb-8 text-xs font-medium uppercase tracking-[0.18em] text-text-muted"
        >
          {site.doctor.credentials}
          <span className="mx-3 text-gold">•</span>
          {site.doctor.experienceLine}
        </motion.p>

        {/* 2. H1 */}
        <motion.h1
          {...itemProps}
          id="hero-heading"
          className="mb-6 max-w-4xl font-serif text-4xl leading-tight text-navy md:text-5xl lg:text-6xl"
        >
          {site.hero.h1}
        </motion.h1>

        {/* 3. Tagline */}
        <motion.p
          {...itemProps}
          className="mb-12 max-w-3xl text-xl italic text-text-secondary md:text-2xl"
        >
          {site.hero.subhead}
        </motion.p>

        {/* 4. Treatment pills */}
        <motion.div {...itemProps} className="mb-16 w-full">
          <TreatmentPills items={site.hero.pills} />
        </motion.div>

        {/* 5. Treatment cards grid */}
        <motion.div {...itemProps} className="mb-20 w-full">
          <TreatmentCardsGrid items={site.hero.cards} />
        </motion.div>

        {/* 6. Decorative flourish */}
        <motion.div
          {...itemProps}
          aria-hidden="true"
          className="mb-10 text-xl tracking-[0.5em] text-gold/60"
        >
          <span className="italic font-light">———✦———</span>
        </motion.div>

        {/* 7. CTAs */}
        <motion.div
          {...itemProps}
          className="mb-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <BookButton
            variant="solid"
            size="lg"
            label={site.hero.primaryCta}
          />
          <CallButton size="lg" label={site.hero.secondaryCta} />
        </motion.div>

        {/* 8. Social proof */}
        <motion.p
          {...itemProps}
          className="mb-10 flex items-center gap-1.5 text-xs tracking-wide text-text-muted md:text-sm"
        >
          <Star
            className="h-3.5 w-3.5 fill-gold text-gold"
            strokeWidth={0}
            aria-hidden="true"
          />
          {site.hero.socialProof}
        </motion.p>

        {/* 9. Trust icons */}
        <motion.div {...itemProps} className="w-full max-w-4xl">
          <TrustIconsRow />
        </motion.div>
      </motion.div>
    </section>
  );
}
