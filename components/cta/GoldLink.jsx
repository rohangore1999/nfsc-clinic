import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable inline gold text-link with arrow.
 * Used wherever the design has "Learn More →", "Explore Facial Surgery →", etc.
 *
 * If `href` is external (starts with http/https), renders a plain <a> with
 * `target="_blank"` + safe `rel`. Otherwise renders a Next.js <Link> for
 * client-side navigation.
 *
 * @param {Object} props
 * @param {string} props.href
 * @param {React.ReactNode} props.children   - link label
 * @param {string} [props.className]
 */
export function GoldLink({ href, children, className }) {
  const isExternal = /^https?:\/\//i.test(href);

  const classes = cn(
    "group inline-flex items-center gap-2",
    "text-xs font-medium uppercase tracking-[0.18em] text-gold",
    "transition-colors duration-200 hover:text-gold-dark",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
    className
  );

  const inner = (
    <>
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
