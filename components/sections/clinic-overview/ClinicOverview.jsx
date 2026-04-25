"use client";

import { motion, useReducedMotion } from "motion/react";
import { Building2, Compass, Sparkles, HeartHandshake } from "lucide-react";
import { site } from "@/content/site";
import { IconFeatureList } from "@/components/ui/IconFeatureList";

const EASE = [0.16, 1, 0.3, 1];

// Resolve icon strings from content/site.js to lucide components.
const ICON_MAP = {
  compass: Compass,
  sparkles: Sparkles,
  heartHandshake: HeartHandshake,
};

const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
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
 * About → Clinic Overview section.
 * Image left + content right on desktop. Image has a decorative gold "L"
 * corner accent in the lower-right (subtle architectural detail from Stitch).
 *
 * Image is currently a placeholder; swap the inner div for
 * <Image src="/images/clinic-reception.jpg" ... /> when the photo arrives.
 */
export function ClinicOverview() {
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

  // Resolve features data with React component references.
  const features = site.about.clinic.features.map((f) => ({
    ...f,
    icon: ICON_MAP[f.icon],
  }));

  return (
    <section
      aria-labelledby="clinic-overview-heading"
      className="bg-section-alt px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Image with gold L corner accent */}
        <motion.div
          {...sectionRevealProps}
          variants={reduceMotion ? undefined : imageVariant}
          className="relative"
        >
          <div className="h-[400px] w-full overflow-hidden rounded-sm border border-hairline bg-background md:h-[600px]">
            {/* TODO: swap for <Image src="/images/clinic-reception.jpg" ... /> when photo lands */}
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-section-alt to-hairline">
              <Building2
                className="h-20 w-20 text-gold/30"
                strokeWidth={1}
                aria-hidden="true"
              />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 border-b border-r border-gold"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          {...sectionRevealProps}
          {...containerProps}
          className="md:pl-4 lg:pl-12"
        >
          <motion.p
            {...itemProps}
            className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold"
          >
            {site.about.clinic.eyebrow}
          </motion.p>

          <motion.h2
            {...itemProps}
            id="clinic-overview-heading"
            className="mb-6 font-serif text-3xl font-semibold leading-tight text-navy md:text-4xl lg:text-5xl"
          >
            {site.about.clinic.title}
          </motion.h2>

          <motion.p
            {...itemProps}
            className="mb-10 text-lg font-light leading-relaxed text-text-secondary"
          >
            {site.about.clinic.description}
          </motion.p>

          <motion.div {...itemProps}>
            <IconFeatureList items={features} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
