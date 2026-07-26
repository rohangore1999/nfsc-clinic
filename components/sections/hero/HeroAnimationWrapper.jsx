"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, makeContainerVariant } from "@/lib/motion";

const containerVariant = makeContainerVariant({ stagger: 0.05, delay: 0.05 });

const itemVariant = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * Thin client boundary for Hero entrance animations.
 * The children (H1, tagline, etc.) are server-rendered and visible
 * immediately in the HTML. This wrapper only adds the fade-in effect
 * once JS hydrates — the content is never invisible.
 */
export function HeroAnimationWrapper({ children, className }) {
  const reduceMotion = useReducedMotion();

  const containerProps = reduceMotion
    ? {}
    : {
        variants: containerVariant,
        initial: "hidden",
        animate: "show",
      };

  return (
    <motion.div {...containerProps} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Animated slot inside the Hero. Wraps each content block.
 * On the server, renders as a plain div. On the client, adds
 * Motion variant-based entrance.
 */
export function HeroAnimatedItem({ children, className }) {
  const reduceMotion = useReducedMotion();
  const itemProps = reduceMotion ? {} : { variants: itemVariant };

  return (
    <motion.div {...itemProps} className={className}>
      {children}
    </motion.div>
  );
}
