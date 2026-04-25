import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, physicianSchema } from "@/lib/schema";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { ClinicOverview } from "@/components/sections/clinic-overview/ClinicOverview";
import { Equipment } from "@/components/sections/equipment/Equipment";
import { Values } from "@/components/sections/values/Values";
import { DoctorProfile } from "@/components/sections/doctor-profile/DoctorProfile";
import { AboutQuote } from "@/components/sections/about-quote/AboutQuote";
import { Team } from "@/components/sections/team/Team";

export const metadata = buildMetadata({
  title: "About",
  description: `Meet ${site.doctor.name} and learn about NFSC — a premium facial surgery and aesthetic clinic in ${site.city}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <JsonLd data={physicianSchema()} />
      <main>
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About Us" },
          ]}
          title="About NFSC"
        />
        <ClinicOverview />
        <Equipment />
        <DoctorProfile />
        <AboutQuote />
        <Team />
        <Values />
      </main>
    </>
  );
}
