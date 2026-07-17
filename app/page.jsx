import { Hero } from "@/components/sections/hero/Hero";
import { WhyChoose } from "@/components/sections/why-choose/WhyChoose";
import { AboutPreview } from "@/components/sections/about-preview/AboutPreview";
import { Quote } from "@/components/sections/quote/Quote";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyChoose />
      <AboutPreview />
      <Quote />
    </main>
  );
}
