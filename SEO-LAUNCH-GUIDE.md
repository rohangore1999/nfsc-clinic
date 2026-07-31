# NFSC — SEO Launch & Domain Setup Guide

> Actionable checklist for Dr. Nikhil Face Surgical & Aesthetic Centre to
> maximize organic search rankings after acquiring a custom domain.

---

## Changelog

### July 31, 2026

- **Accurate `MedicalProcedure` structured data** — `procedureSchema` in `lib/schema.js` now maps a `kind` to the correct schema.org shape instead of hardcoding the invalid `procedureType: "SurgicalProcedure"`. Non-surgical treatments (Botox, fillers, facials, peels, dermatology, PRP, etc.) are no longer mislabeled as surgery. Per-procedure overrides (`procedureKind`) added for MNRF, Glutathione, Dental Implants, Wisdom Tooth Removal, Vitiligo Surgery, Mole & Wart Removal, PRP/GFC/QR678, and Dandruff & Scalp.
- **Opening hours corrected & aligned** — footer in `content/site.js` fixed from `11AM` to `10AM` so it matches the JSON-LD (`10:00–20:00`) and Google Business Profile (Mon–Sun 10 AM–8 PM). NAP + hours now consistent across site, schema, and GBP.
- **Removed stray `/test` page** — deleted `app/test/page.jsx` (`<div>Test</div>`), which was publicly crawlable/indexable.
- **Social `sameAs` links** confirmed live (Instagram, LinkedIn, YouTube).

- **Consolidated business entity + compliant reviews** — removed the redundant `LocalBusiness` node (`MedicalClinic` is already a `LocalBusiness` subtype). The global `MedicalClinic` (`#clinic`) no longer carries a self-serving `aggregateRating`. Instead, a new `clinicReviewsSchema()` attaches `aggregateRating` + individual `Review` items (built from the real reviews in `content/site.js`) to `#clinic` **only on `/testimonials`**, where those reviews are visibly on the page. This mirrors markup to on-page content and avoids self-serving-review warnings. (Stars in search/Maps still come from Google Business Profile.)

---

## Current SEO Status (as of July 2026)

### Already Implemented

- [x] **Dynamic sitemap** — all 67 URLs (5 static + 7 categories + 55 procedures) auto-generated from `treatments-detail.js`
- [x] **Security headers** — `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` in `next.config.mjs`
- [x] **JSON-LD schema**: `MedicalClinic` (single business entity on every page), `Physician`, `MedicalProcedure`/`SurgicalProcedure`, `BreadcrumbList`, `FAQPage`; `AggregateRating` + `Review` scoped to `/testimonials`
- [x] **Accurate procedure-type schema** — each procedure emits the correct schema.org shape via a `kind` (`surgical` → `@type: SurgicalProcedure`; `noninvasive`/`percutaneous` → `@type: MedicalProcedure` + valid `procedureType`). Category defaults live in `app/treatments/[slug]/[procedureSlug]/page.jsx` (`CATEGORY_PROCEDURE_KIND`), overridable per procedure via a `procedureKind` field in `treatments-detail.js`. Fixes the earlier bug where all 55 procedures were hardcoded as `procedureType: "SurgicalProcedure"` (an invalid `MedicalProcedureType` value)
- [x] **AggregateRating + Review schema** — 5.0★ rating with individual patient `Review` items, attached to the clinic entity and rendered only on `/testimonials` (where reviews are visible on the page), for policy-compliant markup
- [x] **Local SEO schema** — `GeoCoordinates` (lat/lng), `areaServed` (Kandivali, Borivali, Malad, Goregaon, Andheri, Dahisar), `hasMap`
- [x] **Meta descriptions** — unique per page, auto-truncated to ≤155 chars on procedure pages
- [x] **Page titles** — unique per page, ≤60 chars with `| NFSC` suffix, include "Mumbai" location keyword
- [x] **Home page metadata** — explicit `metadata` export with targeted title/description in `app/page.jsx`
- [x] **Canonical URLs** — set on every page via `buildMetadata()` in `lib/seo.js`
- [x] **OG + Twitter tags** — present on every page with `summary_large_image` card type
- [x] **Generated OG image** — `app/opengraph-image.jsx` and `app/twitter-image.jsx` (code-generated at build time with brand colors)
- [x] **Favicon + Apple icon** — `app/icon.png` (32x32) and `app/apple-icon.png` (180x180) using real NFSC logo (`public/images/nfsc-logo.jpg`)
- [x] **Heading hierarchy** — single H1 per page, proper H1→H2→H3 flow (no level skipping)
- [x] **Skip-to-content link** — accessibility landmark in root layout
- [x] **Semantic HTML** — `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>` used throughout
- [x] **`id="main-content"`** on every page's `<main>` element
- [x] **ARIA attributes** — menu buttons, carousel controls, FAQ accordion, gallery lightbox
- [x] **Font optimization** — `next/font/google` with `display: swap`, limited to used weights only
- [x] **Image optimization** — all images use `next/image` with `fill` + `sizes` prop; AVIF + WebP format negotiation enabled in `next.config.mjs`
- [x] **Image compression** — batch-compressed from 236 MB → 141 MB via Sharp CLI (max 1200px, quality 80)
- [x] **Code splitting** — `CtaBanner`, `WhyChoose`, `AboutPreview`, `Quote`, `GalleryLightbox` loaded via `next/dynamic`
- [x] **Hero server component** — H1/tagline render in initial HTML (no JS required for LCP); animation wrapper is a thin client boundary
- [x] **Keywords** — location-specific keywords ("rhinoplasty Mumbai", "hair transplant Kandivali", "facial surgeon near me")
- [x] **robots.txt** — allows all public pages, disallows `/api/`
- [x] **Color contrast** — `text-muted` meets WCAG AA 4.5:1 ratio
- [x] **No keyword stuffing** — all "SEO Keywords" visible sections removed from procedure pages
- [x] **SSG** — 80 pages pre-rendered at build time via `generateStaticParams()`
- [x] **Internal cross-linking** — "Related Procedures" section on every procedure detail page (same-category siblings + cross-category links)
- [x] **`lang="en-IN"`** on `<html>` element, consistent with `locale: "en_IN"` in OpenGraph
- [x] **Bundle analyzer** — `@next/bundle-analyzer` installed, run with `ANALYZE=true npm run build`
- [x] **Package optimization** — `experimental.optimizePackageImports` for `motion` in `next.config.mjs`
- [x] **CSS-based hover effects** — card hover animations use CSS `transition-transform` instead of JS-driven Motion `whileHover`, reducing main-thread work
- [x] **GPU-friendly animations** — WhyChoose blur orb replaced with static CSS `radial-gradient`; TreatmentPills glow uses CSS `@keyframes` instead of Motion `boxShadow`

### Still Needs Action

- [x] **Domain live** — `https://www.drnikhilangre.com` on Vercel
- [x] **`NEXT_PUBLIC_SITE_URL`** set to `https://www.drnikhilangre.com` in Vercel env vars + `.env.local`
- [x] **Google Search Console** — verified (DNS), sitemap submitted, homepage indexing requested
- [x] **Google Business Profile** — created, primary category "Plastic surgeon", website + address + phone + hours set
- [x] **Google Analytics 4** — `G-Y2FN7G27SJ` wired into `app/layout.jsx` via `next/script`
- [x] **Microsoft Clarity** — `xsfpfqo8kr` wired into `app/layout.jsx` for heatmaps & session recordings
- [x] **Bing Webmaster Tools** — verified (meta tag `E223DFA6D62C21A505C85FB233F46890`), sitemap submitted, URL inspection done
- [x] **Real social links live** — `content/site.js` `footer.socials` now has real Instagram, LinkedIn & YouTube URLs; `sameAs` in schema auto-populates from these
- [ ] **Add missing treatment hero images** for ~10 procedure slugs (currently shows icon placeholder)
- [x] **Update `AggregateRating`** in `lib/schema.js` — now reflects real data: 5.0★, 12 reviews (Google Business Profile, July 2026)
- [x] **Real testimonials live** — 10 verified Google reviews in `content/site.js` (featured: 3, grid: 7)
- [x] **Clinic photos added to Google Business Profile** — reception, surgery room, doctor portrait, equipment
- [x] **Google Business Profile verified** — 366 customer interactions, blue checkmark confirmed (July 2026)
- [ ] **Delete unused `public/images/nikhil/about-nikhil3.jpg`** (2.9 MB, not referenced anywhere)

---

## Phase 1: Domain & DNS Setup ✅ COMPLETE

- **Domain:** `https://www.drnikhilangre.com` — live on Vercel
- **SSL:** Auto-provisioned by Vercel (HTTPS enforced)
- **`NEXT_PUBLIC_SITE_URL`:** Set in Vercel env vars → sitemap, canonicals, JSON-LD all use production URL
- **Old Vercel URL:** `nfsc-clinic.vercel.app` auto-redirects to the custom domain via Vercel dashboard

---

## Phase 2: Google & Bing Setup ✅ COMPLETE

### 2.1 Google Search Console ✅

- **Verified:** DNS TXT record method
- **Sitemap submitted:** `https://www.drnikhilangre.com/sitemap.xml`
- **URL Inspection:** Homepage indexing requested
- **Monitor:** [search.google.com/search-console](https://search.google.com/search-console) → Coverage report for crawl errors

### 2.2 Google Business Profile ✅

- **Name:** Dr. Nikhil Face Surgical & Aesthetic Centre
- **Primary Category:** Plastic surgeon (closest available — "Facial plastic surgeon" not a Google category)
- **Address:** 1st floor, Avenue Building, Hemukalani Cross Rd 4, Kandivali West, Mumbai 400067
- **Phone:** +91 9372933315
- **Website:** `https://www.drnikhilangre.com`
- **Hours:** Mon–Sun 10AM–8PM

> ⚠️ **Still pending:** Add photos (clinic reception, surgery room, doctor portrait, equipment) + complete address verification (postcard/call from Google).

**Suggested business description (750 chars):**
> "Dr. Nikhil Face Surgical & Aesthetic Centre (NFSC) in Kandivali West, Mumbai, offers expert facial surgery, hair transplant, aesthetic dentistry, and dermatology. Led by Dr. Nikhil Angre, MDS, a fellowship-trained maxillofacial and facial plastic surgeon with 5+ years of experience. Services include rhinoplasty, facelift, blepharoplasty, jaw contouring, hair transplant (FUE/FUT), PRP therapy, Botox, dermal fillers, smile designing, dental implants, and advanced skin treatments. State-of-the-art facility with digital microscope, advanced laser, and high-speed PRP centrifuge. Book a free consultation today."

**Ongoing actions (weekly):**
- Post Google Posts — treatment tips, before/after results
- Reply to every Google review (positive and negative)
- Ask patients to leave reviews after treatment (direct link: `https://g.page/r/YOURID/review`)

### 2.3 Bing Webmaster Tools ✅

- **Verified:** HTML meta tag (`msvalidate.01: E223DFA6D62C21A505C85FB233F46890`) — already live in `lib/seo.js`
- **Imported:** From Google Search Console
- **Sitemap submitted:** `https://www.drnikhilangre.com/sitemap.xml`
- **URL Inspection:** Done

### 2.4 Google Analytics 4 ✅

- **Measurement ID:** `G-Y2FN7G27SJ`
- **Implementation:** `app/layout.jsx` via `next/script` with `afterInteractive` strategy
- **Dashboard:** [analytics.google.com](https://analytics.google.com)

### 2.5 Microsoft Clarity ✅

- **Project ID:** `xsfpfqo8kr`
- **Implementation:** `app/layout.jsx` via `next/script` with `afterInteractive` strategy
- **Dashboard:** [clarity.microsoft.com](https://clarity.microsoft.com) — heatmaps + session recordings available after ~24hrs of traffic

---

## Phase 3: Directory & Citation Submissions (Week 1–2)

**NAP Consistency** (Name, Address, Phone) must be IDENTICAL everywhere.
Use exactly: **Dr. Nikhil Face Surgical & Aesthetic Centre**

### 3.1 Medical & Healthcare Directories (HIGH priority)

| Platform                 | URL                   | Why it matters                        |
| ------------------------ | --------------------- | ------------------------------------- |
| **Practo**               | practo.com            | #1 healthcare platform in India       |
| **Lybrate**              | lybrate.com           | Doctor discovery, patient reviews     |
| **Bajaj Finserv Health** | bajajfinservhealth.in | Growing healthcare platform           |
| **Clinicspot**           | clinicspot.com        | Clinic discovery                      |
| **Curofy**               | curofy.com            | Doctor networking + patient referrals |
| **Docplexus**            | docplexus.in          | Medical professional network          |
| **Apollo 24/7**          | apollo247.com         | List your practice                    |
| **1mg**                  | 1mg.com               | Doctor listing                        |

### 3.2 General Business Directories

| Platform               | URL               | Why it matters                    |
| ---------------------- | ----------------- | --------------------------------- |
| **Justdial**           | justdial.com      | Massive local search in India     |
| **Sulekha**            | sulekha.com       | Local services directory          |
| **IndiaMART**          | indiamart.com     | Business directory with backlinks |
| **Yellow Pages India** | yellowpages.co.in | Traditional directory, strong DA  |
| **Hotfrog India**      | hotfrog.in        | Free business listing             |

### 3.3 Maps & Location

| Platform        | URL                                        |
| --------------- | ------------------------------------------ |
| **Google Maps** | Already listed via Google Business Profile |
| **Apple Maps**  | mapsconnect.apple.com                      |
| **Bing Places** | bingplaces.com                             |
| **MapQuest**    | mapquest.com (add listing)                 |

### 3.4 Social Media Profiles (create if not existing)

| Platform          | What to do                                                                         |
| ----------------- | ---------------------------------------------------------------------------------- |
| **Instagram**     | Post before/after reels, procedure walkthroughs. Link in bio → website             |
| **Facebook Page** | Create a business page. Add address, hours, phone. Post regularly                  |
| **YouTube**       | Upload procedure explainer videos. Each video description → link to treatment page |
| **LinkedIn**      | Create a company page + doctor's personal profile                                  |
| **Twitter/X**     | Share health tips, link to blog posts                                              |

> **After creating profiles:** Update `content/site.js` lines 599–601 with real social URLs.
> The `sameAs` array in `lib/schema.js` auto-populates from `site.footer.socials` — no separate update needed.

### 3.5 Review Platforms

| Platform             | Why it matters                      |
| -------------------- | ----------------------------------- |
| **Google Reviews**   | Directly impacts local pack ranking |
| **Practo Reviews**   | Patients search here before booking |
| **Facebook Reviews** | Social proof + engagement signals   |
| **Justdial Reviews** | Local authority signal              |

**Strategy:** After every successful treatment, send a WhatsApp message with a direct Google review link. Aim for 50+ genuine reviews in the first 3 months.

---

## Phase 4: Content & Blog Strategy (Ongoing)

### 4.1 Add a Blog

Create `/app/blog/` with MDX or CMS-backed content. Blog posts are the #1 way to rank for long-tail keywords.

**High-priority blog topics** (based on search volume for Mumbai):

| Topic                                         | Target keyword                 |
| --------------------------------------------- | ------------------------------ |
| "Rhinoplasty Cost in Mumbai 2026"             | rhinoplasty cost mumbai        |
| "Best Hair Transplant Surgeon in Kandivali"   | hair transplant kandivali west |
| "Facelift vs Thread Lift — Which Is Right?"   | facelift vs thread lift        |
| "PRP Hair Treatment: What to Expect"          | prp hair treatment mumbai      |
| "Botox for Jawline Slimming — Complete Guide" | botox jawline mumbai           |
| "How to Choose a Maxillofacial Surgeon"       | maxillofacial surgeon mumbai   |
| "Dental Implants vs Bridges — Pros & Cons"    | dental implants mumbai         |
| "Acne Scar Treatment Options in Mumbai"       | acne scar treatment mumbai     |
| "Hair Transplant Recovery Timeline"           | hair transplant recovery india |
| "Chemical Peel vs Laser — Which Is Better?"   | chemical peel vs laser mumbai  |

Each blog post should:

- Be 1500–2500 words
- Include the target keyword in the title, H1, first paragraph, and 2–3 H2s
- Link to the relevant treatment page (e.g., rhinoplasty blog → `/treatments/facial-plastic-surgery/rhinoplasty-nose-surgery`)
- Include a CTA to book a consultation
- Have a unique meta description under 155 characters
- Include schema markup (Article schema)

### 4.2 FAQ Expansion

The treatment category pages already have FAQs with FAQPage schema. To improve:

- Add 8–12 FAQs per category (currently 5–6)
- Add procedure-specific FAQs on individual procedure pages
- Target "People Also Ask" questions from Google
- Each answer should be 2–4 sentences (optimal for featured snippets)

### 4.3 Location Pages (if expanding)

If the clinic opens multiple locations, create pages like:

- `/locations/kandivali-west`
- `/locations/andheri`

Each with unique content, embedded map, and LocalBusiness schema.

---

## Phase 5: Backlink Building (Month 1–6)

### 5.1 High-Quality Backlinks

| Strategy                             | How                                                            |
| ------------------------------------ | -------------------------------------------------------------- |
| **Guest posts on health blogs**      | Write for platforms like HealthKart, PharmEasy blog, 1mg blog  |
| **Doctor interviews / features**     | Reach out to Mumbai Mirror, Mid-Day for health features        |
| **Case studies on medical forums**   | Publish cases on ResearchGate, PubMed (if applicable)          |
| **Local news**                       | Sponsor or participate in community health events              |
| **University/hospital affiliations** | Get listed on alumni or hospital partner pages                 |
| **Supplier/partner pages**           | Equipment manufacturers often link to clinics using their tech |

### 5.2 Backlinks to Avoid

- Paid link farms
- Low-quality directory spam
- Comment spam on blogs
- PBN (Private Blog Network) links

---

## Phase 6: Technical SEO & Performance Checklist (Pre-Launch)

### 6.1 Image Compression (DONE — 236 MB → 141 MB)

All images were batch-compressed with Sharp CLI (max 1200px, quality 80). Additionally, `next.config.mjs` now serves AVIF and WebP via `images.formats: ['image/avif', 'image/webp']`, so browsers get optimally compressed images at runtime.

If new images are added later, compress them first:

```bash
npx sharp-cli -i path/to/image.jpg -o path/to/image.jpg resize 1200 --withoutEnlargement --fit inside -- --quality 80
```

### 6.2 Performance Optimizations (DONE)

| Optimization | Impact | Status |
|-------------|--------|--------|
| Hero H1 server-rendered (no JS needed for LCP) | LCP | Done |
| AVIF/WebP image format negotiation | LCP, bandwidth | Done |
| Image batch compression (236 MB → 141 MB) | LCP, deploy size | Done |
| WhyChoose blur orb → CSS radial-gradient | INP, GPU | Done |
| TreatmentPills boxShadow → CSS @keyframes | INP, GPU | Done |
| Card hover effects → CSS transitions | INP | Done |
| `optimizePackageImports` for Motion | Bundle size | Done |
| `@next/bundle-analyzer` installed | Monitoring | Done |
| Embla carousel min-height set | CLS | Done |

### 6.3 Pre-Launch Checklist

- [x] Compress all images in `public/images/`
- [x] OG image, Twitter image, favicon, apple-icon created
- [x] AggregateRating schema added
- [x] Internal cross-linking on procedure pages
- [x] Hero server/client split for LCP
- [x] `lang="en-IN"` consistent with OG locale
- [x] `NEXT_PUBLIC_SITE_URL` set to `https://www.drnikhilangre.com` in Vercel env vars
- [x] Sitemap submitted to Google Search Console & Bing Webmaster Tools
- [x] Old `nfsc-clinic.vercel.app` URLs auto-redirect via Vercel dashboard
- [x] HTTPS enforced (Vercel automatic)
- [x] Google Analytics 4 (`G-Y2FN7G27SJ`) installed and tracking
- [x] Microsoft Clarity (`xsfpfqo8kr`) installed — heatmaps + sessions
- [x] Bing Webmaster Tools verified + sitemap submitted
- [x] Google Business Profile created (pending: photos + address verification)
- [x] `robots.txt` allows all public pages — live at `https://www.drnikhilangre.com/robots.txt`
- [ ] **Social media URLs** — update `content/site.js` lines 599–601 with real Instagram/Facebook/YouTube URLs
- [ ] **Add clinic photos** to Google Business Profile (reception, surgery room, doctor portrait, equipment)
- [ ] **Complete Google Business Profile verification** (Google postcard or phone call)
- [ ] **Add missing treatment hero images** for procedure slugs showing icon placeholder
- [x] **`AggregateRating` updated** in `lib/schema.js` — 5.0★, 12 reviews (real Google data, July 2026)
- [x] **Real testimonials live** — 10 verified Google reviews replaced all mock data in `content/site.js` (featured: 3, grid: 7)
- [ ] **Delete unused image:** `public/images/nikhil/about-nikhil3.jpg` (2.9 MB, not referenced anywhere)
- [ ] Run [Google PageSpeed Insights](https://pagespeed.web.dev) — target 90+ on mobile
- [ ] Run [Google Rich Results Test](https://search.google.com/test/rich-results) on homepage + procedure page
- [ ] Test structured data with [Schema Markup Validator](https://validator.schema.org)

---

## Phase 7: Ongoing Monitoring

### Weekly

- Check Google Search Console for crawl errors and indexing issues
- Respond to all Google reviews (positive and negative)
- Post 2–3 times on Instagram and Facebook

### Monthly

- Review Google Analytics: top pages, bounce rate, time on site
- Check keyword rankings (use Ubersuggest free tier or Google Search Console Performance)
- Publish 2–4 blog posts
- Request 5–10 patient reviews

### Quarterly

- Full site audit with Google Lighthouse
- Update FAQ content based on "People Also Ask" trends
- Refresh meta descriptions for underperforming pages
- Check and fix any broken links
- Review Core Web Vitals in Search Console

---

## Architecture Reference

### Schema Markup (JSON-LD) — what's rendered where

| Page                                 | Schemas                                                       |
| ------------------------------------ | ------------------------------------------------------------- |
| All pages (root layout)              | `MedicalClinic` (single business entity `#clinic`, no self-serving rating) |
| `/about`                             | `BreadcrumbList` + `Physician`                                |
| `/gallery`                           | `BreadcrumbList`                                              |
| `/testimonials`                      | `BreadcrumbList` + `AggregateRating` & `Review` (merged into `#clinic`) |
| `/treatments`                        | `BreadcrumbList`                                              |
| `/treatments/[slug]`                 | `BreadcrumbList` + `FAQPage`                                  |
| `/treatments/[slug]/[procedureSlug]` | `BreadcrumbList` + `MedicalProcedure`/`SurgicalProcedure` (type per procedure `kind`) |

### Key Files

| File                           | Purpose                                                       |
| ------------------------------ | ------------------------------------------------------------- |
| `lib/seo.js`                   | `buildMetadata()`, keywords, default titles/descriptions      |
| `lib/schema.js`                | All JSON-LD schema builders (includes `AggregateRating`)      |
| `app/sitemap.js`               | Dynamic sitemap (auto-includes all procedures)                |
| `app/robots.js`                | Robots.txt configuration                                      |
| `app/opengraph-image.jsx`      | Code-generated OG image (1200x630, brand colors)              |
| `app/icon.png`                 | Static favicon (32x32, NFSC logo)                             |
| `app/apple-icon.png`           | Static Apple touch icon (180x180, NFSC logo)                  |
| `next.config.mjs`              | Security headers, image formats, bundle analyzer, package optimization |
| `content/site.js`              | NAP, social links, all site copy                              |
| `content/treatments-detail.js` | 7 categories, 55 procedures, FAQs, descriptions               |
| `.env.local`                   | `NEXT_PUBLIC_SITE_URL`, `APPS_SCRIPT_URL`                     |

### Local SEO Coverage in Schema

The `MedicalClinic` schema includes:

- **GeoCoordinates**: `19.200452, 72.841788`
- **areaServed**: Mumbai, Kandivali West, Kandivali East, Borivali, Malad, Goregaon, Andheri, Dahisar
- **hasMap**: Direct Google Maps link with CID
- **addressLocality**: Kandivali West
- **openingHours**: Mon–Sun 10:00–20:00

---

## Quick Reference: Key URLs After Launch

| Service                 | URL                                 |
| ----------------------- | ----------------------------------- |
| Google Search Console   | search.google.com/search-console    |
| Google Business Profile | business.google.com                 |
| Google Analytics        | analytics.google.com                |
| Bing Webmaster Tools    | bing.com/webmasters                 |
| PageSpeed Insights      | pagespeed.web.dev                   |
| Rich Results Test       | search.google.com/test/rich-results |
| Schema Validator        | validator.schema.org                |
| Your Sitemap            | drnikhilangre.com/sitemap.xml       |
| Your Robots.txt         | drnikhilangre.com/robots.txt        |
| Microsoft Clarity       | clarity.microsoft.com               |

---

_Last updated: July 31, 2026 — Site live at [drnikhilangre.com](https://www.drnikhilangre.com)_
