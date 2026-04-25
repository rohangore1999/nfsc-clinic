"use client";

import { cn } from "@/lib/utils";

/**
 * Centered horizontal filter pill row.
 * Active filter = solid gold; inactive = gold-outline.
 *
 * @param {Object} props
 * @param {string[]} props.options
 * @param {string} props.value
 * @param {(next: string) => void} props.onChange
 */
export function TestimonialFilters({ options, value, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Filter reviews"
      className="flex flex-wrap items-center justify-center gap-3"
    >
      {options.map((option) => {
        const isActive = option === value;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-6 py-2 text-sm font-medium uppercase tracking-[0.15em]",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
              isActive
                ? "border-gold bg-gold text-white shadow-sm"
                : "border-gold bg-background text-gold hover:bg-gold/5"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
