# NFSC

---

## What's in the box

| Page | Path | Highlights |
|---|---|---|
| Home | `/` | Hero (stagger reveal + animated pills), Why Choose (dark glass cards), About preview, Treatments alternating rows, doctor quote, stats with count-up |
| About | `/about` | Clinic overview, advanced technology grid, doctor profile, philosophy quote, team, core values |
| Treatments index | `/treatments` | Category overview, reuses home alternating rows |
| Treatment detail | `/treatments/[slug]` | Hero photo + intro + procedure list + FAQ accordion (per category) |
| Gallery | `/gallery` | Filterable before/after grid + full-screen interactive lightbox slider |
| Testimonials | `/testimonials` | Featured carousel (auto-rotate), stats strip, filterable review grid, Google reviews CTA |
| Booking CTA | `#contact` (every page) | Validated form → Google Sheet + branded Gmail notification |

Every page renders with a shared **sticky glassmorphism navbar** (active-link underline animation, click-driven Treatments dropdown, mobile drawer) and a **dark navy footer** (logo badge, social icons, link columns, embedded Google Map).

---

## Tech stack (high level)

- **Next.js 16** (App Router + Turbopack) — mostly SSG, one dynamic `/api/contact` route
- **React 19** + **Tailwind CSS v4** + **shadcn foundation** (cn helper, Base UI primitives — Menu, Dialog)
- **Motion (Framer Motion 12)** — stagger reveals, scroll-triggered fades, hover lifts, count-up, accordion height
- **lucide-react** for iconography
- **Google Apps Script + Google Sheet** as the free form backend
- **MailApp / Gmail** sending HTML email notifications

---

## SEO & polish

- Per-page **metadata API** with separate descriptions for search vs. social shares (`og:description`)
- **JSON-LD** rendered server-side: `MedicalClinic` (every page), `Physician` (about), `BreadcrumbList` (every inner page), `FAQPage` (treatment detail pages)
- Auto-generated **`/sitemap.xml`** and **`/robots.txt`**
- **Open Graph** + **Twitter card** metadata for share unfurls
- **Smooth in-page scroll** with hash-cleanup (URL stays clean after `#contact` jumps)
- **Reduced-motion** respected throughout
- **Mobile-first** responsive layouts
- **`next/image`** optimization for all photos

---

## Form → Sheet → Email flow

```
Patient form (with live validation + honeypot)
   │ POST /api/contact (server validation, drops bot submissions)
   │ forwards to:
   ▼
Google Apps Script Web App
   │
   ├─► Append row to "Inquiries" sheet (acts as patient CRM)
   └─► Branded HTML email to clinic with one-tap Call / WhatsApp / Email buttons
```

Setup is detailed in [`apps-script/README.md`](apps-script/README.md). Estimated time: **30 minutes**.

