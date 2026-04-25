"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

// Sequential pulse with extended trailing fade.
// Each pill follows a 5-stage envelope:
//   1. Rise        — 0.4s, easeOut (quick bloom into peak)
//   2. Hold peak   — 0.6s, linear (sustains so the eye registers the brightness)
//   3. Fade        — 2.75s, easeInOut (slow descent peak → faint ember)
//   4. Tail        — 1.25s, easeOut (ember dissolves to zero, lingering near 0)
//   5. Off         — until next cycle
// Total active = 5s. The "ember" keyframe between fade and full off prevents
// the curve from clipping at zero — the eye loses sight of it gradually
// instead of seeing a hard cutoff.
const ACTIVE = 5;          // active window per pill (s)
const STAGGER = 2;         // offset between adjacent pills (s)
const RISE_END = 0.08;     // 0.4s of 5s = 8%
const HOLD_END = 0.20;     // 0.6s hold (8% → 20%)
const TAIL_START = 0.75;   // last 25% (1.25s) is the ember dissolve

const GLOW_OFF = "0 0 0 0 rgba(201, 160, 79, 0)";
const GLOW_ON = "0 0 30px 3px rgba(201, 160, 79, 0.45)";
// Faint ember the eye can barely register — bridges peak fade to full off
// so the disappearance isn't perceived as a clip.
const GLOW_EMBER = "0 0 14px 1px rgba(201, 160, 79, 0.08)";

const containerVariant = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

function makePillVariant(reduceMotion, count) {
  // Total wall-clock cycle = (count - 1) * STAGGER + ACTIVE
  // For 5 pills: 4*2 + 3 = 11s
  const totalCycle = (count - 1) * STAGGER + ACTIVE;
  const repeatDelay = totalCycle - ACTIVE;

  return {
    hidden: { opacity: 0, y: 8 },
    show: (index) => {
      const lighthouse = reduceMotion
        ? {}
        : {
            boxShadow: [GLOW_OFF, GLOW_ON, GLOW_ON, GLOW_EMBER, GLOW_OFF],
          };

      const lighthouseTransition = reduceMotion
        ? {}
        : {
            boxShadow: {
              duration: ACTIVE,
              times: [0, RISE_END, HOLD_END, TAIL_START, 1],
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay,
              delay: 0.8 + index * STAGGER,
              // Per-segment easing:
              //   rise   → easeOut    (quick bloom into peak)
              //   hold   → linear     (no-op between identical keyframes)
              //   fade   → easeInOut  (peak lingers, then graceful descent)
              //   tail   → easeOut    (ember softly dissolves into zero)
              ease: ["easeOut", "linear", "easeInOut", "easeOut"],
            },
          };

      return {
        opacity: 1,
        y: 0,
        ...lighthouse,
        transition: {
          opacity: { duration: 0.4, ease: EASE },
          y: { duration: 0.4, ease: EASE },
          ...lighthouseTransition,
        },
      };
    },
  };
}

/**
 * Wrapping row of gold-outlined treatment pills.
 * Decorative; not interactive (per Stitch).
 *
 * Animation: stagger reveal, then sequential pulse with trailing afterglow.
 * Pills hand off the spotlight smoothly — the next is brightening while the
 * previous is still fading.
 */
export function TreatmentPills({ items, className }) {
  const reduceMotion = useReducedMotion();
  const pillVariant = makePillVariant(reduceMotion, items.length);

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
          custom={index}
          variants={pillVariant}
          className="rounded-full border border-gold bg-background px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-gold"
        >
          {label}
        </motion.li>
      ))}
    </motion.ul>
  );
}
