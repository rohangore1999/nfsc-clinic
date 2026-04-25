import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Side-by-side gold stat blocks with a thin separator between.
 * Reusable on /about, /contact, etc.
 *
 * @param {Object} props
 * @param {Array<{ number: string, label: string }>} props.items
 * @param {string} [props.className]
 */
export function Stats({ items, className }) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-12 md:flex-row md:gap-24",
        className
      )}
    >
      {items.map((stat, i) => (
        <Fragment key={stat.label}>
          {i > 0 ? (
            <>
              <div
                aria-hidden="true"
                className="hidden h-24 w-px bg-gold/30 md:block"
              />
              <div
                aria-hidden="true"
                className="h-px w-24 bg-gold/30 md:hidden"
              />
            </>
          ) : null}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 font-serif text-5xl font-light text-gold md:text-6xl">
              {stat.number}
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">
              {stat.label}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
