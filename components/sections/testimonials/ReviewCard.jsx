"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { StarRow } from "@/components/ui/StarRow";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * Single patient review card.
 * Stars at top, body copy (line-clamped to 3 lines until expanded), gold
 * "Read more" toggle, hairline divider, and footer with avatar (initials),
 * name, "Verified Patient", treatment pill.
 */
export function ReviewCard({
  rating,
  text,
  author,
  initials,
  treatment,
  className,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      variants={cardVariant}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn(
        "flex h-full flex-col rounded-2xl border border-hairline bg-background p-6",
        "shadow-sm transition-shadow duration-300 hover:shadow-md",
        className
      )}
    >
      <StarRow count={rating} size="sm" className="mb-4" />

      <p
        className={cn(
          "flex-grow text-base font-light leading-relaxed text-text-secondary",
          !expanded && "line-clamp-3"
        )}
      >
        {text}
      </p>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          "mb-4 mt-3 inline-block self-start text-sm font-medium text-gold transition-colors",
          "hover:text-gold-dark",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        )}
        aria-expanded={expanded}
      >
        {expanded ? "Show less" : "Read more →"}
      </button>

      <div className="mb-4 h-px w-full bg-hairline" />

      <div className="mt-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-section-alt text-sm font-medium text-text-muted"
          >
            {initials}
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">{author}</p>
            <p className="text-xs text-text-muted">Verified Patient</p>
          </div>
        </div>
        <span className="rounded-full border border-gold px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-gold">
          {treatment}
        </span>
      </div>
    </motion.article>
  );
}
