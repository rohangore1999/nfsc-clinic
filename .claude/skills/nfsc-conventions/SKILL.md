---
name: nfsc-conventions
description: Conventions, tech stack, brand tokens, and shared libraries for the NFSC (Dr. Nikhil Face Surgical & Aesthetic Centre) marketing site. Invoke this skill before adding/editing UI sections, motion, forms, validation, SEO metadata, or content on this codebase. Covers Next.js 16 + Tailwind v4 + Motion + Base UI + shadcn-foundation patterns specific to this project.
---

# NFSC Project Conventions

Marketing website for a luxury aesthetic clinic in Mumbai. This skill captures the non-obvious decisions other agents need to honor — pulling them from the code is possible but slow and easy to get wrong.

## Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js **16.2.4** App Router (Turbopack) | **Breaking from Next 15.** Read `node_modules/next/dist/docs/` before touching APIs you remember from training data. |
| React | 19.2.4 | |
| CSS | Tailwind **v4** + `@tailwindcss/postcss` | No `tailwind.config.js` — tokens live in `app/globals.css` `@theme inline` block. |
| Animation | `motion` v12 (the new Framer Motion package) | Import path is `motion/react`, not `framer-motion`. |
| UI primitives | `@base-ui/react` (Menu, Dialog) | This is the primary primitive lib. NOT Radix. |
| Foundation | `shadcn` package + `cn` helper from `@/lib/utils` | **No shadcn components are actually shipped/used.** Only the `cn` helper + CSS variable conventions. Don't `npx shadcn add` anything — build sections from primitives + Tailwind. |
| Icons | `lucide-react` | One source of truth — don't introduce other icon libs. |
| Language | **JavaScript (.jsx/.js)**, not TypeScript | Project was converted from TS to JS. JSDoc comments are used where types help. |

## Brand tokens (memorize these)

Defined in `app/globals.css`. Always reference via Tailwind classes (e.g. `bg-gold`, `text-navy`) — never hardcode hex.

- `--gold: #C9A04F` → `bg-gold` / `text-gold` / `border-gold`
- `--gold-dark: #B08B43` → `hover:text-gold-dark`
- `--navy: #1A1A2E` → primary headings + dark sections
- `--section-alt: #F9F9F9` → off-white for alternating section rows
- `--text-primary: #333333`, `--text-secondary: #666666`, `--text-muted: #999999`
- `--hairline: #F0F0F0` → 1px dividers and subtle borders

**Fonts:**
- **Playfair Display** (`font-serif`) — headings only (h1–h3 hero/section titles)
- **Inter** (default) — body, italic subtitles/quotes, UI. Italic blocks use plain Inter, NOT `font-serif italic`.

## Shared libraries — import these, don't reinvent

### `@/lib/motion`

Single source of truth for animation. **Never declare `const EASE = [0.16, 1, 0.3, 1]` locally** — import it.

```js
import {
  EASE,                    // cubic-bezier expo-out
  SCROLL_VIEWPORT,         // { once: true, amount: 0.2 }
  itemVariant,             // fade + 16px y entrance, 0.6s
  imageVariant,            // scale 1.03→1, 0.9s
  containerVariant,        // stagger 0.08, delay 0.1
  makeContainerVariant,    // ({ stagger, delay }) for custom timing
} from "@/lib/motion";
```

Use `makeContainerVariant({ stagger: 0.05, delay: 0.05 })` when defaults don't fit (Hero, TreatmentPills, grids).

Keep a local `cardVariant` only when y/duration genuinely differ from the shared `itemVariant` (e.g., card components use `y: 24` instead of `y: 16`).

### `@/lib/validation`

Single source for booking-form validation — used by both client (`InlineBookingForm`) and server (`/api/contact`). Don't duplicate regex.

```js
import {
  validateContactForm,     // returns { name?, phone?, email?, treatment?, message? }
  PHONE_RE, EMAIL_RE,
  ALLOWED_TREATMENTS,      // Set: "Facial Surgery" | "Hair Treatment" | "Other"
  FIELD_LIMITS,            // { name: 100, phone: 20, email: 120, message: 1000 }
} from "@/lib/validation";
```

Form `maxLength` props must use `FIELD_LIMITS.*`, not magic numbers.

### `@/lib/strings`

```js
import {
  parseStat,    // "10+" → { value: 10, suffix: "+" }
  toSlug,       // "Hair Transplant" → "hair-transplant"
  cleanPhone,   // "+91 9876543210" → "+919876543210" (for tel:)
  digitsOnly,   // "+91 9876543210" → "919876543210" (for wa.me)
} from "@/lib/strings";
```

### `@/lib/seo`, `@/lib/schema`, `@/lib/utils`
- `seo.js` — metadata helpers
- `schema.js` — JSON-LD generators (MedicalClinic, Physician, BreadcrumbList, FAQPage)
- `utils.js` — only `cn` (clsx + tailwind-merge)

## File organization

```
app/
  layout.jsx              # Site-wide CtaBanner is HERE (so #contact works on every page)
  page.jsx                # Home
  about/, gallery/, testimonials/
  treatments/page.jsx + [slug]/page.jsx
  api/contact/route.js
  opengraph-image.jpg     # Auto-generates og:image meta
  twitter-image.jpg       # Auto-generates twitter:image meta
  icon.jpg, apple-icon.jpg, robots.js, sitemap.js
components/
  cta/                    # BookButton, CallButton — reused across sections
  sections/<section>/     # One folder per section, one component per concern
  ui/                     # StarRow and other primitives
content/site.js           # All copy lives here — don't hardcode strings in JSX
```

Each section folder typically has a top-level orchestrator (e.g. `Team.jsx`) plus card sub-components (e.g. `TeamMemberCard.jsx`). New sections follow the same pattern.

## Section patterns

**Scroll reveal:**
```jsx
<motion.div
  initial="hidden"
  whileInView="show"
  viewport={SCROLL_VIEWPORT}
  variants={containerVariant}
>
  <motion.h2 variants={itemVariant}>...</motion.h2>
</motion.div>
```

**Reduced motion:** Always honor it. Pattern:
```jsx
const reduceMotion = useReducedMotion();
const animateProps = reduceMotion ? {} : { initial: "hidden", animate: "show", variants: ... };
```

**Alternating row backgrounds:** `bg-background` and `bg-section-alt` alternate down the page. Treatment rows additionally swap `flex-row` / `flex-row-reverse` on a `reverse` prop.

**Glassmorphism cards** (Why Choose section): `bg-white/10` + `backdrop-blur-[20px]` + `border-white/20` + `border-t-[3px] border-t-gold` on a dark gradient parent.

## Form backend

Contact form posts to `/api/contact` (Next route handler), which forwards to a **Google Apps Script Web App** that writes to a Google Sheet and sends an HTML email via Gmail. There is no Telegram, no DB, no third-party service.

- Env var: `APPS_SCRIPT_URL` (server-only, set in `.env.local` and Vercel)
- Honeypot field in form, server validates with `validateContactForm`
- Apps Script manifest uses explicit `oauthScopes` including `drive.readonly` for the email logo

## Common pitfalls (we've hit these)

1. **Empty-string env vars + `??` nullish coalescing** crash `new URL("")`. Use `||`:
   ```js
   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
   ```

2. **`font-serif italic` for subtitles/quotes is wrong here.** User explicitly wants Inter italic, not Playfair italic. Use plain `italic` (no `font-serif`).

3. **Tailwind canonical class for negative arbitrary values** is `left-[-9999px]` (not `-left-[9999px]`).

4. **Don't `npx shadcn add ...`.** The project uses shadcn's CSS variable scaffolding only — actual UI is hand-built on Base UI + Tailwind.

5. **Hash links + scroll:** `#contact` smooth-scroll is paired with a `HashCleanup` component that strips the hash from the URL after scroll lands, so reload doesn't restore `/page#contact`.

6. **OG/social previews require `app/opengraph-image.jpg` + `app/twitter-image.jpg`** at the right path — Next 16 auto-generates the meta tags. Don't hand-write `<meta property="og:image">`.

7. **Motion package import:** `from "motion/react"`, not `"framer-motion"`. The package is `motion`.

8. **Dev server WebSocket on Turbopack** can be flaky over LAN/IP for cross-device testing. For mobile testing, use `npm run build && npm start` instead of `npm run dev`.

## When refactoring/cleanup

- Search for duplication across files before extracting: `grep -rn "const EASE" --include="*.jsx"`.
- New shared utilities go in `lib/` with a single named export per concept.
- Update **all** call sites in one pass — don't leave half-migrated code.
- Always run `npm run build` after a sweep — Turbopack catches import errors that dev mode tolerates.

## Content source of truth

`content/site.js` exports the `site` object. All copy (hero h1, CTA labels, doctor credentials, treatment lists, FAQs, testimonials, contact phone/email) lives there. Never hardcode strings in JSX — import from `site` instead. This makes copy edits a single-file change.
