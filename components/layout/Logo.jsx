import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Brand mark: medical icon + stacked NFSC / full name.
 * Reused in Navbar (default) and Footer (variant="footer").
 */
export function Logo({ variant = "default", className }) {
  const isFooter = variant === "footer";
  return (
    <Link
      href="/"
      aria-label={site.fullName}
      className={cn("flex items-center gap-2", className)}
    >
      <Stethoscope
        aria-hidden="true"
        className={cn("h-5 w-5", "text-gold")}
        strokeWidth={1.5}
      />
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "text-xl font-bold uppercase tracking-[0.18em] text-gold"
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            "text-[0.6rem] uppercase tracking-[0.12em]",
            isFooter ? "text-white/60" : "text-text-muted"
          )}
        >
          {site.fullName}
        </span>
      </span>
    </Link>
  );
}
