# Modern Art Website — Build Spec (End-to-End)

This markdown file is a complete, detailed build plan you can follow to create a modern, fast, accessible art website (portfolio + gallery + exhibitions + contact). It includes architecture, page specs, UI rules, content model, SEO, performance, and deployment.

---

## 0) Goals

### Primary goals
- Showcase artwork with a premium “gallery” feel.
- Fast load (Core Web Vitals), mobile-first, accessible.
- Easy to update content (CMS or simple JSON/MD files).
- SEO-friendly (artist name, artwork pages, exhibitions).

### Audience
- Collectors, curators, galleries, press, and fans.

### Key user journeys
1. Land on homepage → browse featured works → open artwork detail → inquiry.
2. Browse collections → filter by medium/year → open detail.
3. View exhibitions → RSVP/contact.
4. Contact → send message + social links.

---

## 1) Tech Stack (Recommended)

### Option A (recommended): Next.js + Tailwind + Headless CMS
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Content**: Sanity / Contentful / Strapi / Shopify (if selling)  
- **Images**: next/image + CDN
- **Analytics**: Plausible / GA4
- **Forms**: Formspree / Resend + API route

Why: modern, scalable, fast, clean SEO.

### Option B: Static (simpler): Astro + MDX
- **Framework**: Astro
- **Content**: Markdown/MDX collections
- Great if you want low complexity and very fast pages.

---

## 2) Information Architecture (Sitemap)

### Core pages
- `/` Home
- `/gallery` Gallery (all works)
- `/collections/[slug]` Collection page (e.g., “Monochromes”)
- `/artwork/[slug]` Artwork detail
- `/exhibitions` Exhibitions index
- `/exhibitions/[slug]` Exhibition detail
- `/about` About / Artist statement
- `/contact` Contact & inquiry
- `/press` Press kit / coverage (optional)
- `/shop` Shop (optional)

### Utility
- `/privacy`
- `/terms` (optional)
- `/404`

---

## 3) Visual Style Direction

### Aesthetic keywords
Minimal, gallery-like, editorial, breathable whitespace, soft motion.

### Color tokens (example)
- Background: off-white / near-black toggle
- Text: high-contrast but not harsh
- Accent: one bold color (e.g., vermillion or electric blue) used sparingly

### Typography
- Headings: modern serif (editorial feel) OR sharp grotesk (gallery feel)
- Body: clean sans (high readability)
- Large type scale, generous line-height

### Motion rules
- Use subtle transitions:
  - Fade/slide in on scroll
  - Hover: image scale 1.02 + shadow lift
- Motion must respect `prefers-reduced-motion`.

---

## 4) Components & Layout System

### Global layout
- Sticky top nav (transparent → solid on scroll)
- Footer with: copyright, socials, email, small nav

### Core components
- `Navbar`
- `Footer`
- `Hero`
- `FeaturedGrid`
- `ArtworkCard`
- `ArtworkLightbox` (optional; detail page still required)
- `FilterBar` (medium, year, availability, size)
- `CollectionHeader`
- `ExhibitionCard`
- `PressCard`
- `ContactForm`
- `CTASection`
- `Breadcrumbs`

### Grid rules
- 12-column grid on desktop
- 6-column tablet
- 2-column mobile
- Image cards should preserve aspect ratio with consistent crop strategy:
  - Fit: `contain` on detail pages
  - Crop: tasteful `cover` for grids

---

## 5) Page-by-Page Requirements

## 5.1 Home (`/`)
**Purpose**: immediate vibe + entry points.

Sections:
1. **Hero**
   - Artist name + short statement (1–2 lines)
   - Primary CTA: “View Gallery”
   - Secondary CTA: “Exhibitions” or “About”
2. **Featured works**
   - 6–12 artworks, responsive grid
3. **Featured collection**
   - One collection highlight with banner image and intro
4. **Exhibitions preview**
   - Next/upcoming + latest past
5. **CTA**
   - “Inquire about work” with contact button

---

## 5.2 Gallery (`/gallery`)
**Purpose**: browse, filter, open detail.

Must have:
- Filter bar:
  - Medium (painting/photo/sculpture/digital/mixed)
  - Year (range)
  - Availability (available/sold)
  - Price (optional; maybe “upon request”)
- Sort:
  - Newest
  - Oldest
  - Featured
- Pagination or infinite scroll (pagination better for SEO)
- Each card shows:
  - Title
  - Year
  - Medium
  - Size
  - Availability badge

---

## 5.3 Collection (`/collections/[slug]`)
- Collection hero: name + curatorial blurb
- Grid of works inside the collection
- Optional: “related collections”

---

## 5.4 Artwork Detail (`/artwork/[slug]`)
**Purpose**: high-impact viewing + inquiry.

Layout:
- Left: large image (zoom optional)
- Right: metadata + story + inquiry CTA

Content:
- Title
- Year
- Medium
- Dimensions
- Series/collection
- Availability
- Price (optional)
- Description / concept (short paragraph)
- “Inquire” button opens contact form prefilled with artwork title

Extras:
- Prev/Next artwork navigation
- Related works (same collection)
- Share buttons (minimal)

SEO:
- Unique title tags and OG image per artwork.

---

## 5.5 Exhibitions (`/exhibitions`)
- Upcoming at top
- Past exhibitions below
- Each card:
  - Exhibition name
  - Venue, city
  - Date range
  - Poster/hero image

---

## 5.6 Exhibition Detail (`/exhibitions/[slug]`)
- Hero image
- Venue, map link
- Dates/times
- Description
- Images (installation shots)
- Press links
- CTA: contact / RSVP (optional)

---

## 5.7 About (`/about`)
Must include:
- Artist statement
- Bio
- CV highlights (selected exhibitions, residencies, awards)
- Portrait image (optional)
- Downloadable press kit link (optional)

---

## 5.8 Contact (`/contact`)
- Contact form: name, email, message
- Optional: inquiry type (purchase/press/collab)
- Social links
- Studio location (city only; avoid full address unless needed)
- Success state + spam protection (honeypot + rate limit)

---

## 6) Content Model (Data Schema)

Design the content so it’s easy to power the site from a CMS or local files.

### Artwork
- `id` (string)
- `slug`
- `title`
- `year` (number)
- `medium` (string)
- `dimensions` (string; e.g., `40 x 30 in`)
- `description` (rich text or markdown)
- `collection` (reference)
- `images` (array)
  - `url`
  - `alt`
  - `width`, `height` (if known)
- `availability` (`available` | `sold` | `on-hold`)
- `price` (optional)
- `featured` (boolean)
- `tags` (array)

### Collection
- `slug`
- `name`
- `intro`
- `heroImage`

### Exhibition
- `slug`
- `title`
- `venue`
- `city`
- `country`
- `startDate`, `endDate`
- `description`
- `images`
- `pressLinks` (array)

### Site settings
- `artistName`
- `tagline`
- `socialLinks`
- `email`
- `seoDefaults`
- `themeDefaults`

---

## 7) SEO Requirements

### Technical SEO
- Clean routes (`/artwork/some-title`)
- XML sitemap
- robots.txt
- canonical tags
- structured data:
  - Organization/Person
  - BreadcrumbList
  - (Optional) VisualArtwork schema per artwork

### On-page SEO
- Each artwork page:
  - Title tag: `"Artwork Title (Year) — Artist Name"`
  - Meta description: 140–160 characters, unique
  - OG tags: image + title + description
- Image `alt` text must describe the work (not keyword stuffing).

---

## 8) Performance Requirements

### Core Web Vitals targets
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms

### Implementation
- Use responsive images (`srcset`)
- Lazy load grid images
- Preload hero image
- Limit heavy animation libraries
- Cache aggressively with CDN

---

## 9) Accessibility Requirements (WCAG-minded)

- Semantic HTML (header/nav/main/footer)
- Keyboard navigable filters and menus
- Visible focus states
- Color contrast: at least AA
- Reduce motion support:
  - respect `prefers-reduced-motion`
- Image alt text:
  - Decorative images: empty alt `""`
  - Artwork images: meaningful alt

---

## 10) Security & Privacy

- Form spam protection:
  - honeypot field
  - server-side validation
  - basic rate limiting
- No unnecessary trackers
- Provide privacy page if collecting analytics.

---

## 11) Build Steps (Next.js Example)

### 11.1 Create project
```bash
npx create-next-app@latest modern-art-site
cd modern-art-site
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p