import { TreatmentCard } from "./TreatmentCard";
import { cn } from "@/lib/utils";

/**
 * 3-up grid of treatment category cards.
 * Stacks on mobile; 3 cols at md+. Reused on /treatments index page.
 */
export function TreatmentCardsGrid({ items, className }) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-6 md:grid-cols-3",
        className
      )}
    >
      {items.map((item) => (
        <TreatmentCard key={item.title} {...item} />
      ))}
    </div>
  );
}
