import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import {
  treatmentsDetail,
  treatmentSlugs,
} from "@/content/treatments-detail";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { TreatmentHero } from "@/components/sections/treatment-detail/TreatmentHero";
import { TreatmentDescription } from "@/components/sections/treatment-detail/TreatmentDescription";
import { ProcedureList } from "@/components/sections/treatment-detail/ProcedureList";
import { FaqAccordion } from "@/components/sections/treatment-detail/FaqAccordion";

/**
 * Pre-render every known treatment category at build time (SSG).
 * Anything not in this list 404s.
 */
export function generateStaticParams() {
  return treatmentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = treatmentsDetail[slug];
  if (!data) return {};
  return buildMetadata({
    title: data.title,
    description: data.intro,
    path: `/treatments/${slug}`,
  });
}

export default async function TreatmentDetailPage({ params }) {
  const { slug } = await params;
  const data = treatmentsDetail[slug];
  if (!data) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Treatments", path: "/treatments" },
          { name: data.title, path: `/treatments/${slug}` },
        ])}
      />
      <JsonLd data={faqSchema(data.faqs)} />
      <main>
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Treatments", href: "/treatments" },
            { label: data.breadcrumbLabel },
          ]}
          title={data.title}
          subtitle={data.intro}
        />
        <TreatmentHero slug={slug} />
        <TreatmentDescription description={data.description} />
        <ProcedureList procedures={data.procedures} />
        <FaqAccordion faqs={data.faqs} />
      </main>
    </>
  );
}
