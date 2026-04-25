import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Vertical list of items with a gold check-circle icon prefix.
 * Reusable on /about, /contact, /treatments procedure detail pages.
 *
 * @param {Object} props
 * @param {string[]} props.items
 * @param {string} [props.className]
 */
export function CheckBullets({ items, className }) {
  return (
    <ul className={cn("space-y-3 text-text-secondary", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0 text-gold"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <span className="text-base font-light leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
