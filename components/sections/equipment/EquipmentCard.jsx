"use client";

import { motion } from "motion/react";
import { Microscope, Zap, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const ICON_MAP = {
  microscope: Microscope,
  zap: Zap,
  rotateCw: RotateCw,
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Single equipment / technology card.
 * Image placeholder area on top + content area below with title, description,
 * and a gold-outlined treatment tag pill.
 *
 * Image area is currently a gradient placeholder; swap for next/image when
 * real photography lands.
 */
export function EquipmentCard({ icon, title, description, tag, className }) {
  const Icon = ICON_MAP[icon];

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-background",
        "transition-shadow duration-300 hover:shadow-lg",
        className
      )}
    >
      {/* Image / placeholder */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-section-alt to-hairline">
        <div className="flex h-full w-full items-center justify-center">
          {Icon ? (
            <Icon
              className="h-14 w-14 text-gold/40 transition-transform duration-700 group-hover:scale-110"
              strokeWidth={1.25}
              aria-hidden="true"
            />
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-start p-6">
        <h3 className="mb-2 font-serif text-lg font-bold text-text-primary">
          {title}
        </h3>
        <p className="mb-6 flex-grow text-sm text-text-muted">{description}</p>
        <span className="inline-block rounded-full border border-gold px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
          {tag}
        </span>
      </div>
    </motion.div>
  );
}
