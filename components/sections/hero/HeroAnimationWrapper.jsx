import { cn } from "@/lib/utils";

/**
 * Hero entrance — CSS-only staggered fade-up (see `.hero-enter` in globals.css).
 *
 * This is intentionally a plain server component, NOT a Motion client boundary.
 * The hero <h1> is the LCP element; the previous Motion version set the hero to
 * `opacity: 0` in the SSR HTML and only revealed it after React hydrated, which
 * delayed mobile LCP by several seconds on slow connections. CSS keyframes run
 * at first paint (no JS required), so the text is visible immediately.
 *
 * The stagger + reduced-motion handling live in CSS, so both components below
 * just render plain markup and let `.hero-enter > *` drive the animation.
 */
export function HeroAnimationWrapper({ children, className }) {
  return <div className={cn("hero-enter", className)}>{children}</div>;
}

export function HeroAnimatedItem({ children, className }) {
  return <div className={className}>{children}</div>;
}
