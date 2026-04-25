"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Menu } from "@base-ui/react/menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const UNDERLINE_EASE = [0.16, 1, 0.3, 1];

const itemBase =
  "block px-5 py-3 text-sm uppercase tracking-[0.15em] " +
  "text-text-secondary hover:bg-section-alt hover:text-gold " +
  "transition-colors";

/**
 * Desktop-only Treatments dropdown.
 * Underline persists while: hovered, popup open, or current path is under /treatments.
 */
export function TreatmentsDropdown({ label, items, isActive }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const show = isActive || hovered || open;

  return (
    <Menu.Root open={open} onOpenChange={setOpen}>
      <Menu.Trigger
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex items-center gap-1 pb-1 text-sm uppercase tracking-[0.15em]",
          "transition-colors duration-200 active:scale-95",
          isActive
            ? "font-bold text-gold"
            : "text-text-secondary hover:text-gold"
        )}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          strokeWidth={2}
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ scaleX: show ? 1 : 0 }}
          transition={{ duration: 0.3, ease: UNDERLINE_EASE }}
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px origin-center bg-gold"
        />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner sideOffset={12} align="center" className="z-50">
          <Menu.Popup
            className={cn(
              "min-w-56 overflow-hidden rounded-sm border border-hairline",
              "bg-background shadow-[0_6px_24px_rgba(0,0,0,0.06)] outline-none"
            )}
          >
            {items.map((item) => (
              <Menu.Item
                key={item.href}
                render={<Link href={item.href} className={itemBase} />}
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
