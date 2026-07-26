import { Star } from "lucide-react";
import { site } from "@/content/site";
import { BookButton } from "@/components/cta/BookButton";
import { CallButton } from "@/components/cta/CallButton";
import { TreatmentPills } from "./TreatmentPills";
import { TreatmentCardsGrid } from "./TreatmentCardsGrid";
import { TrustIconsRow } from "./TrustIconsRow";
import {
  HeroAnimationWrapper,
  HeroAnimatedItem,
} from "./HeroAnimationWrapper";

/**
 * Hero section — server component.
 *
 * The H1, tagline, and eyebrow text render in the initial HTML (no JS
 * required) so they are instantly visible for LCP. The HeroAnimationWrapper
 * client boundary adds the fade-in entrance animation after hydration, but
 * the content is never hidden — it's in the DOM from the start.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-background px-6 pt-16 pb-20 md:px-8 md:pt-24 md:pb-28"
    >
      <HeroAnimationWrapper className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        {/* 1. Eyebrow / credentials */}
        <HeroAnimatedItem>
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
            {site.doctor.credentials}
            <span className="mx-3 text-gold">•</span>
            {site.doctor.experienceLine}
          </p>
        </HeroAnimatedItem>

        {/* 2. H1 — LCP element, rendered as plain HTML in initial response */}
        <HeroAnimatedItem>
          <h1
            id="hero-heading"
            className="mb-6 max-w-4xl font-serif text-4xl leading-tight text-navy md:text-5xl lg:text-6xl"
          >
            {site.hero.h1}
          </h1>
        </HeroAnimatedItem>

        {/* 3. Tagline */}
        <HeroAnimatedItem>
          <p className="mb-12 max-w-3xl text-xl italic text-text-secondary md:text-2xl">
            {site.hero.subhead}
          </p>
        </HeroAnimatedItem>

        {/* 4. Treatment pills */}
        <HeroAnimatedItem className="mb-16 w-full">
          <TreatmentPills items={site.hero.pills} />
        </HeroAnimatedItem>

        {/* 5. Treatment cards grid */}
        <HeroAnimatedItem className="mb-20 w-full">
          <TreatmentCardsGrid items={site.hero.cards} />
        </HeroAnimatedItem>

        {/* 6. Decorative flourish */}
        <HeroAnimatedItem>
          <div
            aria-hidden="true"
            className="mb-10 text-xl tracking-[0.5em] text-gold/60"
          >
            <span className="italic font-light">———✦———</span>
          </div>
        </HeroAnimatedItem>

        {/* 7. CTAs */}
        <HeroAnimatedItem className="mb-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <BookButton
            variant="solid"
            size="lg"
            label={site.hero.primaryCta}
          />
          <CallButton size="lg" label={site.hero.secondaryCta} />
        </HeroAnimatedItem>

        {/* 8. Social proof */}
        <HeroAnimatedItem>
          <p className="mb-10 flex items-center gap-1.5 text-xs tracking-wide text-text-muted md:text-sm">
            <Star
              className="h-3.5 w-3.5 fill-gold text-gold"
              strokeWidth={0}
              aria-hidden="true"
            />
            {site.hero.socialProof}
          </p>
        </HeroAnimatedItem>

        {/* 9. Trust icons */}
        <HeroAnimatedItem className="w-full max-w-4xl">
          <TrustIconsRow />
        </HeroAnimatedItem>
      </HeroAnimationWrapper>
    </section>
  );
}
