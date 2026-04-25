import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { Treatments } from "@/components/sections/treatments/Treatments";

export const metadata = buildMetadata({
  title: "Treatments",
  description: `Explore the full range of facial surgery and hair restoration procedures offered by ${site.doctor.name} at NFSC, ${site.city}.`,
  path: "/treatments",
});

export default function TreatmentsIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Treatments", path: "/treatments" },
        ])}
      />
      <main>
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Treatments" },
          ]}
          title={site.treatments.title}
          subtitle={site.treatments.subtitle}
        />
        {/* Reuse home rows; suppress its inner header (PageHero already shows the title) */}
        <Treatments showHeader={false} />
      </main>
    </>
  );
}
