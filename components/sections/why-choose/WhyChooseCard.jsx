"use client";

import { motion } from "motion/react";
import {
  BriefcaseMedical,
  Microscope,
  HeartHandshake,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

const ICON_MAP = {
  medical_services: BriefcaseMedical,
  biotech: Microscope,
  volunteer_activism: HeartHandshake,
};

// Variant inherited from parent grid stagger.
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Glassmorphism card on a dark gradient background.
 * Visual recipe: white/10 fill + 20px backdrop-blur + white/20 border +
 * 3px gold top accent + soft shadow. Lifts -5px on hover.
 */
export function WhyChooseCard({ icon, title, description, className }) {
  const Icon = ICON_MAP[icon];

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn(
        "flex flex-col items-center rounded-[20px] border border-white/20 border-t-[3px] border-t-gold",
        "bg-white/10 p-8 text-center backdrop-blur-[20px]",
        "shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
        "transition-colors duration-300 hover:bg-white/[0.18]",
        className
      )}
    >
      {Icon ? (
        <div className="mb-6 text-gold">
          <Icon
            className="h-14 w-14"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </div>
      ) : null}
      <h3 className="mb-4 font-serif text-2xl font-semibold text-white">
        {title}
      </h3>
      <p className="text-base font-light leading-relaxed text-white/70">
        {description}
      </p>
    </motion.div>
  );
}
