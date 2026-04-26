import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { cleanPhone } from "@/lib/strings";

/**
 * Reusable "Call Now" CTA. Opens the device dialer via tel: link.
 * Pairs with BookButton — same sizing/variant API for consistency.
 *
 * @param {Object} props
 * @param {"outline"|"solid"} [props.variant]
 * @param {"sm"|"lg"} [props.size]
 * @param {string} [props.label]
 * @param {string} [props.className]
 */
export function CallButton({
  variant = "outline",
  size = "lg",
  label = "Call Now",
  className,
}) {
  const tel = `tel:${cleanPhone(site.contact.phone)}`;

  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium uppercase tracking-[0.15em] " +
    "transition-colors duration-200 active:scale-[0.98] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

  const sizes = {
    sm: "px-6 py-3 text-xs rounded-sm",
    lg: "px-8 py-4 text-sm rounded-sm",
  };

  const variants = {
    outline: "border border-gold text-gold hover:bg-gold/5",
    solid: "bg-gold text-white hover:bg-gold-dark",
  };

  return (
    <a
      href={tel}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      {label}
    </a>
  );
}
