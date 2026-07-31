import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, procedureSchema } from "@/lib/schema";
import { treatmentsDetail, treatmentSlugs } from "@/content/treatments-detail";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { TreatmentHero } from "@/components/sections/treatment-detail/TreatmentHero";
import { ProcedureDetailContent } from "@/components/sections/treatment-detail/ProcedureDetailContent";
import { RelatedProcedures } from "@/components/sections/treatment-detail/RelatedProcedures";
import { toSlug } from "@/lib/strings";

/**
 * Map of category slug → related category slugs for cross-linking.
 * Only includes logical pairings where a patient exploring one might
 * also be interested in the other.
 */
const RELATED_CATEGORIES = {
  "facial-plastic-surgery": ["non-surgical-facial-aesthetics", "cosmetic-treatments"],
  "non-surgical-facial-aesthetics": ["facial-plastic-surgery", "cosmetic-treatments"],
  "cosmetic-treatments": ["facial-plastic-surgery", "dermatology"],
  "maxillofacial-and-oral-surgery": ["dental", "facial-plastic-surgery"],
  dental: ["maxillofacial-and-oral-surgery", "cosmetic-treatments"],
  dermatology: ["cosmetic-treatments", "hair-treatments"],
  "hair-treatments": ["dermatology", "cosmetic-treatments"],
};

/**
 * Default MedicalProcedure "kind" per category for JSON-LD accuracy.
 * Individual procedures can override this with a `procedureKind` field
 * in content/treatments-detail.js (e.g. surgical implants inside a
 * mostly-noninvasive dental category).
 */
const CATEGORY_PROCEDURE_KIND = {
  "facial-plastic-surgery": "surgical",
  "non-surgical-facial-aesthetics": "percutaneous",
  "cosmetic-treatments": "noninvasive",
  "maxillofacial-and-oral-surgery": "surgical",
  dental: "noninvasive",
  dermatology: "noninvasive",
  "hair-treatments": "surgical",
};

/**
 * Get cross-category procedure links for internal linking.
 * Returns up to 2 procedures from related categories.
 */
function getCrossLinks(categorySlug) {
  const related = RELATED_CATEGORIES[categorySlug] || [];
  const links = [];
  for (const relSlug of related) {
    const relCat = treatmentsDetail[relSlug];
    if (!relCat) continue;
    const proc = relCat.procedures[0];
    if (proc) {
      links.push({
        categorySlug: relSlug,
        categoryTitle: relCat.title,
        title: proc.title,
        description: proc.description,
      });
    }
    if (links.length >= 2) break;
  }
  return links;
}

/**
 * Helper: find a procedure inside a treatment category by its slug.
 */
function findProcedure(categorySlug, procedureSlug) {
  const category = treatmentsDetail[categorySlug];
  if (!category) return null;
  const procedure = category.procedures.find(
    (p) => toSlug(p.title) === procedureSlug
  );
  if (!procedure) return null;
  return { category, procedure };
}

/**
 * Pre-render every known procedure page at build time (SSG).
 */
export function generateStaticParams() {
  const params = [];
  for (const slug of treatmentSlugs) {
    const cat = treatmentsDetail[slug];
    for (const proc of cat.procedures) {
      params.push({ slug, procedureSlug: toSlug(proc.title) });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug, procedureSlug } = await params;
  const match = findProcedure(slug, procedureSlug);
  if (!match) return {};
  return buildMetadata({
    title: `${match.procedure.title} — Mumbai`,
    description:
      match.procedure.description.length > 155
        ? match.procedure.description.slice(0, 152) + "…"
        : match.procedure.description,
    path: `/treatments/${slug}/${procedureSlug}`,
  });
}

export default async function ProcedureDetailPage({ params }) {
  const { slug, procedureSlug } = await params;
  const match = findProcedure(slug, procedureSlug);
  if (!match) notFound();

  const { category, procedure } = match;
  const detail = procedure.detailContent || {};

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Treatments", path: "/treatments" },
          { name: category.breadcrumbLabel, path: `/treatments/${slug}` },
          {
            name: procedure.title,
            path: `/treatments/${slug}/${procedureSlug}`,
          },
        ])}
      />
      <JsonLd
        data={procedureSchema({
          name: procedure.title,
          slug: `${slug}/${procedureSlug}`,
          description: procedure.description,
          kind:
            procedure.procedureKind ||
            CATEGORY_PROCEDURE_KIND[slug] ||
            "surgical",
        })}
      />
      <main id="main-content">
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Treatments", href: "/treatments" },
            { label: category.breadcrumbLabel, href: `/treatments/${slug}` },
            { label: procedure.title },
          ]}
          title={procedure.title}
          subtitle={procedure.description}
        />
        <TreatmentHero slug={procedureSlug} title={procedure.title} />
        <ProcedureDetailContent
          description={detail.intro || procedure.description}
          bullets={detail.bullets || []}
          additionalInfo={detail.additionalInfo}
          contentSections={detail.contentSections || []}
        />
        <RelatedProcedures
          categorySlug={slug}
          currentSlug={procedureSlug}
          siblings={category.procedures}
          crossLinks={getCrossLinks(slug)}
        />
      </main>
    </>
  );
}
