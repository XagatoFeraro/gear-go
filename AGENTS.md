<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Gear Go Automobiles — Project instructions

## Source of truth
- Read `docs/PHASE-1-BRIEF.md` before making changes.
- Phase 1 is a **static, SEO/AISEO-first public marketing and lead-generation website** for Gear Go Automobiles (Aya Nagar, New Delhi). No Phase 2 functionality.

## Stack & deployment
- Next.js (App Router) + TypeScript, vanilla CSS with design tokens.
- Phase 1 deploy target for testing: **GitHub Pages via static export** (`output: "export"`). Avoid server-only/runtime features incompatible with static export (API routes, server actions, SSR/ISR, middleware runtime logic, cookies/headers, default image optimization).
- `NEXT_PUBLIC_BASE_PATH` controls `basePath`/`assetPrefix` for project Pages testing (e.g. `/gear-go`); remove/empty for custom domain root later. Keep links/assets/metadata basePath-safe.

## Rules
1. Do **not** invent business facts, prices, reviews, certifications, warranties, team members, or service availability.
2. Keep all business facts in `src/data/business.ts`. Use `{{PLACEHOLDER}}` / neutral fallbacks (e.g. “Call or WhatsApp for current pricing”) until confirmed.
3. No Phase 2: no login, portal, ops/technician apps, real booking engine/slots, payments, live tracking, estimates workflow, inventory, invoicing, CRM, database, or SMS/email automation.
4. Conversions: **WhatsApp**, **phone call**, **directions**, and **enquiry form** handoff. Both WhatsApp and form must be available; form must be useful to operator (external provider/dashboard/email/sheet) and never show “Booking confirmed”.
5. Reuse Gear Go identity (night/lime/paper, Space Grotesk + DM Sans). Real photos where available; clearly labelled placeholders otherwise. No fake reviews/ratings/schema.
6. Every page mobile-first, accessible (WCAG 2.2 AA intent), fast, crawlable semantic HTML. No horizontal overflow 320–1440px. Minimal client JS.
7. No fake claims (“best”, “certified”, “free”, “24/7”, “cashless”, “OEM-only”, “lifetime”) without proof. Unique, useful content per service/area (no thin/doorway pages). No `aggregateRating` without real visible reviews.
8. Keep public repo free of secrets, API keys, and private business documents. Use public form keys/providers appropriately.
