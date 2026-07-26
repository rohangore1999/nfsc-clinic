import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toSlug } from "@/lib/strings";

/**
 * "Related Procedures" section for procedure detail pages.
 *
 * Shows up to 4 sibling procedures from the same category (excluding the
 * current one) plus up to 2 from a related category. This creates the
 * internal link mesh that Google needs to understand topic clusters and
 * distribute page authority across the site.
 *
 * @param {{ categorySlug: string, currentSlug: string, siblings: Array<{ title: string, description: string }>, crossLinks?: Array<{ categorySlug: string, categoryTitle: string, title: string, description: string }> }} props
 */
export function RelatedProcedures({
  categorySlug,
  currentSlug,
  siblings,
  crossLinks = [],
}) {
  const siblingLinks = siblings
    .filter((p) => toSlug(p.title) !== currentSlug)
    .slice(0, 4);

  if (siblingLinks.length === 0 && crossLinks.length === 0) return null;

  return (
    <section
      aria-labelledby="related-procedures-heading"
      className="bg-section-alt px-6 py-16 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="related-procedures-heading"
          className="mb-2 font-serif text-2xl font-semibold text-navy md:text-3xl"
        >
          Related Procedures
        </h2>
        <p className="mb-8 text-sm text-text-muted">
          Explore other treatments that may complement your goals
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {siblingLinks.map((proc) => (
            <ProcedureLink
              key={proc.title}
              href={`/treatments/${categorySlug}/${toSlug(proc.title)}`}
              title={proc.title}
              description={proc.description}
            />
          ))}
          {crossLinks.map((proc) => (
            <ProcedureLink
              key={proc.title}
              href={`/treatments/${proc.categorySlug}/${toSlug(proc.title)}`}
              title={proc.title}
              description={proc.description}
              badge={proc.categoryTitle}
            />
          ))}
        </div>

        {/* Link back to category page */}
        <div className="mt-8 text-center">
          <Link
            href={`/treatments/${categorySlug}`}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium text-gold",
              "transition-colors hover:text-gold-dark"
            )}
          >
            View all treatments in this category
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProcedureLink({ href, title, description, badge }) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col rounded-xl border border-hairline bg-background p-5",
        "transition-all duration-200 hover:border-gold/40 hover:shadow-sm"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-navy group-hover:text-gold transition-colors duration-200">
          {title}
        </h3>
        <ArrowRight
          className="mt-0.5 h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-gold"
          strokeWidth={1.5}
        />
      </div>
      {badge ? (
        <span className="mt-2 inline-block self-start rounded-full border border-gold/30 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wider text-gold">
          {badge}
        </span>
      ) : null}
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">
        {description}
      </p>
    </Link>
  );
}
