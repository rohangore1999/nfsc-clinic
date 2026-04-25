"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { GoldLink } from "@/components/cta/GoldLink";
import { InlineBookingForm } from "./InlineBookingForm";

const EASE = [0.16, 1, 0.3, 1];

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
 * "Begin Your Aesthetic Journey" — dark CTA banner with inline booking form
 * + clinic image. On desktop: form left, image right. On mobile: image stacks
 * on top via `flex-col-reverse`.
 *
 * Image area is a gradient placeholder until real clinic photography arrives.
 */
export function CtaBanner() {
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
      id="contact"
      aria-labelledby="cta-banner-heading"
      className="relative scroll-mt-24 bg-navy px-6 pt-24 pb-16 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:gap-12">
          {/* Form column */}
          <motion.div
            {...sectionRevealProps}
            {...containerProps}
            className="flex-1 w-full text-center md:text-left"
          >
            <motion.h2
              {...itemProps}
              id="cta-banner-heading"
              className="mb-4 font-serif text-3xl font-semibold text-gold md:text-4xl lg:text-5xl"
            >
              {site.ctaBanner.title}
            </motion.h2>

            <motion.p
              {...itemProps}
              className="mb-8 text-lg font-light text-white/60"
            >
              {site.ctaBanner.subtitle}
            </motion.p>

            <motion.div
              {...itemProps}
              className="mx-auto md:mx-0"
            >
              <InlineBookingForm />
            </motion.div>

            <motion.p
              {...itemProps}
              className="mt-6 text-sm text-white/40"
            >
              {site.ctaBanner.fallback}{" "}
              <a
                href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}
                className="text-white/60 transition-colors hover:text-gold"
              >
                {site.contact.phone}
              </a>
            </motion.p>
          </motion.div>

          {/* Image column */}
          <motion.div
            {...sectionRevealProps}
            variants={reduceMotion ? undefined : imageVariant}
            className="w-full flex-1 md:-mt-16"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40">
              <Image
                src="/images/nfsc-contact-us.jpg"
                alt={`${site.fullName} clinic interior`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Visit Our Clinic */}
        <div className="mt-16 flex flex-col items-center text-center">
          <GoldLink href={site.contact.mapDirectionsUrl}>
            <MapPin
              className="h-4 w-4"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            {site.ctaBanner.visit}
          </GoldLink>
          <p className="mt-3 text-xs text-white/70">{site.contact.address}</p>
        </div>
      </div>
    </section>
  );
}
