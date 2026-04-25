import {
  ShieldCheck,
  BriefcaseMedical,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

// Material Symbols (used in Stitch design) → lucide equivalents.
const ICON_MAP = {
  verified_user: ShieldCheck,
  medical_services: BriefcaseMedical,
  volunteer_activism: HeartHandshake,
  precision_manufacturing: Sparkles,
};

/**
 * 4 trust icons with uppercase labels.
 * Reused on /about, /contact, and inside the Hero.
 */
export function TrustIconsRow({ className }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-y-8 gap-x-12 md:grid-cols-4 md:gap-x-16",
        className
      )}
    >
      {site.trustIcons.map(({ icon, label }) => {
        const Icon = ICON_MAP[icon];
        return (
          <li
            key={label}
            className="flex flex-col items-center gap-2 text-center"
          >
            {Icon ? (
              <Icon
                className="h-6 w-6 text-gold/70"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            ) : null}
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted md:text-xs">
              {label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
