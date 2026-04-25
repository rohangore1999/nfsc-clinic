/**
 * Single source of truth for navbar links.
 * Used by DesktopNav, TreatmentsDropdown, and MobileNav.
 *
 * `children` triggers a dropdown on desktop and an accordion on mobile.
 * The first entry of a dropdown should be the parent index page.
 */
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Treatments",
    href: "/treatments",
    children: [
      { label: "All Treatments", href: "/treatments" },
      { label: "Facial Surgery", href: "/treatments/facial-surgery" },
      { label: "Hair Treatments", href: "/treatments/hair-treatments" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "#contact" },
];

/**
 * Returns true when the link should appear active for the given pathname.
 * Home matches exact `/`; everything else also matches sub-paths.
 */
export function isLinkActive(href, pathname) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
