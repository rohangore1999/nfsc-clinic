"use client";

import { motion } from "motion/react";
import { ArrowLeftRight, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * Single gallery card — split before/after image area with center gold divider,
 * "Before" / "After" badges, swap handle, and a footer row with title +
 * category pill + timeline.
 *
 * Image halves are currently gradient placeholders. When real photos arrive,
 * replace each placeholder div with <Image src={beforeUrl|afterUrl} ... />.
 */
export function GalleryCard({ title, category, timeline, onClick, className }) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-background",
        "cursor-pointer transition-colors duration-300 hover:border-gold hover:shadow-[0_10px_40px_rgba(0,0,0,0.05)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        className
      )}
    >
      {/* Split before/after image area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* TODO: swap each placeholder for <Image src={...} alt="Before" /> */}
          <div className="flex h-full w-1/2 items-center justify-center bg-gradient-to-br from-section-alt to-hairline">
            <User
              className="h-12 w-12 text-gold/30"
              strokeWidth={1}
              aria-hidden="true"
            />
          </div>
          <div className="flex h-full w-1/2 items-center justify-center bg-gradient-to-bl from-section-alt to-hairline">
            <User
              className="h-12 w-12 text-gold/40"
              strokeWidth={1}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Center gold divider */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 z-10 w-px bg-gold"
        />

        {/* Swap handle (decorative — actual lightbox interaction comes later) */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-background shadow-md"
        >
          <ArrowLeftRight
            className="h-4 w-4 text-gold"
            strokeWidth={1.5}
          />
        </div>

        {/* Before / After badges */}
        <span className="absolute left-4 top-4 z-20 rounded-full bg-navy/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-sm">
          Before
        </span>
        <span className="absolute right-4 top-4 z-20 rounded-full bg-navy/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-gold shadow-sm backdrop-blur-sm">
          After
        </span>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-serif text-2xl font-semibold text-navy">
            {title}
          </h3>
          <span className="rounded-full border border-gold px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-gold">
            {category}
          </span>
        </div>
        <p className="text-sm text-text-muted">{timeline}</p>
      </div>
    </motion.div>
  );
}
