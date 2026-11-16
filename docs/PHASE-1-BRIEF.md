# Gear Go Automobiles — Phase 1 Static Website Brief

**Status:** Source of truth for Phase 1  
**Repo:** `~/Developer/personal/gear-go`  
**Business:** Gear Go Automobiles, Aya Nagar, New Delhi  
**Phase:** 1 — public static marketing and lead-generation website  
**Not in scope:** customer login, portal, ops dashboard, technician app, booking engine, payments, live tracking, estimates, inventory, CRM, database, SMS/email automation.

---

## 1. How to use this document

This document is the complete Phase 1 requirement, context and implementation plan.

Rules for the implementation agent:

1. Read this entire document before writing code.
2. Do not invent business facts, prices, reviews, certifications, warranties, team members or service availability.
3. Anything written as `{{PLACEHOLDER}}` must be confirmed by the owner before launch.
4. If a fact is unknown, render a neutral fallback such as “Call or WhatsApp for current pricing” rather than making something up.
5. Do not build Phase 2 functionality into Phase 1.
6. Build the site so Phase 2 can be added later without redesigning the public pages.
7. Prefer clean, semantic, crawlable HTML over JavaScript-rendered content.
8. Every page must be useful to a real customer, not just a search engine.
9. Ask for missing owner content before filling a page with generic filler.
10. Keep the public repository free of secrets, API keys and private business documents.

---

## 2. Executive summary

Gear Go Automobiles is a multi-brand car service garage in Aya Nagar, New Delhi. The owner has purchased a domain and needs a credible public website that:

- Proves the garage exists and is operating.
- Shows every service the garage actually offers.
- Makes it effortless to call, WhatsApp or get directions.
- Ranks for local service searches in Aya Nagar, South Delhi and nearby NCR areas.
- Gives AI search engines clear, structured, factual information about the business.
- Looks premium, trustworthy and local — not like a generic template.
- Can later connect to the dynamic customer portal and garage operations platform already prototyped.

Phase 1 is a **static website**. It is not a booking system. “Book a service” must hand the customer to WhatsApp or a simple enquiry form with a clear, honest message. No fake confirmation, no fake payment, no fake live tracking.

---

## 3. Business context

### 3.1 Business facts

Use one single source of truth for these values, for example `src/data/business.ts`.

| Field | Value | Status |
|---|---|---|
| Trade name | Gear Go Automobiles | Confirm |
| Tagline | Transparent car care for Delhi NCR | Confirm |
| Address | Phase 4, H Block, Aya Nagar, behind Fitness Club Gym, New Delhi, Delhi 110047 | Confirm exact landmark and parking note |
| Locality | Aya Nagar | Confirm |
| City | New Delhi | Confirm |
| State | Delhi | Confirm |
| PIN | 110047 | Confirm |
| Primary phone | `{{PHONE}}` | Owner must provide |
| WhatsApp number | `{{WHATSAPP}}` | Owner must provide |
| Email | `{{EMAIL}}` | Owner must provide |
| Owner public name | `{{OWNER_NAME}}` | Confirm whether to display publicly |
| Owner direct phone | `{{OWNER_PHONE}}` | Optional; only if owner wants it public |
| Opening hours | Mon–Fri 09:00–19:00, Sat 09:00–17:00, Sun closed | Confirm |
| Domain | `{{DOMAIN}}` | Owner has purchased it |
| Google Maps place URL | `{{GOOGLE_MAPS_URL}}` | Owner must provide |
| Google Business Profile | `{{GBP_URL}}` | Create/claim if missing |
| Instagram | `{{INSTAGRAM_URL}}` | Optional |
| Facebook | `{{FACEBOOK_URL}}` | Optional |
| YouTube | `{{YOUTUBE_URL}}` | Optional |
| GSTIN | `{{GSTIN}}` | Only display if owner wants it public |
| Established year | `{{ESTABLISHED_YEAR}}` | Confirm |
| Years of experience | `{{YEARS_EXPERIENCE}}` | Confirm |
| Team size | `{{TEAM_SIZE}}` | Confirm |
| Brands serviced | All car brands and models (confirm exclusions: EV/hybrid/luxury/commercial/very old) | Owner confirmed “All cars” |
| Payment methods | `{{PAYMENT_METHODS}}` | Confirm |
| Warranty policy | Workmanship warranty available — ask for current terms/coverage/exclusions | Owner confirmed “Yes” (details TBD) |
| Pickup/drop-off | Available — confirm coverage, charges, hours | Owner confirmed “Yes” (details TBD) |
| Towing | Available — confirm coverage, charges, hours | Owner confirmed “Yes” (details TBD) |
| Insurance coordination | Available — claim approval remains with insurer; confirm cashless/reimbursement & partners | Owner confirmed “Yes” (details TBD) |
| Parts policy | Original or equivalent-quality parts, approved before fitment | Owner confirmed |
| Parking note | `{{PARKING_NOTE}}` | Confirm |

### 3.2 Positioning

Gear Go should feel like a real local garage with named people, transparent inspection-first service, competent with modern multi-brand cars, convenient for Aya Nagar/South Delhi/Gurugram, premium enough to trust but not corporate.

Avoid fake luxury language, unverifiable claims, stock photos as real workshop, fake review counts/ratings, fake booking/tracking states, and generic filler.

---

## 4. Phase 1 goals and success metrics

### 4.1 Primary goal
Turn local search and referral traffic into direct conversations with the garage.

### 4.2 Primary conversions
1. WhatsApp click (main)
2. Phone call click
3. Get directions click
4. Enquiry form submission (secondary; hands off to operator via external provider and/or WhatsApp)
5. Google Business Profile action

### 4.3 Success metrics
Track monthly: WhatsApp/call/direction clicks, form submissions, Search Console impressions/clicks, GBP actions, Core Web Vitals (LCP/CLS/INP), indexed pages/crawl errors, conversion by page/device.

### 4.4 Phase 1 non-goals
No customer login/accounts/portal, ops/technician apps, online booking with slots/capacity, payments, live tracking, estimate approval workflow, inventory, invoicing, CRM, database, SMS/email automation, review submission, e-commerce, mobile app. No dead Phase 2 links.

---

## 5. Audience and customer intent

Primary audiences: local Aya Nagar car owners; South Delhi (Chhatarpur, Mehrauli, Saket, Malviya Nagar, Vasant Kunj); Gurugram/Faridabad for specific services; existing customers needing NAP/hours/directions; comparison shoppers; insurance/accident customers; pre-purchase inspection seekers.

Serve intents like: car service near me/Aya Nagar, AC/brake/denting/inspection queries, multi-brand service Delhi, symptom queries, cost queries, business contact queries — each with a clear page and direct next step.

---

## 6. Information architecture

### 6.1 Required pages
| Page | Path | Purpose |
|---|---|---|
| Home | `/` | Trust, services overview, location, primary CTAs |
| Services index | `/services/` | All services, grouped |
| Service detail | `/services/[slug]/` | One page per confirmed/useful service |
| About | `/about/` | Owner, team, workshop, values, real photos |
| Why Gear Go | `/why-gear-go/` | Trust differentiators/process (real only) |
| Service areas index | `/service-areas/` | Served localities |
| Area detail | `/service-areas/[slug]/` | Unique local page per area |
| Contact | `/contact/` | NAP, map, hours, call, WhatsApp, directions, form |
| Book / request service | `/book/` | Honest WhatsApp handoff and/or enquiry form |
| FAQ | `/faq/` | Grouped questions |
| Reviews | `/reviews/` | Real reviews only, with source |
| Gallery | `/gallery/` | Real workshop/team/work photos |
| Guides | `/guides/` | Optional Phase 1.5 |
| Privacy | `/privacy/` | Privacy policy |
| Terms | `/terms/` | Website terms |
| Cancellation / reschedule | `/cancellation/` | Only if real policy |
| Warranty / disclaimer | `/warranty/` | Only if real policy |
| 404 | not-found | Helpful recovery |
| Sitemap | `/sitemap.xml` | Generated |
| Robots | `/robots.txt` | Crawl rules |
| LLMS | `/llms.txt` | AI search summary |

### 6.2 Navigation
Desktop: Services, Service areas, Why Gear Go, About, Contact, CTAs WhatsApp & Call. Mobile: same + accessible menu and sticky bottom bar (Call, WhatsApp, Directions). Footer: NAP, hours, key links, legal, map/social if real.

---

## 7. Service catalogue

Owner must confirm which are actually offered. **For now keep all 20 listed**; add/remove/modify later. Do not publish invented details.

| # | Service | Slug | Group |
|---|---|---|---|
| 1 | Periodic Car Service | `periodic-car-service` | Maintenance |
| 2 | Car Inspection | `car-inspection` | Maintenance |
| 3 | Engine Diagnostics | `engine-diagnostics` | Diagnostics |
| 4 | Mechanical Repairs | `mechanical-repairs` | Repairs |
| 5 | Brake & Suspension Checks | `brake-suspension` | Safety |
| 6 | Suspension & Fitments | `suspension-fitments` | Safety |
| 7 | Clutch & Body Parts | `clutch-body-parts` | Repairs |
| 8 | Electrical Repairs | `electrical-repairs` | Repairs |
| 9 | Battery Service | `battery-service` | Safety |
| 10 | Tyres & Wheel Care | `tyres-wheel-care` | Safety |
| 11 | AC Service & Repair | `ac-service-repair` | Comfort |
| 12 | Car Spa & Cleaning | `car-spa-cleaning` | Care |
| 13 | Interior Cleaning | `interior-cleaning` | Care |
| 14 | Detailing Services | `detailing-services` | Care |
| 15 | Denting & Painting | `denting-painting` | Bodywork |
| 16 | Accidental Damage Inspection | `accidental-damage-inspection` | Bodywork |
| 17 | Insurance Claims | `insurance-claims` | Bodywork |
| 18 | Windshield & Lights | `windshield-lights` | Bodywork |
| 19 | Lights & Replacement | `lights-replacement` | Safety |
| 20 | Custom Repair | `custom-repair` | Repairs |

Notes: 5/6 and 18/19 may overlap (merge/rename if owner prefers). Add-ons only if offered. **Default price note:** “Price confirmed after inspection. Call or WhatsApp for a current estimate.”

### 7.2 Service page content standard
Each service page: H1 with service+location, 40–60 word answer-first summary, signs/symptoms, what’s included/not included, 3–5 step process, duration only if confirmed, pricing note, real differentiators, 3–6 FAQs, related services, CTAs, last updated/reviewed, schema (Service, FAQPage, BreadcrumbList). No thin pages.

---

## 8. Page-by-page requirements (summary)

- **Home:** hero with real photo/location/hours/CTAs, trust strip (real proof), quick actions, services grid, how-it-works, why Gear Go, service areas, real reviews/gallery if available, FAQ, location/map block, final CTA, footer. No fake live tracker.
- **Services index:** grouped listings, neutral pricing note, “not sure” WhatsApp CTA.
- **About:** real story/team/workshop/photos, consented names/photos, no fake awards/certifications.
- **Why Gear Go:** inspection before recommendation, estimate before paid work, plain-language explanation, parts approved before fitment, pickup/towing/insurance/warranty only as confirmed (neutral wording until details).
- **Areas:** unique 300–600 word pages per confirmed area with landmarks/directions, relevant services, local FAQ, map/CTA, `areaServed`.
- **Contact:** NAP, tel/WhatsApp, map (click-to-load) + directions, hours, parking, enquiry form, privacy note.
- **Book:** honest handoff (WhatsApp prefill and/or static-provider form). Fields: name, mobile, car make/model, registration (opt), service needed, preferred date (opt), concern, consent. Microcopy: no payment taken, garage confirms availability.
- **FAQ:** grouped; schema only for visible Q&A.
- **Reviews:** real/sourced only, link to Google; no fake ratings/`AggregateRating`.
- **Gallery:** real images, consent for before/after, optimized/lazy-loaded, descriptive alt.
- **Legal:** privacy/terms required; cancellation/warranty only if real policies; owner review before launch.

---

## 9. Conversion and contact behaviour

- WhatsApp: `https://wa.me/91XXXXXXXXXX?text=...` contextual prefilled messages, new tab `rel="noopener"`, track `whatsapp_click`, no auto-send.
- Phone: `tel:+91...`, track `call_click`.
- Directions: Google Maps directions URL, click-to-load map, track `directions_click`.
- Forms: validation, labels, honeypot, clear success/handoff/error, no sensitive data, no “booking confirmed”, no storage in static site. Form submissions must reach operator via chosen external provider (email/dashboard/sheet) — pluggable for future backend.
- Mobile sticky bar: Call/WhatsApp/Directions, safe-area aware, 44px targets, no content overlap.
- Events: `whatsapp_click`, `call_click`, `directions_click`, `service_view`, `area_view`, `form_start`, `form_submit`, `form_error`, `review_link_click`.

---

## 10. Design direction

- Tokens: `--night:#0d1410; --night-2:#131c16; --night-3:#1b271e; --ink:#141813; --ink-soft:#2e352d; --muted:#697066; --muted-2:#8b9187; --paper:#f5f4ed; --paper-2:#eeece3; --white:#fffefa; --line:#dfded4; --lime:#d9ff4f; --lime-2:#c2ec2e; --lime-soft:#ecffc0; --red:#b53c2f; --amber:#966100; --blue:#2f5d8a; --green:#2f6d45`.
- Fonts: Space Grotesk (display), DM Sans (body), self-hosted/subset where possible.
- Visual: dark green hero, lime primary CTA, warm paper sections, rounded 16px cards, thin borders/subtle shadows, real photography, clear hierarchy. Header transparent over hero → solid on scroll. Subtle motion, respects `prefers-reduced-motion`. Responsive 320–1440, no horizontal scroll.

---

## 11. SEO / AISEO requirements

- Technical: static crawlable HTML, HTTPS, canonical host, trailing-slash policy, canonicals, unique titles/meta/H1, breadcrumbs, internal links, sitemap, robots, custom 404, alt text, 301s if needed.
- On-page: answer-first (40–60 words), plain language, real local detail, confirmed facts only, last updated on service/guide pages.
- Local: consistent NAP, GBP optimization, correct categories, `areaServed`, `hasMap`.
- Structured data (JSON-LD): `AutoRepair`/`LocalBusiness`, `Organization`/`WebSite` as appropriate, `BreadcrumbList`, `Service`, `FAQPage` (visible), `ImageObject` where useful. No `aggregateRating`/invented reviews/prices.
- AISEO: `llms.txt` (and optional `llms-full.txt`), factual answer-first content, consistent entity/NAP/hours, semantic HTML, schema, about/contact/services clarity, last updated, `sameAs` to real profiles, no JS-hidden content or fluff.

---

## 12. Performance and accessibility

- Targets: mobile Lighthouse 95/100/100/100 (Perf/A11y/BP/SEO), LCP < 2.0s, CLS < 0.05, INP < 200ms.
- Implementation: static HTML, minimal JS, optimized/self-hosted fonts, responsive optimized images, lazy-load below fold, click-to-load map, explicit image dimensions.
- Accessibility: WCAG 2.2 AA, keyboard/focus, skip link, landmarks, labelled forms/errors, contrast, 44px targets, accessible mobile menu, reduced motion.

---

## 13. Recommended tech stack (project decision)

**Project decision (override):** **Next.js (App Router) + TypeScript + vanilla CSS**, static-exported for Phase 1 (GitHub Pages test), structured to evolve into a dynamic/fullstack app later in the same repo. Keep dependencies minimal and export-safe in Phase 1.

Data/content: `src/data/business.ts` as single source; content/data-driven services, areas, FAQs. Suggested routes align with IA above. Centralize analytics/conversion helpers.

---

## 14. Content requirements from the owner

(See checklist in original brief: identity, contact/location, services, trust content, legal/operations — all must be confirmed/approved before launch; placeholders until then.)

---

## 15–16. Implementation, acceptance, and launch

Follow milestones 0–7 and acceptance criteria in brief: discovery/sign-off, scaffold/design system, core pages, service pages, area/local SEO, conversion/analytics/SEO infra, QA/launch, post-launch. No placeholders/fakes in production; all required checks pass; site live on domain with HTTPS; Search Console/Bing/GBP configured.

---

## 17–19. Risks and Phase 2 boundary

Key risks: unconfirmed services/facts/photos, fake/inconsistent claims, thin/duplicate pages, heavy embeds, weak GBP/NAP, broken CTAs, mobile UX issues, secrets in repo, domain cutover/SEO continuity. Mitigate with single data source, owner sign-off, real content only, QA, and careful basePath/domain switch.

Phase 2 (future, not in Phase 1): login/portal/ops/tech apps, real booking/slots, estimates/approvals, job cards, inventory, invoices/payments, live tracking, reminders/comms — build Phase 1 to reuse data/tokens/layout/slugs/SEO patterns without exposing dead routes now.

---

## 20. Owner questions to answer before build/launch

1. Exact domain? 2. Real phone? 3. Real WhatsApp? 4. Public email? 5. Owner name/photo public? 6. Exact address/landmark/parking? 7. Exact hours/holidays? 8. Which of 20 services offered? 9. Missing services? 10. Publish prices or “after inspection”? 11. Warranty/workmanship terms (duration/coverage/exclusions/claim)? 12. Brands serviced/exclusions? 13. Pickup/drop-off/towing/insurance details (availability/coverage/charges/hours/cashless/partners)? 14. Photos/logo? 15. GBP URL? 16. Maps URL? 17. Real reviews to quote/link? 18. Real social profiles? 19. Payment methods? 20. Language (English now, Hindi later)? 21. Analytics tool/consent? 22. Form destination (email/dashboard/Google Sheet/provider)? 23. Legal entity/GSTIN? 24. Offers/campaigns? 25. Who approves copy/launch?

---

## 21. Definition of done

Phase 1 done when: live on purchased domain over HTTPS; every confirmed service listed/linked; real owner-approved content; WhatsApp/call/directions work; honest functional request flow; SEO/perf/a11y/responsive checks pass; Search Console/Bing set up; GBP claimed/consistent; sitemap/robots/llms live; no placeholders/fakes/dead Phase 2 links; owner signed off; Phase 2 can begin without redoing public site.
