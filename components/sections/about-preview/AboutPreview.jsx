"use client";

import { motion, useReducedMotion } from "motion/react";
import { User } from "lucide-react";
import { site } from "@/content/site";
import { GoldLink } from "@/components/cta/GoldLink";
import { CheckBullets } from "./CheckBullets";
import { containerVariant, itemVariant, imageVariant as portraitVariant } from "@/lib/motion";

/**
 * "Meet Dr. Nikhil" section.
 * Layout (Stitch): content right + portrait left on desktop, content above
 * portrait on mobile. Achieved with `md:flex-row-reverse` — content is first
 * in DOM order (top on mobile, right on desktop).
 *
 * Portrait area is currently a placeholder; swap the inner div for
 * <Image src="/images/dr-nikhil.jpg" ... /> when the photo arrives.
 */
export function AboutPreview() {
  const reduceMotion = useReducedMotion();

  const sectionRevealProps = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.2 },
      };

  const containerProps = reduceMotion
    ? {}
    : { variants: containerVariant };

  const itemProps = reduceMotion ? {} : { variants: itemVariant };

  return (
    <section
      aria-labelledby="about-preview-heading"
      className="bg-section-alt px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row-reverse md:items-center md:gap-16">
        {/* Content column — DOM first; visually right on desktop, top on mobile */}
        <motion.div
          {...sectionRevealProps}
          {...containerProps}
          className="flex-1 text-center md:text-left"
        >
          <motion.h2
            {...itemProps}
            id="about-preview-heading"
            className="mb-4 font-serif text-3xl font-semibold text-navy md:text-4xl"
          >
            Meet {site.doctor.name}
          </motion.h2>

          <motion.div
            {...itemProps}
            aria-hidden="true"
            className="mx-auto mb-8 h-px w-[80px] bg-gold md:mx-0"
          />

          <motion.p
            {...itemProps}
            className="mb-8 text-lg font-light leading-relaxed text-text-secondary"
          >
            {site.doctor.bioLong}
          </motion.p>

          <motion.div
            {...itemProps}
            className="mb-8 inline-block text-left md:block"
          >
            <CheckBullets items={site.doctor.bullets} />
          </motion.div>

          <motion.div {...itemProps}>
            <GoldLink href="/about">Learn More</GoldLink>
          </motion.div>
        </motion.div>

        {/* Portrait column — DOM second; visually left on desktop, bottom on mobile */}
        <motion.div
          {...sectionRevealProps}
          variants={reduceMotion ? undefined : portraitVariant}
          className="w-full max-w-md flex-1"
        >
          <div className="aspect-[3/4] border border-hairline bg-background p-4">
            {/* TODO: replace placeholder with <Image src="/images/dr-nikhil.jpg" ... /> */}
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-section-alt to-hairline">
              <User
                className="h-20 w-20 text-gold/30"
                strokeWidth={1}
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
