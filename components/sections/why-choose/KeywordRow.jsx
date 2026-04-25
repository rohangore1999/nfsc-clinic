import { cn } from "@/lib/utils";

/**
 * Centered uppercase row with gold dot separators between items.
 * Reusable on /about, /contact, etc.
 *
 * @param {Object} props
 * @param {string[]} props.items
 * @param {"light"|"dark"} [props.tone] - default "dark" (white text on dark bg)
 */
export function KeywordRow({ items, tone = "dark", className }) {
  const textCls =
    tone === "dark" ? "text-white/50" : "text-text-secondary";

  return (
    <ul
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.18em] md:gap-4 md:text-sm",
        textCls,
        className
      )}
    >
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-2 md:gap-4">
          <span>{item}</span>
          {i < items.length - 1 ? (
            <span aria-hidden="true" className="text-lg leading-none text-gold">
              •
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
