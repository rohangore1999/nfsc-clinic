import { cn } from "@/lib/utils";

/**
 * Vertical list of icon + title + description rows.
 * Each item: gold icon (top-aligned) on the left, title + description on the right.
 *
 * Designed to be reused across About, Equipment & Technology, Clinic Values, etc.
 *
 * @param {Object} props
 * @param {Array<{ icon: React.ComponentType, title: string, description: string }>} props.items
 *   - icon = a lucide component (or any React component accepting className/strokeWidth)
 * @param {string} [props.className]
 */
export function IconFeatureList({ items, className }) {
  return (
    <ul className={cn("grid gap-6", className)}>
      {items.map(({ icon: Icon, title, description }) => (
        <li key={title} className="flex items-start gap-4">
          {Icon ? (
            <Icon
              className="mt-1 h-6 w-6 shrink-0 text-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          ) : null}
          <div>
            <h3 className="mb-1 font-serif text-xl font-semibold text-navy">
              {title}
            </h3>
            <p className="text-base font-light leading-relaxed text-text-secondary">
              {description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
