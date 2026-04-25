"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { Menu as MenuIcon, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, isLinkActive } from "./nav-config";
import { Logo } from "@/components/layout/Logo";
import { BookButton } from "@/components/cta/BookButton";

/**
 * Mobile-only hamburger + right-side drawer (Base UI Dialog).
 * Hidden at md+ where DesktopNav takes over.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change.
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center text-foreground md:hidden",
          "transition-colors hover:text-gold"
        )}
      >
        <MenuIcon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
            "transition-opacity duration-300"
          )}
        />
        <Dialog.Popup
          className={cn(
            "fixed right-0 top-0 z-50 flex h-full w-[85vw] max-w-sm flex-col",
            "bg-background shadow-[-12px_0_32px_rgba(0,0,0,0.06)] outline-none",
            "data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
            "transition-transform duration-300 ease-out"
          )}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
            <Logo />
            <Dialog.Close
              aria-label="Close menu"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-sm text-foreground",
                "transition-colors hover:bg-section-alt hover:text-gold"
              )}
            >
              <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </Dialog.Close>
          </div>

          {/* Nav links */}
          <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-6">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href, pathname);
              if (link.children) {
                return (
                  <li key={link.href}>
                    <button
                      type="button"
                      aria-expanded={treatmentsOpen}
                      onClick={() => setTreatmentsOpen((v) => !v)}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3 text-sm uppercase tracking-[0.15em]",
                        active
                          ? "font-bold text-gold"
                          : "text-text-secondary hover:text-gold"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        aria-hidden="true"
                        strokeWidth={2}
                        className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          treatmentsOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {treatmentsOpen && (
                      <ul className="mb-2 ml-4 flex flex-col gap-1 border-l border-hairline pl-3">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={close}
                              aria-current={
                                isLinkActive(child.href, pathname)
                                  ? "page"
                                  : undefined
                              }
                              className={cn(
                                "block px-4 py-2 text-sm",
                                isLinkActive(child.href, pathname)
                                  ? "font-semibold text-gold"
                                  : "text-text-secondary hover:text-gold"
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block px-4 py-3 text-sm uppercase tracking-[0.15em] transition-colors",
                      active
                        ? "font-bold text-gold"
                        : "text-text-secondary hover:text-gold"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Footer CTA */}
          <div className="border-t border-hairline p-6">
            <BookButton
              variant="solid"
              size="sm"
              className="w-full"
              label="Book Appointment"
            />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
