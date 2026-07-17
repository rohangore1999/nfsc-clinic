# NFSC — SEO Launch & Domain Setup Guide

> Actionable checklist for Dr. Nikhil Face Surgical & Aesthetic Centre to
> maximize organic search rankings after acquiring a custom domain.

---

## Current SEO Status (as of July 2026)

### Already Implemented

- [x] **Dynamic sitemap** — all 67 URLs (5 static + 7 categories + 55 procedures) auto-generated from `treatments-detail.js`
- [x] **Security headers** — `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` in `next.config.mjs`
- [x] **JSON-LD schema** on every page: `MedicalClinic`, `LocalBusiness`, `Physician`, `MedicalProcedure`, `BreadcrumbList`, `FAQPage`
- [x] **Local SEO schema** — `GeoCoordinates` (lat/lng), `areaServed` (Kandivali, Borivali, Malad, Goregaon, Andheri, Dahisar), `hasMap`
- [x] **Meta descriptions** — unique per page, auto-truncated to ≤155 chars on procedure pages
- [x] **Page titles** — unique per page, ≤60 chars with `| NFSC` suffix, include "Mumbai" location keyword
- [x] **Canonical URLs** — set on every page via `buildMetadata()` in `lib/seo.js`
- [x] **OG + Twitter tags** — present on every page with `summary_large_image` card type
- [x] **Static OG image** — `app/opengraph-image.jpg` and `app/twitter-image.jpg`
- [x] **Heading hierarchy** — single H1 per page, proper H1→H2→H3 flow (no level skipping)
- [x] **Skip-to-content link** — accessibility landmark in root layout
- [x] **Semantic HTML** — `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>` used throughout
- [x] **`id="main-content"`** on every page's `<main>` element
- [x] **ARIA attributes** — menu buttons, carousel controls, FAQ accordion, gallery lightbox
- [x] **Font optimization** — `next/font/google` with `display: swap`, limited to used weights only
- [x] **Image optimization** — all images use `next/image` with `fill` + `sizes` prop, `priority` on hero LCP images only
- [x] **Code splitting** — `CtaBanner`, `WhyChoose`, `AboutPreview`, `Quote`, `GalleryLightbox` loaded via `next/dynamic`
- [x] **Keywords** — location-specific keywords ("rhinoplasty Mumbai", "hair transplant Kandivali", "facial surgeon near me")
- [x] **robots.txt** — allows all public pages, disallows `/api/`
- [x] **Color contrast** — `text-muted` meets WCAG AA 4.5:1 ratio
- [x] **No keyword stuffing** — all "SEO Keywords" visible sections removed from procedure pages
- [x] **SSG** — 76 pages pre-rendered at build time via `generateStaticParams()`

### Still Needs Action Before Launch

- [ ] **Compress source images** — 236 MB total in `public/images/`; resize to ≤200 KB per image (see Phase 6.1)
- [ ] **Set `NEXT_PUBLIC_SITE_URL`** in Vercel env vars to production domain (currently set to `nfsc-clinic.vercel.app` in `.env.local`)
- [ ] **Replace social `href="#"` placeholders** in `content/site.js` lines 599–601 with real Instagram/Facebook/YouTube URLs
- [ ] **Add missing treatment hero images** for ~10 procedure slugs (currently fallback to icon placeholder after 404s)
- [ ] **Install analytics** — Google Analytics 4 or `@vercel/analytics` for Core Web Vitals monitoring
- [ ] **Set up Google Business Profile** (see Phase 2.2)
- [ ] **Submit sitemap to Google Search Console** (see Phase 2.1)

---

## Phase 1: Domain & DNS Setup (Day 1)

### 1.1 Choose a domain

| Option                        | SEO notes                                                   |
| ----------------------------- | ----------------------------------------------------------- |
| `nfscclinic.com`              | Brand-match, short, memorable                               |
| `drnikhilangre.com`           | Doctor-name keyword — ranks for "Dr Nikhil Angre Mumbai"    |
| `nfsc.clinic`                 | `.clinic` TLD is accepted by Google but less trusted by users |
| `drnikhilfacialsurgery.com`   | Keyword-rich but long                                       |

**Recommendation:** Pick a `.com` with the brand or doctor name. Avoid hyphens.

### 1.2 DNS & SSL

- Point the domain to Vercel via CNAME or A records (Vercel dashboard → Domains)
- Vercel auto-provisions SSL — confirm HTTPS works
- Redirect `www` → non-www (or vice versa) — pick ONE canonical version
- Update `NEXT_PUBLIC_SITE_URL` in Vercel env vars to the production URL (e.g. `https://drnikhilangre.com`)

### 1.3 Redirect the old Vercel URL

In Vercel dashboard (Settings → Domains), the `nfsc-clinic.vercel.app` URL will auto-redirect to the custom domain once configured. Alternatively, add a 301 redirect in `next.config.mjs`:

```js
async redirects() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'nfsc-clinic.vercel.app' }],
      destination: 'https://yourdomain.com/:path*',
      permanent: true,
    },
  ];
}
```

This prevents duplicate content penalties.

---

## Phase 2: Google & Bing Setup (Day 1–3)

### 2.1 Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your domain as a **Domain property** (verifies all subdomains at once)
3. Verify via DNS TXT record
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`
5. Request indexing for your homepage
6. Monitor the **Coverage** report for crawl errors

### 2.2 Google Business Profile (CRITICAL for local SEO)

This is **the single most important step** for a clinic.

1. Go to [business.google.com](https://business.google.com)
2. Claim or create your business listing:
   - Name: **Dr. Nikhil Face Surgical & Aesthetic Centre**
   - Category: `Facial plastic surgeon` (primary), add secondary: `Dermatologist`, `Hair transplant clinic`, `Cosmetic dentist`
   - Address: 1st floor, Avenue Building, Hemukalani Cross Rd 4, Kandivali West, Mumbai 400067
   - Phone: +91 7020089539
   - Website: `https://yourdomain.com`
   - Hours: Mon–Sun 10AM–8PM
3. Add photos: clinic reception, surgery room, doctor portrait, equipment
4. Write a 750-char business description with keywords:
   > "Dr. Nikhil Face Surgical & Aesthetic Centre (NFSC) in Kandivali West, Mumbai, offers expert facial surgery, hair transplant, aesthetic dentistry, and dermatology. Led by Dr. Nikhil Angre, MDS, a fellowship-trained maxillofacial and facial plastic surgeon with 5+ years of experience. Services include rhinoplasty, facelift, blepharoplasty, jaw contouring, hair transplant (FUE/FUT), PRP therapy, Botox, dermal fillers, smile designing, dental implants, and advanced skin treatments. State-of-the-art facility with digital microscope, advanced laser, and high-speed PRP centrifuge. Book a free consultation today."
5. Set up **appointment link** → `https://yourdomain.com/#contact`
6. Post weekly updates (Google Posts) — treatment tips, before/after results
7. Ask patients to leave Google reviews (this directly impacts local pack ranking)

### 2.3 Bing Webmaster Tools

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Import from Google Search Console (easiest)
3. Submit sitemap

### 2.4 Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get the Measurement ID (`G-XXXXXXXXXX`)
3. Add to Next.js via `next/script`:

```jsx
// app/layout.jsx — add inside <body>
import Script from "next/script";

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="gtag-init" strategy="afterInteractive">
  {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`}
</Script>
```

Alternatively, use `@vercel/analytics` (simpler, privacy-friendly, built into Vercel):

```bash
npm install @vercel/analytics
```

```jsx
// app/layout.jsx
import { Analytics } from "@vercel/analytics/react";
// Add <Analytics /> inside <body>
```

---

## Phase 3: Directory & Citation Submissions (Week 1–2)

**NAP Consistency** (Name, Address, Phone) must be IDENTICAL everywhere.
Use exactly: **Dr. Nikhil Face Surgical & Aesthetic Centre**

### 3.1 Medical & Healthcare Directories (HIGH priority)

| Platform              | URL                                      | Why it matters                         |
| --------------------- | ---------------------------------------- | -------------------------------------- |
| **Practo**            | practo.com                               | #1 healthcare platform in India        |
| **Lybrate**           | lybrate.com                              | Doctor discovery, patient reviews      |
| **Bajaj Finserv Health** | bajajfinservhealth.in                 | Growing healthcare platform            |
| **Clinicspot**        | clinicspot.com                           | Clinic discovery                       |
| **Curofy**            | curofy.com                               | Doctor networking + patient referrals  |
| **Docplexus**         | docplexus.in                             | Medical professional network           |
| **Apollo 24/7**       | apollo247.com                            | List your practice                     |
| **1mg**               | 1mg.com                                  | Doctor listing                         |

### 3.2 General Business Directories

| Platform              | URL                                      | Why it matters                         |
| --------------------- | ---------------------------------------- | -------------------------------------- |
| **Justdial**          | justdial.com                             | Massive local search in India          |
| **Sulekha**           | sulekha.com                              | Local services directory               |
| **IndiaMART**         | indiamart.com                            | Business directory with backlinks      |
| **Yellow Pages India**| yellowpages.co.in                        | Traditional directory, strong DA       |
| **Hotfrog India**     | hotfrog.in                               | Free business listing                  |

### 3.3 Maps & Location

| Platform              | URL                                      |
| --------------------- | ---------------------------------------- |
| **Google Maps**       | Already listed via Google Business Profile |
| **Apple Maps**        | mapsconnect.apple.com                    |
| **Bing Places**       | bingplaces.com                           |
| **MapQuest**          | mapquest.com (add listing)               |

### 3.4 Social Media Profiles (create if not existing)

| Platform              | What to do                               |
| --------------------- | ---------------------------------------- |
| **Instagram**         | Post before/after reels, procedure walkthroughs. Link in bio → website |
| **Facebook Page**     | Create a business page. Add address, hours, phone. Post regularly |
| **YouTube**           | Upload procedure explainer videos. Each video description → link to treatment page |
| **LinkedIn**          | Create a company page + doctor's personal profile |
| **Twitter/X**         | Share health tips, link to blog posts    |

> **After creating profiles:** Update `content/site.js` lines 599–601 with real social URLs.
> The `sameAs` array in `lib/schema.js` auto-populates from `site.footer.socials` — no separate update needed.

### 3.5 Review Platforms

| Platform              | Why it matters                           |
| --------------------- | ---------------------------------------- |
| **Google Reviews**    | Directly impacts local pack ranking      |
| **Practo Reviews**    | Patients search here before booking      |
| **Facebook Reviews**  | Social proof + engagement signals        |
| **Justdial Reviews**  | Local authority signal                   |

**Strategy:** After every successful treatment, send a WhatsApp message with a direct Google review link. Aim for 50+ genuine reviews in the first 3 months.

---

## Phase 4: Content & Blog Strategy (Ongoing)

### 4.1 Add a Blog

Create `/app/blog/` with MDX or CMS-backed content. Blog posts are the #1 way to rank for long-tail keywords.

**High-priority blog topics** (based on search volume for Mumbai):

| Topic                                        | Target keyword                              |
| -------------------------------------------- | ------------------------------------------- |
| "Rhinoplasty Cost in Mumbai 2026"            | rhinoplasty cost mumbai                     |
| "Best Hair Transplant Surgeon in Kandivali"  | hair transplant kandivali west              |
| "Facelift vs Thread Lift — Which Is Right?"  | facelift vs thread lift                     |
| "PRP Hair Treatment: What to Expect"         | prp hair treatment mumbai                   |
| "Botox for Jawline Slimming — Complete Guide"| botox jawline mumbai                        |
| "How to Choose a Maxillofacial Surgeon"      | maxillofacial surgeon mumbai                |
| "Dental Implants vs Bridges — Pros & Cons"   | dental implants mumbai                      |
| "Acne Scar Treatment Options in Mumbai"      | acne scar treatment mumbai                  |
| "Hair Transplant Recovery Timeline"          | hair transplant recovery india              |
| "Chemical Peel vs Laser — Which Is Better?"  | chemical peel vs laser mumbai               |

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

| Strategy                          | How                                                        |
| --------------------------------- | ---------------------------------------------------------- |
| **Guest posts on health blogs**   | Write for platforms like HealthKart, PharmEasy blog, 1mg blog |
| **Doctor interviews / features**  | Reach out to Mumbai Mirror, Mid-Day for health features    |
| **Case studies on medical forums**| Publish cases on ResearchGate, PubMed (if applicable)      |
| **Local news**                    | Sponsor or participate in community health events          |
| **University/hospital affiliations** | Get listed on alumni or hospital partner pages          |
| **Supplier/partner pages**        | Equipment manufacturers often link to clinics using their tech |

### 5.2 Backlinks to Avoid

- Paid link farms
- Low-quality directory spam
- Comment spam on blogs
- PBN (Private Blog Network) links

---

## Phase 6: Technical SEO Checklist (Pre-Launch)

### 6.1 Image Compression (CRITICAL — 236 MB total)

The `public/images/` directory contains oversized source images. Compress before deploying:

```bash
# Install Sharp CLI globally
npm install -g sharp-cli

# Batch resize all treatment images to max 1200px wide, quality 80
find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) \
  -exec sh -c 'sharp resize 1200 --withoutEnlargement --quality 80 "$1" -o "$1"' _ {} \;
```

Or use [Squoosh](https://squoosh.app/) for manual compression. Target sizes:
- Hero images: ≤200 KB
- Thumbnails/cards: ≤100 KB
- Gallery images: ≤150 KB

Top offenders to compress first:
| File | Current size |
|------|-------------|
| `non-surgical-facial-aesthetics.jpg` | 23 MB |
| `acanthosis-nigricans-treatment.png` | 19 MB |
| `PRP_centrifuge.jpeg` | 10 MB |
| `Laser_system.jpeg` | 9.1 MB |
| `Microscope.jpeg` | 7.6 MB |
| `cosmetic-treatments.jpeg` | 6.9 MB |
| `about-nikhil.jpg` | 6.7 MB |

### 6.2 Pre-Launch Checklist

- [ ] Compress all images in `public/images/` (see 6.1)
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain in Vercel env vars
- [ ] Sitemap submitted to Google Search Console & Bing
- [ ] All old `nfsc-clinic.vercel.app` URLs 301 redirect to new domain
- [ ] HTTPS enforced (Vercel does this automatically)
- [ ] `www` → `non-www` redirect (or vice versa) — pick one
- [ ] Google Analytics 4 or `@vercel/analytics` installed and tracking
- [ ] Google Business Profile verified and complete
- [ ] Social media profile URLs updated in `content/site.js` lines 599–601
- [ ] `robots.txt` allows all public pages — verify at `yourdomain.com/robots.txt`
- [ ] Add missing treatment hero images for procedure slugs with no matching file
- [ ] Delete unused `public/images/nikhil/about-nikhil3.jpg` (2.9 MB, not referenced anywhere)
- [ ] Run Google PageSpeed Insights — target 90+ on mobile
- [ ] Run Google Rich Results Test on every page type
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

| Page | Schemas |
|------|---------|
| All pages (root layout) | `MedicalClinic` + `LocalBusiness` |
| `/about` | `BreadcrumbList` + `Physician` |
| `/gallery`, `/testimonials` | `BreadcrumbList` |
| `/treatments` | `BreadcrumbList` |
| `/treatments/[slug]` | `BreadcrumbList` + `FAQPage` |
| `/treatments/[slug]/[procedureSlug]` | `BreadcrumbList` + `MedicalProcedure` |

### Key Files

| File | Purpose |
|------|---------|
| `lib/seo.js` | `buildMetadata()`, keywords, default titles/descriptions |
| `lib/schema.js` | All JSON-LD schema builders |
| `app/sitemap.js` | Dynamic sitemap (auto-includes all procedures) |
| `app/robots.js` | Robots.txt configuration |
| `next.config.mjs` | Security headers, redirects |
| `content/site.js` | NAP, social links, all site copy |
| `content/treatments-detail.js` | 7 categories, 55 procedures, FAQs, descriptions |
| `.env.local` | `NEXT_PUBLIC_SITE_URL`, `APPS_SCRIPT_URL` |

### Local SEO Coverage in Schema

The `MedicalClinic` schema includes:
- **GeoCoordinates**: `19.200452, 72.841788`
- **areaServed**: Mumbai, Kandivali West, Kandivali East, Borivali, Malad, Goregaon, Andheri, Dahisar
- **hasMap**: Direct Google Maps link with CID
- **addressLocality**: Kandivali West
- **openingHours**: Mon–Sun 10:00–20:00

---

## Quick Reference: Key URLs After Launch

| Service                 | URL                                                |
| ----------------------- | -------------------------------------------------- |
| Google Search Console   | search.google.com/search-console                   |
| Google Business Profile | business.google.com                                |
| Google Analytics        | analytics.google.com                               |
| Bing Webmaster Tools    | bing.com/webmasters                                |
| PageSpeed Insights      | pagespeed.web.dev                                  |
| Rich Results Test       | search.google.com/test/rich-results                |
| Schema Validator        | validator.schema.org                               |
| Your Sitemap            | yourdomain.com/sitemap.xml                         |
| Your Robots.txt         | yourdomain.com/robots.txt                          |

---

*Last updated: July 17, 2026*
