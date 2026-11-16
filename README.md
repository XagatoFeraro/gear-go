# Gear Go Automobiles — Website

Phase 1 static marketing and lead-generation website for **Gear Go Automobiles** (Aya Nagar, New Delhi).

- **Stack:** Next.js (App Router) + TypeScript + vanilla CSS
- **Phase 1 output:** static export (`output: "export"`) for GitHub Pages testing, designed to evolve into a dynamic/fullstack app later
- **Source of truth:** [`docs/PHASE-1-BRIEF.md`](docs/PHASE-1-BRIEF.md)
- **Project rules:** [`AGENTS.md`](AGENTS.md)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run lint
npm run typecheck
npm run build
```

Static files are generated in `out/` (for export mode).

### GitHub Pages project-site test

The included workflow (`.github/workflows/deploy-pages.yml`) builds with:

- `NEXT_PUBLIC_BASE_PATH=/gear-go`
- `NEXT_PUBLIC_SITE_URL=https://xagatoferaro.github.io/gear-go`

Enable **Settings → Pages → Source: GitHub Actions** in the repo, then push to `main` (or run the workflow manually).

### Custom domain cutover (later)

When connecting the purchased domain:

1. Set `NEXT_PUBLIC_SITE_URL=https://<your-domain>` and remove `NEXT_PUBLIC_BASE_PATH` (or set empty) in the build environment.
2. Add `public/CNAME` with the custom domain if required.
3. Configure DNS and GitHub Pages custom domain/HTTPS.
4. Replace placeholders in `src/data/business.ts` and content; verify canonicals/sitemap/robots/links.
5. Replace `public/og-image.png` (1200×630 social card) with a final branded/photo version if available.

## Key files

- `src/data/business.ts` — single source of truth for business facts, services, areas, CTAs, and form config (use placeholders until confirmed; do not invent facts)
- `src/app/` — routes/pages (App Router)
- `src/components/` — UI components (Header, Footer, MobileCtaBar, EnquiryForm, illustrations)
- `src/app/llms.txt/route.ts`, `src/app/sitemap.ts`, `src/app/robots.ts` — generated SEO/AISEO files
- `src/lib/seo.ts` — canonical/Open Graph helpers and JSON-LD builders
- `public/og-image.png` — social sharing card (generated from brand tokens, no stock photos)

## Contact flow (Phase 1)

- **WhatsApp / Call / Directions:** primary conversions
- **Enquiry form:** submits to `business.form.endpoint` when configured (e.g. Formspree/Web3Forms/Sheets endpoint); if not configured, falls back to opening WhatsApp with filled details so the operator can receive the enquiry. No automatic booking confirmation or payment.

## Notes

- Keep all 20 services listed for now unless owner confirms changes; default pricing note is “Price after inspection”.
- Confirm and replace all `{{PLACEHOLDER}}` values and policy details before production launch.
- No Phase 2 features in this phase (no login/portal/booking engine/payments/tracking/database).
