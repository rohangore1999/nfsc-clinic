"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Quote as QuoteIcon } from "lucide-react";
import { site } from "@/content/site";
import { containerVariant, itemVariant, imageVariant } from "@/lib/motion";

/**
 * About → Philosophy section.
 * Pairs Dr. Nikhil's portrait with his philosophy quote so the words
 * feel personal rather than disembodied. Replaces the standalone
 * AboutQuote section.
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
      className="bg-background px-6 py-24 md:px-8 md:py-32"
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

        {/* Quote — right on desktop, second on mobile */}
        <motion.div
          {...sectionRevealProps}
          {...containerProps}
          className="order-2 md:pl-4 lg:pl-12"
        >
          <motion.div {...itemProps} className="mb-6">
            <QuoteIcon
              className="h-10 w-10 text-gold/50"
              strokeWidth={1.25}
              aria-hidden="true"
            />
          </motion.div>

          <motion.blockquote
            {...itemProps}
            id="about-philosophy-heading"
            className="text-2xl font-light leading-relaxed text-navy md:text-3xl lg:text-4xl"
          >
            &ldquo;{site.doctor.philosophyQuote}&rdquo;
          </motion.blockquote>

          <motion.div
            {...itemProps}
            aria-hidden="true"
            className="my-8 h-px w-[80px] bg-gold"
          />

          <motion.p
            {...itemProps}
            className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted"
          >
            — {site.doctor.name}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
