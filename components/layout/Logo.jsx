import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Brand mark: medallion logo + stacked NFSC / full name.
 * Reused in Navbar (default) and the mobile drawer header.
 *
 * Logo image is served from /public/images/nfsc-logo.jpg. The image has a
 * white background — works on white surfaces (navbar, drawer) but would show
 * a white box on dark backgrounds (footer/CTA). Swap to a transparent PNG or
 * SVG before using on dark surfaces.
 */
export function Logo({ variant = "default", className }) {
  const isFooter = variant === "footer";
  return (
    <Link
      href="/"
      aria-label={site.fullName}
      className={cn("flex items-center gap-3", className)}
    >
      <Image
        src="/images/nfsc-logo.jpg"
        // Empty alt — decorative within the link; aria-label on <Link> already
        // names the destination for screen readers.
        alt=""
        width={96}
        height={96}
        priority
        className={cn(
          "h-12 w-12 shrink-0 object-contain",
          // On dark surfaces the JPG's white background would look like a
          // box. Wrap it in a circular white badge so it reads as intentional.
          isFooter && "rounded-full bg-white object-cover"
        )}
      />
      <span className="flex flex-col leading-tight">
        <span className="text-xl font-bold uppercase tracking-[0.18em] text-gold">
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
