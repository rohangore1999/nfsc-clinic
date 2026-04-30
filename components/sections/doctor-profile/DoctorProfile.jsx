"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { containerVariant, itemVariant, imageVariant } from "@/lib/motion";

/**
 * About → Lead Surgeon Dr. Nikhil section.
 * Layout:
 *   - Mobile: portrait first, content below (order-1, order-2)
 *   - Desktop: content left, portrait right (md:order-1, md:order-2)
 *
 * Portrait has a decorative offset gold border behind it (translate-x/y 4px).
 * Specialty pills are a subtle (no-hover) variant — distinct from the
 * interactive ProcedurePills used in /treatments.
 */
export function DoctorProfile() {
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
      aria-labelledby="doctor-profile-heading"
      className="bg-section-alt px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Content — left on desktop, second on mobile */}
        <motion.div
          {...sectionRevealProps}
          {...containerProps}
          className="order-2 md:order-1 md:pr-4 lg:pr-12"
        >
          <motion.p
            {...itemProps}
            className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold"
          >
            {site.about.doctorProfile.eyebrow}
          </motion.p>

          <motion.h2
            {...itemProps}
            id="doctor-profile-heading"
            className="mb-1 font-serif text-3xl font-semibold leading-tight text-navy md:text-4xl lg:text-5xl"
          >
            {site.doctor.name}
          </motion.h2>

          <motion.p
            {...itemProps}
            className="mb-6 text-xl font-light text-text-muted"
          >
            {site.doctor.degree}
          </motion.p>

          <motion.p
            {...itemProps}
            className="mb-8 text-lg font-light leading-relaxed text-text-secondary"
          >
            {site.doctor.bioFull}
          </motion.p>

          <motion.div
            {...itemProps}
            className="flex flex-wrap gap-3"
          >
            {site.doctor.specialties.map((specialty) => (
              <span
                key={specialty}
                className={cn(
                  "rounded-full border border-hairline bg-section-alt",
                  "px-4 py-2 text-xs font-medium uppercase tracking-[0.15em]",
                  "text-text-secondary"
                )}
              >
                {specialty}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Portrait — right on desktop, first on mobile */}
        <motion.div
          {...sectionRevealProps}
          variants={reduceMotion ? undefined : imageVariant}
          className="relative order-1 md:order-2"
        >
          {/* Decorative offset gold border behind */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 translate-x-4 translate-y-4 rounded-sm border border-gold"
          />
          {/* Portrait container — height follows image aspect ratio */}
          <div className="relative z-10 w-full overflow-hidden rounded-sm border border-hairline bg-background">
            <Image
              src="/images/nikhil/about-nikhil3.jpg"
              alt={`${site.doctor.name} — ${site.about.doctorProfile.eyebrow}`}
              width={3000}
              height={4000}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
