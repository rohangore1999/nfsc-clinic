"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE, makeContainerVariant } from "@/lib/motion";

const ACTIVE = 5;
const STAGGER = 2;

const containerVariant = makeContainerVariant({ stagger: 0.04, delay: 0.1 });

const pillVariant = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.4, ease: EASE },
      y: { duration: 0.4, ease: EASE },
    },
  },
};

/**
 * Wrapping row of gold-outlined treatment pills.
 * Decorative; not interactive.
 *
 * Entrance: Motion stagger reveal.
 * Glow: CSS @keyframes `pill-glow` (defined in globals.css) — each pill
 * gets a staggered `animation-delay` so they pulse sequentially. This is
 * far cheaper than Motion's boxShadow animation because box-shadow paint
 * is handled by the compositor via CSS, not re-triggered per JS frame.
 */
export function TreatmentPills({ items, className }) {
  const reduceMotion = useReducedMotion();
  const count = items.length;
  const totalCycle = (count - 1) * STAGGER + ACTIVE;

  return (
    <motion.ul
      variants={containerVariant}
      initial="hidden"
      animate="show"
      className={cn(
        "flex flex-wrap items-center justify-center gap-3",
        className
      )}
    >
      {items.map((label, index) => (
        <motion.li
          key={label}
          variants={pillVariant}
          className="pill-glow rounded-full border border-gold bg-background px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-gold"
          style={
            reduceMotion
              ? undefined
              : {
                  animation: `pill-glow ${ACTIVE}s ease-in-out infinite`,
                  animationDelay: `${0.8 + index * STAGGER}s`,
                }
          }
        >
          {label}
        </motion.li>
      ))}
    </motion.ul>
  );
}
