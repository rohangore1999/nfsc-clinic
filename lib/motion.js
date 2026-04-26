/**
 * Shared motion constants and reusable variants.
 *
 * EASE — expo-out cubic-bezier; standard easing curve across the site.
 * SCROLL_VIEWPORT — default `whileInView` config (fires once at 20% visible).
 * itemVariant / imageVariant / containerVariant — most sections follow
 *   these patterns. Import directly when defaults match; use
 *   `makeContainerVariant({ stagger, delay })` to override stagger/delay.
 */

export const EASE = [0.16, 1, 0.3, 1];

export const SCROLL_VIEWPORT = { once: true, amount: 0.2 };

/** Fade + 16px translateY entrance — used for headings, paragraphs, CTAs, etc. */
export const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Subtle scale-down entrance — used for hero photos and image blocks. */
export const imageVariant = {
  hidden: { opacity: 0, scale: 1.03 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

/** Default stagger container (80ms between children, 100ms initial delay). */
export const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/**
 * Build a stagger container with custom timing.
 * @param {{ stagger?: number, delay?: number }} [options]
 */
export function makeContainerVariant({ stagger = 0.08, delay = 0.1 } = {}) {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}
