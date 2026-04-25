import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Reusable breadcrumb. Items with `href` become Links; the last item
 * (current page) should omit `href` and gets `aria-current="page"`.
 *
 * @param {Object} props
 * @param {Array<{ label: string, href?: string }>} props.items
 * @param {string} [props.className]
 */
export function Breadcrumb({ items, className }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "text-xs uppercase tracking-[0.2em] text-text-muted",
        className
      )}
    >
      <ol className="flex flex-wrap items-center justify-center gap-2">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className="text-text-muted/60">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors duration-200 hover:text-gold"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-text-secondary">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
