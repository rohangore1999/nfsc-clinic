"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Scissors, Wind, Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

// Mapping is local to this component — when we swap placeholders for real images,
// the icon map goes away.
const ICON_MAP = {
  scissors: Scissors,
  wind: Wind,
  droplet: Droplet,
};

/**
 * Single treatment category card — image area (placeholder gradient + icon),
 * title, arrow. Hover lifts the card.
 *
 * Modular: when real photography arrives, swap the gradient block for next/image.
 */
export function TreatmentCard({ title, href, icon, className }) {
  const Icon = ICON_MAP[icon];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn("group h-full", className)}
    >
      <Link
        href={href}
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-background p-4",
          "transition-colors duration-300 hover:border-gold"
        )}
      >
        {/* Image / placeholder area */}
        <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-section-alt to-hairline">
          <div className="absolute inset-0 flex items-center justify-center">
            {Icon ? (
              <Icon
                className="h-12 w-12 text-gold/40 transition-transform duration-700 group-hover:scale-110"
                strokeWidth={1.25}
                aria-hidden="true"
              />
            ) : null}
          </div>
        </div>

        {/* Title + arrow */}
        <div className="flex flex-1 flex-col items-center text-center">
          <h3 className="font-serif text-lg font-semibold tracking-wide text-navy">
            {title}
          </h3>
          <ArrowRight
            className="mt-3 h-5 w-5 text-gold transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      </Link>
    </motion.div>
  );
}
