import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable row of filled gold stars.
 *
 * @param {Object} props
 * @param {number} props.count       - how many stars to fill (out of `total`)
 * @param {number} [props.total=5]
 * @param {"sm"|"md"} [props.size]
 * @param {string} [props.className]
 */
export function StarRow({ count = 5, total = 5, size = "md", className }) {
  const sz = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`${count} out of ${total} stars`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          className={cn(sz, i < count ? "fill-gold text-gold" : "fill-none text-gold/30")}
          strokeWidth={i < count ? 0 : 1.5}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
