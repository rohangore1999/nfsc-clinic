import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero/Hero";

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
