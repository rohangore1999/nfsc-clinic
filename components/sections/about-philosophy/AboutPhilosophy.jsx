"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { containerVariant, itemVariant, imageVariant } from "@/lib/motion";

/**
 * About → Philosophy section ("Believe — The Art of Surgery").
 * Mirrors DoctorProfile: image LEFT / content RIGHT on desktop,
 * image first on mobile. Same offset gold border treatment so the
 * pair reads as a spread.
 */
export function AboutPhilosophy() {
  const reduceMotion = useReducedMotion();

  const sectionRevealProps = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.2 },
      };

  const containerProps = reduceMotion ? {} : { variants: containerVariant };
  const itemProps = reduceMotion ? {} : { variants: itemVariant };

  return (
    <section
      aria-labelledby="about-philosophy-heading"
      className="bg-section-alt px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Portrait — left on desktop, first on mobile */}
        <motion.div
          {...sectionRevealProps}
          variants={reduceMotion ? undefined : imageVariant}
          className="relative order-1"
        >
          {/* Decorative offset gold border behind */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 -translate-x-4 translate-y-4 rounded-sm border border-gold"
          />
          {/* Portrait container — height follows image aspect ratio */}
          <div className="relative z-10 w-full overflow-hidden rounded-sm border border-hairline bg-background">
            <Image
              src={site.about.philosophy.image}
              alt={site.about.philosophy.imageAlt}
              width={3000}
              height={4000}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </motion.div>

        {/* Content — right on desktop, second on mobile */}
        <motion.div
          {...sectionRevealProps}
          {...containerProps}
          className="order-2 md:pl-4 lg:pl-12"
        >
          <motion.p
            {...itemProps}
            className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold"
          >
            {site.about.philosophy.eyebrow}
          </motion.p>

          <motion.h2
            {...itemProps}
            id="about-philosophy-heading"
            className="mb-6 font-serif text-3xl font-semibold leading-tight text-navy md:text-4xl lg:text-5xl"
          >
            {site.about.philosophy.heading}
          </motion.h2>

          <motion.div
            {...itemProps}
            aria-hidden="true"
            className="mb-8 h-px w-[80px] bg-gold"
          />

          <motion.p
            {...itemProps}
            className="text-lg font-light leading-relaxed text-text-secondary"
          >
            {site.about.philosophy.body}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
