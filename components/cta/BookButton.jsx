import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Reusable "Book Appointment / Book Free Consultation" CTA.
 * Used in: Navbar (outline, sm), Hero (solid, lg), CTA Banner (solid, lg), Mobile drawer (solid, sm).
 *
 * @param {Object} props
 * @param {"outline"|"solid"} [props.variant]
 * @param {"sm"|"lg"} [props.size]
 * @param {string} [props.href]   - default: "#contact" (scrolls to the
 *                                  site-wide CTA banner on the current page)
 * @param {string} [props.label]  - default: "Book Appointment"
 * @param {string} [props.className]
 */
export function BookButton({
  variant = "outline",
  size = "sm",
  href = "#contact",
  label = "Book Appointment",
  className,
}) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap font-medium uppercase tracking-[0.15em] " +
    "transition-colors duration-200 active:scale-[0.98] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

  const sizes = {
    sm: "px-6 py-3 text-xs rounded-sm",
    lg: "px-8 py-4 text-sm rounded-sm",
  };

  const variants = {
    outline:
      "border border-gold text-gold hover:bg-gold hover:text-white",
    solid: "bg-gold text-white hover:bg-gold-dark",
  };

  return (
    <Link
      href={href}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {label}
    </Link>
  );
}
