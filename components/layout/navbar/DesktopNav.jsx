"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { navLinks, isLinkActive } from "./nav-config";
import { TreatmentsDropdown } from "./TreatmentsDropdown";

// expo-out: feels premium, decelerates smoothly
const UNDERLINE_EASE = [0.16, 1, 0.3, 1];

function NavLink({ href, label, isActive }) {
  const [hovered, setHovered] = useState(false);
  const show = isActive || hovered;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative pb-1 text-sm uppercase tracking-[0.15em]",
        "transition-colors duration-200 active:scale-95",
        isActive
          ? "font-bold text-gold"
          : "text-text-secondary hover:text-gold"
      )}
    >
      {label}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scaleX: show ? 1 : 0 }}
        transition={{ duration: 0.3, ease: UNDERLINE_EASE }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px origin-center bg-gold"
      />
    </Link>
  );
}

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
      {navLinks.map((link) =>
        link.children ? (
          <TreatmentsDropdown
            key={link.href}
            label={link.label}
            items={link.children}
            isActive={isLinkActive(link.href, pathname)}
          />
        ) : (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            isActive={isLinkActive(link.href, pathname)}
          />
        )
      )}
    </nav>
  );
}
