import { Fragment } from "react";
import { Star, Heart, BadgeCheck } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  star: Star,
  heart: Heart,
  verified: BadgeCheck,
};

/**
 * Compact off-white stats band — 3 trust signals divided by gold hairlines.
 * On mobile: stacks; on md+: single row with vertical dividers.
 */
export function TestimonialStatsStrip() {
  const items = site.testimonials.statsStrip;

  return (
    <section
      aria-label="Patient review stats"
      className="border-y border-hairline bg-section-alt px-6 py-8 md:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 md:flex-row md:gap-0">
        {items.map((item, i) => {
          const Icon = ICON_MAP[item.icon];
          return (
            <Fragment key={item.label}>
              {i > 0 ? (
                <div
                  aria-hidden="true"
                  className="hidden h-8 w-px bg-gold/30 md:block"
                />
              ) : null}
              <div
                className={cn(
                  "flex items-center gap-3 px-8 text-base font-medium text-text-primary"
                )}
              >
                {Icon ? (
                  <Icon
                    className="h-5 w-5 fill-gold text-gold"
                    strokeWidth={item.icon === "verified" ? 1.5 : 0}
                    aria-hidden="true"
                  />
                ) : null}
                <span>{item.label}</span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
