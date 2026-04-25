import { cn } from "@/lib/utils";

/**
 * Static gold-outlined procedure pills.
 * Decorative (cursor-default) but reactive to hover (gold fill).
 *
 * Distinct from hero/TreatmentPills (which is animated and decorative).
 * Reused on /treatments index + each /treatments/[slug] detail page.
 *
 * @param {Object} props
 * @param {string[]} props.items
 * @param {string} [props.className]
 */
export function ProcedurePills({ items, className }) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "rounded-full border border-gold bg-background px-4 py-1.5 text-sm",
            "text-gold transition-colors duration-200",
            "hover:bg-gold hover:text-white",
            "cursor-default select-none"
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
