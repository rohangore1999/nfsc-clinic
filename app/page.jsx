import dynamic from "next/dynamic";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { Hero } from "@/components/sections/hero/Hero";

export const metadata = buildMetadata({
  title: `${site.fullName} — Facial Surgery & Aesthetic Treatments in Mumbai`,
  description: `Expert facial surgery, hair transplant & aesthetic treatments by ${site.doctor.name} in Kandivali West, Mumbai. Rhinoplasty, facelift, Botox, PRP therapy. Book a free consultation.`,
  path: "/",
});

const WhyChoose = dynamic(() =>
  import("@/components/sections/why-choose/WhyChoose").then(
    (mod) => mod.WhyChoose
  )
);

const AboutPreview = dynamic(() =>
  import("@/components/sections/about-preview/AboutPreview").then(
    (mod) => mod.AboutPreview
  )
);

const Quote = dynamic(() =>
  import("@/components/sections/quote/Quote").then((mod) => mod.Quote)
);

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <WhyChoose />
      <AboutPreview />
      <Quote />
    </main>
  );
}
