import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Footer link column with serif uppercase heading and a vertical link list.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {Array<{ label: string, href: string }>} props.items
 * @param {string} [props.className]
 */
export function FooterColumn({ title, items, className }) {
  return (
    <div className={className}>
      <h4 className="mb-6 font-serif text-sm uppercase tracking-[0.18em] text-white">
        {title}
      </h4>
      <ul className="space-y-3 text-sm tracking-wide text-white/60">
        {items.map(({ label, href }) => (
          <li key={`${label}-${href}`}>
            <Link
              href={href}
              className="transition-colors duration-200 hover:text-gold"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
