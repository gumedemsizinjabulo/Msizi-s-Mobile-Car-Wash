# Msizi's Mobile Wash — Website Project

## Project Overview

Msizi's Mobile Wash is a mobile car wash business serving Johannesburg,
founded by Msizi Gumede. This repository contains the source code for the
business's website, built as part of an IIE Web Development Portfolio of
Evidence (PoE).

## Website Goals and Objectives

- Enable clients to book car wash appointments online.
- Generate qualified leads and convert visitors into paying customers.
- Build brand credibility through professional presentation of services.

**KPIs:** appointments booked per month, enquiry form conversion rate,
website traffic from local searches, repeat booking rate.

## Key Features and Functionality

- Home page introducing the brand and its service area.
- About page sharing Msizi's story, mission, and vision.
- Services page listing wash packages and pricing.
- Booking page with an appointment request form.
- Contact page with service-area maps and a general enquiry form.

## Sitemap

```
Home (index.html)
├── About (about.html)
├── Services (services.html)
├── Booking (booking.html)
└── Contact (contact.html)
```

## File and Folder Structure

```
msizis-mobile-wash/
├── index.html
├── about.html
├── services.html
├── booking.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    └── hero-illustration.svg
```

## Timeline and Milestones

- Weeks 1–2: Research, planning, and content gathering (Part 1).
- Weeks 3–5: Visual design, CSS styling, and responsive layout (Part 2).
- Weeks 6–8: Functionality, booking form validation, and SEO (Part 3).
- Week 9: Testing, deployment, and final submission.

## Changelog

### [Part 1] — Building the Foundation

- Initial project structure created (HTML files, css/, js/, images/).
- Home, About, Services, Booking, and Contact pages built with semantic
  HTML5 and a shared navigation structure.
- Booking form and Contact enquiry form scaffolded (validation and
  submission handling to be added in Part 3).
- Placeholder stylesheet and script file added.

### [Part 2] — Designing the Visuals: CSS Styling & Responsive Design

- Built a full external stylesheet (`css/style.css`) with a custom design
  system: colour palette (navy, teal, sand, steel gray), Barlow Condensed
  for headings and Inter for body text.
- Implemented a desktop layout using CSS Grid (3-column highlights and
  service cards, 2-column team/map grids) and Flexbox (header, forms,
  footer).
- Applied decorative and interactive styles using `color`,
  `background-color`, `border`, `box-shadow`, and pseudo-classes
  (`:hover`, `:focus`, `:active`).
- Added a mobile navigation toggle button, wired to `js/script.js`.
- Implemented responsive breakpoints at 1024px (tablet) and 600px
  (mobile) using `em`-based media queries, switching multi-column grids
  to a single column and revealing the mobile nav menu on smaller
  screens.
- Used relative units (`rem`, `em`, `%`, `vw`) throughout instead of
  fixed pixel values for font sizes and spacing.

### [Part 3] — Enhancing Functionality and SEO

- Added a custom JavaScript form validation engine (`js/script.js`)
  covering the Booking and Contact forms: required fields, email format,
  South African phone format, minimum lengths, and a not-in-the-past
  check for the booking date. Errors show inline under each field and
  clear as the user corrects them.
- Simulated an asynchronous ("AJAX-style") form submission with a short
  delay and a success/failure status message, since no backend endpoint
  is connected yet — see the comment in `script.js` for where to plug in
  a real `fetch()` call.
- Added an interactive FAQ accordion on the homepage (DOM manipulation,
  `aria-expanded` state, only one panel open at a time).
- Added dynamic content loading: the Booking page's package dropdown is
  now populated from a single shared `SERVICE_PACKAGES` array in
  `script.js`, so it can't drift out of sync with the Services page.
- **On-page SEO**: added canonical links and Open Graph/Twitter meta
  tags to every page, and JSON-LD `AutoWash` structured data on the
  homepage (name, service area, address, phone, price range, hours).
- Added an original SVG hero illustration (`images/hero-illustration.svg`)
  with descriptive `alt` text, explicit `width`/`height`, and
  `loading="lazy"` for image optimisation.
- Added `robots.txt` and `sitemap.xml` at the project root for search
  engine crawling.
- **Note:** canonical/OG URLs and the sitemap use a placeholder domain
  (`https://www.msizismobilewash.co.za/`) — update these to the actual
  deployed URL (Netlify/GitHub Pages) before final submission.
- Visual QA: caught and fixed an issue where empty required date/time
  fields showed a red "invalid" border on page load. Switched to a
  `.field-error` class intended to be toggled by JavaScript after user
  interaction, rather than relying on `:invalid` directly.

### WhatsApp booking

- Added a site-wide floating "Chat on WhatsApp" button (bottom-right,
  every page) using WhatsApp's free `wa.me` click-to-chat link — no
  WhatsApp Business API or backend required.
- Added a "Continue on WhatsApp" option on the Booking form: it runs
  the same validation as the normal submit button, then opens WhatsApp
  with a prefilled message summarising the booking (name, package,
  vehicle, date, time, address, notes).
- **Before launch:** replace the placeholder number (`27731234567`,
  international format, no `+` or leading `0`) in `js/script.js`
  (`WHATSAPP_NUMBER`) and in each page's floating button `href` with
  Msizi's real WhatsApp Business number.
- Deliberately used an original, simple speech-bubble icon rather than
  reproducing WhatsApp's trademarked logo mark.

## References
