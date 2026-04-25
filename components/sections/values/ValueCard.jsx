"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Single editorial value card.
 * Big translucent gold number sits behind the content as a watermark.
 * Bottom border (1px gold) separates each value from the next column.
 */
export function ValueCard({ number, title, description, className }) {
  return (
    <motion.div
      variants={cardVariant}
      className={cn(
        "relative border-b border-gold pb-6",
        className
      )}
    >
      {/* Watermark number */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-0 select-none font-serif text-[8rem] font-bold leading-none text-gold/10"
      >
        {number}
      </div>
      {/* Foreground content */}
      <div className="relative z-10 pt-8">
        <h3 className="mb-3 font-serif text-2xl font-bold text-text-primary">
          {title}
        </h3>
        <p className="text-base leading-relaxed text-text-secondary">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
