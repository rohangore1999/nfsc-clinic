# NFSC Website Plan

## Dr. Nikhil Face Surgical & Aesthetic Centre

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG, SEO-friendly, fast |
| Styling | Tailwind CSS | Rapid, utility-first |
| Animations | Framer Motion | Subtle, performant |
| Form Backend | Google Sheets + Google Apps Script | Free, unlimited, acts as mini CRM |
| Hosting | Vercel (free tier) | Native Next.js support |

---

## Design System

### Colors

| Role | Value |
|---|---|
| Background | `#FFFFFF` (pure white — dominant) |
| Section alternate | `#F9F9F9` (light gray — sparingly) |
| Gold accent | `#C9A04F` |
| Dark (footer/CTA) | `#1A1A2E` |
| Text | `#333333` |
| Secondary text | `#666666` |
| Light text | `#999999` |

### Typography

| Usage | Font |
|---|---|
| Headings | Playfair Display |
| Body | Poppins / Inter (light weights) |

### Design Principles

- Pure white dominant backgrounds
- Gold `#C9A04F` is the ONLY accent color
- Lots of whitespace — Apple-like simplicity
- Soft rounded corners (12-16px)
- Subtle shadows, no heavy borders
- Minimal and premium feel
- Mobile-first responsive

---

## Site Map

```
/                              -> Home (Landing Page)
/about                         -> About Us (Clinic + Doctors + Team)
/treatments                    -> Treatments Overview
/treatments/facial-surgery     -> Facial Surgery Details
/treatments/hair-treatments    -> Hair Treatments Details
/gallery                       -> Before/After Gallery
/testimonials                  -> Patient Testimonials
/contact                       -> Contact Us + Booking Form
```

---

## Page Designs

### 1. Home Page (Landing)

**Navbar (sticky)**
- White background
- Logo left: NFSC logo + "NFSC" bold gold + "Dr. Nikhil Face Surgical & Aesthetic Centre" smaller gray stacked
- Centered nav links: Home, About Us, Treatments (dropdown), Gallery, Testimonials, Contact Us
- Right: gold outlined "Book Appointment" button
- Subtle bottom shadow on scroll

**Hero Section**
- Pure white background, centered layout
- Doctor credentials row: "MDS — Oral & Maxillofacial Surgery - 10+ Years Surgical Experience" (small gray text, gold dot separator)
- Large Playfair heading: "Expert Facial Surgery & Aesthetic Treatments"
- Italic tagline: "Where surgical precision meets aesthetic artistry"
- Treatment tag pills: `Rhinoplasty` `Facelift` `Hair Transplant` `PRP Therapy` `Blepharoplasty` (gold outline, white fill)
- 3-column treatment mini grid cards (Facial Surgery, Hair Treatments, Skin Treatments) — white cards, thin border, arrow icon, hover lift
- CTA: gold "Book Free Consultation" button + gold outlined "Call Now" button side by side
- Trust icons below: Safe Procedures, Certified Clinic, Personalized Care, Advanced Technology
- Gold decorative flourish separator

**Why Choose NFSC Section (Glassmorphism)**
- Dark background `#1A1A2E` to `#2D2D4E` gradient with soft gold gradient blobs at 10% opacity
- Section title: "Why Choose NFSC" in white, subtext "What sets us apart" in light white
- 3 glassmorphism cards:
  - `background: rgba(255, 255, 255, 0.1)`
  - `backdrop-filter: blur(20px)`
  - `border: 1px solid rgba(255, 255, 255, 0.2)`
  - Gold 3px top border accent
  - Gold icons, white title, light white description
  - Cards: Expert Surgeon, Advanced Technology, Personalized Care
- Trust keywords below in light white with gold dot separators

**About Preview**
- Split layout: doctor photo left, intro text + credentials + "Learn More" gold link right

**Treatments Section (Alternating Rows)**
- Title: "Our Treatments" centered, gold underline
- Row 1 — Facial Surgery: image left, content right
  - Gold label "01 — FACIAL SURGERY"
  - Heading, description, procedure chips: `Rhinoplasty` `Facelift` `Blepharoplasty` `Jaw Contouring` `Otoplasty`
  - Gold "Explore Facial Surgery ->" link
- Row 2 — Hair Treatments: content left, image right (mirrored)
  - Gold label "02 — HAIR TREATMENTS"
  - Chips: `Hair Transplant` `PRP Therapy` `Mesotherapy` `GFC Treatment`
- Thin gold divider between rows
- Editorial, spacious feel

**Quote + Stats Section**
- Gold decorative quotation marks framing: "Every face tells a story. My role is to help you tell yours with confidence." — Dr. Nikhil
- Thin gold divider
- Two real stats: "10+ Years of Surgical Experience" + "500+ Successful Procedures" (career total)
- Gold numbers, dark labels, thin gold vertical separator

**Testimonials Carousel**
- Simple carousel with clean quote cards
- Thin gold accent line on top of each card
- Star ratings in gold, patient name, review text

**CTA Banner**
- Dark `#1A1A2E` background
- Two columns: left has heading + inline form (Name, Phone, Treatment dropdown, gold "Book Now" button), right has clinic image
- "Visit Clinic" map pin link below
- Form inputs: dark transparent `rgba(255,255,255,0.1)` style

**Footer**
- Dark `#1A1A2E` background
- Top: centered NFSC gold logo + social media icons (Instagram, Facebook, YouTube, Google) in gold
- Gold divider
- 4 columns: About NFSC, Quick Links, Treatments, Visit Us (with embedded Google Map)
- Gold divider + copyright bar

---

### 2. About Us Page

**Page Hero**
- Breadcrumb: "HOME / ABOUT US"
- Heading: "About NFSC"
- Subtext with gold dot separators

**Clinic Overview**
- Two-column: clinic interior image left, "A Space Designed for Your Comfort" heading + description + badges (State-of-the-Art, Sterile Environment, Patient-First) right

**Clinic Photo Gallery Strip**
- Horizontal scrollable row of 5-6 clinic photos (reception, consultation, OT, recovery, equipment, exterior)
- Captions below each, light gray background

**Equipment & Technology**
- 3-column card grid
- Each card: equipment image, name, description, gold treatment tag pill

**Clinic Values**
- 3 blocks: gold numbers "01" "02" "03"
- "Safety First", "Personalized Approach", "Honest Guidance"
- Open layout, no card borders, editorial

**Gold diamond divider between Clinic and Doctors sections**

**Doctor Profile — Dr. Nikhil**
- Two-column: portrait with gold left border accent + social icons left, profile details right
- Name, degree, gold divider, bio paragraphs, expertise pills

**Career Timeline**
- Light gray background
- Vertical gold timeline with alternating left/right milestone cards
- 4-5 milestones: education -> training -> fellowships -> NFSC
- Gold circle dots, white cards with year/title/description

**Memberships & Certifications**
- Grayscale logos, gold tint on hover

**Personal Quote**
- Gold quotation marks, italic quote, Dr. Nikhil attribution

**Our Team**
- 3-column grid of team member cards
- Each card: portrait photo (3:4 ratio) with dark gradient overlay, name + role floating on image
- Below photo: degree, specialization pills (gold outline), experience line
- On card click: detail modal/lightbox with larger photo, full bio, specializations, "Book with [Doctor]" gold button
- 4 placeholder members: Dr. Nikhil, Dr. Priya, Dr. Rahul, Dr. Sneha

**CTA Banner + Footer** (same as home)

---

### 3. Treatments Pages

**Overview Page (`/treatments`)**
- Hero banner + card grid for treatment categories

**Facial Surgery (`/treatments/facial-surgery`)**
- Hero + individual procedure cards
- Procedures: Rhinoplasty, Facelift, Blepharoplasty, Jaw Contouring, Otoplasty

**Hair Treatments (`/treatments/hair-treatments`)**
- Hero + individual procedure cards
- Procedures: Hair Transplant, PRP Therapy, Mesotherapy, GFC Treatment

*(Detailed design TBD — to be planned in Stitch)*

---

### 4. Gallery Page

**Page Hero**
- "Transformations" heading
- Subtext: "Real patients **-** Real results **-** Real confidence" (gold dots, visible `#666666`)

**Filter Tabs**
- Sticky below navbar: "All", "Facial Surgery", "Hair Treatments", "Rhinoplasty", "Facelift"
- Active: gold filled, inactive: gold outline

**Before/After Gallery Grid**
- 2-column grid (desktop)
- Each card: split before/after images with gold center divider
- Interactive drag slider handle (gold circle)
- "Before" / "After" labels on dark badges
- Treatment name, category pill, timeline note below
- White card, subtle shadow, hover lift

**Lightbox on Click**
- Dark overlay `rgba(0,0,0,0.85)`
- Large before/after with interactive drag slider
- Navigation arrows (gold), close button (gold X)
- Treatment info below image
- Keyboard nav: arrows + escape
- Mobile: touch swipe + drag

**Load More**
- Gold outlined button, "Showing 8 of 24 results"

**Trust Strip**
- "All photos are of real patients with their consent. Results may vary."

**CTA Banner + Footer** (same as home)

---

### 5. Testimonials Page

**Page Hero**
- "Patient Stories" heading
- Subtext: "Hear from those who trusted us **-** Real experiences **-** Real results"

**Featured Testimonials Carousel**
- Full-width, one testimonial per slide
- Left: before/after image pair with gold divider
- Right: gold quotation mark, review text (18px), 5 gold stars, patient name, treatment pill, timeline
- Gold arrows, dot indicators, auto-rotate 6s

**Stats Strip**
- Light gray background
- "4.9 Average Rating" / "100% Would Recommend" / "Verified Patient Reviews"
- Gold icons, thin gold vertical separators

**Filter Tabs**
- "All Reviews", "Facial Surgery", "Hair Treatments", "5 Star Only"

**Reviews Grid**
- 3-column uniform cards
- Star rating, review text (truncate + "Read more"), patient avatar + name + "Verified Patient", treatment pill
- 9 cards initially

**Load More**
- "Load More Reviews" button, showing count

**Google Review CTA**
- Clean card with Google "G" logo, "See all our reviews on Google", gold arrow

**CTA Banner + Footer** (same as home)

---

### 6. Contact Us Page

*(Design TBD — to be planned)*

**Planned elements:**
- Contact form: Name, Phone, Email, Treatment Interest dropdown, Message
- Google Map embed
- Clinic address, phone, email, working hours
- Social media links

---

## Form Submission Backend

### Google Sheets + Apps Script (Free)

**Flow:**
```
Patient fills form on website (beautiful UI, never leaves site)
    |
    v
Next.js sends POST request to Google Apps Script URL
    |
    v
Apps Script writes new row to Google Sheet
    |
    v
Google Sheet notification emails clinic staff
    |
    v
Clinic staff views/manages inquiries in the Google Sheet (mini CRM)
```

**Google Sheet Columns:**
| Timestamp | Name | Phone | Email | Treatment | Message |
|---|---|---|---|---|---|

**Setup Steps:**
1. Create a Google Sheet with the columns above
2. Go to Extensions -> Apps Script
3. Write a doPost() function that reads POST data and appends a row
4. Deploy as web app (anyone can access)
5. Copy the web app URL into the Next.js form submission handler

**Notification System (Free):**

On every form submission, the Apps Script `doPost()` does 3 things simultaneously:

```
Patient submits form on website
    |
    v
Apps Script doPost() receives data
    |
    ├──> 1. Writes row to Google Sheet (database/CRM)
    ├──> 2. Sends email via MailApp (detailed notification)
    └──> 3. Sends Telegram message via bot API (instant mobile push)
```

**Email Notification (via Gmail):**
- Uses `MailApp.sendEmail()` inside the same Apps Script
- Sends formatted email with all patient details to clinic email
- Received on phone via Gmail app
- Free, unlimited

**Telegram Bot Push Notification (instant mobile alert):**
- Create a free Telegram bot via @BotFather (2 min setup)
- Get the bot token + chat ID
- Apps Script sends a POST request to Telegram Bot API after each submission
- Instant push notification on phone with patient details
- Free forever, no limits, most reliable

**Telegram message format:**
```
🔔 New Patient Inquiry!

Name: Rahul Sharma
Phone: 9876543210
Email: rahul@email.com
Treatment: Rhinoplasty
Message: I want to know about the procedure...

📅 24 Apr 2026, 10:30 AM
```

**Telegram Setup Steps:**
1. Open Telegram → search @BotFather → send `/newbot`
2. Name the bot (e.g., "NFSC Patient Alerts")
3. Copy the bot token
4. Send a message to the bot, then get your chat ID via `https://api.telegram.org/bot<TOKEN>/getUpdates`
5. Add the token + chat ID to the Apps Script
6. Apps Script uses `UrlFetchApp.fetch()` to send Telegram messages

**Why this approach:**
- Completely free, unlimited submissions
- Sheet acts as a patient inquiry database
- Shareable with clinic staff
- No third-party service dependency
- Instant mobile notification via Telegram (never miss a lead)
- Email backup for detailed records
- Upgrade path: move to HubSpot free CRM later if needed

---

## Implementation Phases

### Phase 1 — Design (Current)
- [x] Home page design in Stitch
- [x] Gallery page design in Stitch
- [x] About Us page design in Stitch
- [x] Testimonials page design in Stitch
- [ ] Contact Us page design in Stitch
- [ ] Treatments pages design in Stitch

### Phase 2 — Development Setup
- [ ] Initialize Next.js 14 project
- [ ] Configure Tailwind CSS
- [ ] Set up project structure and routing
- [ ] Add fonts (Playfair Display, Poppins/Inter)
- [ ] Create shared components (Navbar, Footer, CTA Banner)

### Phase 3 — Page Development
- [ ] Build Home page
- [ ] Build About Us page
- [ ] Build Treatments pages
- [ ] Build Gallery page
- [ ] Build Testimonials page
- [ ] Build Contact Us page

### Phase 4 — Backend & Integration
- [ ] Set up Google Sheet + Apps Script
- [ ] Integrate form submission
- [ ] Add Google Maps embed
- [ ] SEO optimization (meta tags, OG images, sitemap)

### Phase 5 — Content & Launch
- [ ] Replace placeholder images with real clinic/doctor photos
- [ ] Add real treatment content
- [ ] Add real testimonials
- [ ] Final testing (mobile, performance, forms)
- [ ] Deploy to Vercel
- [ ] Connect custom domain

---

## Stitch Project

Design files: https://stitch.withgoogle.com/projects/2296134684966453685

---

## Notes

- Clinic is NEW — avoid fake patient volume stats. Use Dr. Nikhil's personal career experience instead.
- No animated rotating text — user found it basic and annoying.
- Glassmorphism needs dark/rich background to work — NOT plain gray.
- User prefers pure white backgrounds, not off-white or gray tints.
- Keep design simple, aesthetic, minimal — no clutter.
