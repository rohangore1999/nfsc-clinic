import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { treatmentsDetail, treatmentSlugs } from "@/content/treatments-detail";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { TreatmentHero } from "@/components/sections/treatment-detail/TreatmentHero";
import { ProcedureDetailContent } from "@/components/sections/treatment-detail/ProcedureDetailContent";
import { toSlug } from "@/lib/strings";

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
    title: match.procedure.title,
    description: match.procedure.description,
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
      <main>
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
        <TreatmentHero slug={procedureSlug} />
        <ProcedureDetailContent
          description={detail.intro || procedure.description}
          bullets={detail.bullets || []}
          additionalInfo={detail.additionalInfo}
          contentSections={detail.contentSections || []}
        />
      </main>
    </>
  );
}
