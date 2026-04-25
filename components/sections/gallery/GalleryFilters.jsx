"use client";

import { cn } from "@/lib/utils";

/**
 * Sticky horizontal filter row.
 * Active filter = solid gold; others = gold-outline ghost.
 *
 * Sticky offset = navbar height (h-20 = 80px).
 *
 * @param {Object} props
 * @param {string[]} props.options
 * @param {string} props.value
 * @param {(next: string) => void} props.onChange
 */
export function GalleryFilters({ options, value, onChange }) {
  return (
    <div className="sticky top-20 z-30 border-b border-hairline bg-background/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl overflow-x-auto px-6 py-4 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul
          role="tablist"
          className="flex min-w-max items-center justify-center gap-3"
        >
          {options.map((option) => {
            const isActive = option === value;
            return (
              <li key={option} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onChange(option)}
                  className={cn(
                    "rounded-full border px-6 py-2 text-xs font-medium uppercase tracking-[0.18em]",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
                    isActive
                      ? "border-gold bg-gold text-white shadow-sm"
                      : "border-hairline bg-background text-text-secondary hover:border-gold hover:text-gold"
                  )}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
