# Checkmate Property — Project Pages & Context

Document for humans and AI agents. Describes the product, stack, route map, and how major systems connect.

Last updated: 2026-07-16

---

## 1. Product overview

**Checkmate Property** is a real-estate marketing + CMS site for U.S. property opportunities, educational content (Flip House / Academy), and lead-capture landing pages (especially for Brazilian audiences).

| Area | Purpose |
|------|---------|
| Public site | Home, properties, projects, academy tutorials, contact, legal |
| Landing pages | Paid/organic LP funnels in Portuguese (`/lp`, `/lp-br`) |
| Forms CMS | Admin-built dynamic forms rendered at `/forms/[slug]` |
| Admin panel | Properties, users, forms, submissions, site settings |

**Live domain pattern:** `checkmateproperty.com` (www redirects to apex).  
**External app:** `https://app.checkmateproperty.com` (registration / product login).

---

## 2. Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js App Router (`src/app`) — Next 16 |
| UI | React 19, Tailwind CSS 4, Lucide icons |
| Backend / DB | Supabase (Postgres + Storage) |
| Auth (admin) | Custom cookie `property_admin_session` + `ADMIN_SESSION_SECRET` |
| Email | Resend |
| Forms | Dynamic CMS (`forms`, `form_fields`, submissions, webhooks, emails) |

Key code locations:

- Pages: `src/app/**/page.tsx`
- Shared logic: `src/lib/**`
- Admin UI components: `src/components/admin/**`
- Public LP components: `src/components/lp/**`, `src/components/lp-brasil/**`
- Middleware (admin gate): `src/middleware.ts`

---

## 3. Route map (all pages)

Paths below are URL paths. File lives at `src/app/<path>/page.tsx` unless noted.

### 3.1 Public marketing & home

| Path | Locale | Purpose |
|------|--------|---------|
| `/` | en | Main marketing home; featured properties; hero search form (`search`); CTAs to app register |
| `/aprenda` | pt-BR | Long-form education / sales page (Flip House, New Construction, Academy, plans) |
| `/lp` | pt-BR | FREE BR landing — Flip House fundamentals + Checkmate tools; form slug `flip-house` |
| `/lp-br` | pt-BR | Invest landing — U.S. real estate / capital narrative; form slug `lp-brasil` |
| `/lp-brasil` | — | **Redirect only** → `/lp-br` (permanent, `next.config.ts`) |

### 3.2 Properties & projects

| Path | Locale | Purpose |
|------|--------|---------|
| `/properties` | en | Public listing of opportunities (Supabase) |
| `/properties/[slug]` | en | Property detail (media, docs, videos, complements, lead form) |
| `/projects` | en | Portfolio / projects listing (links into property slugs) |

### 3.3 Contact & legal

| Path | Locale | Purpose |
|------|--------|---------|
| `/en/contact-us` | en | Contact page; dynamic form slug `contact` |
| `/contact` | — | Legacy → redirects to `/en/contact-us` |
| `/privacy-policy` | en | Privacy Policy |
| `/terms-of-use` | en | Terms of Use |
| `/data-policy` | en | Data Policy |

Footer links on LPs should use `/terms-of-use` and `/privacy-policy` (not `/terms`).

### 3.4 Academy / tutorials (canonical under `/en/academy-videos`)

| Path | Purpose |
|------|---------|
| `/en/academy-videos` | Tutorial index |
| `/en/academy-videos/calculator` | Calculator tutorial |
| `/en/academy-videos/hard-money` | Hard Money tutorial |
| `/en/academy-videos/skip-trace` | Skip Trace tutorial |
| `/en/academy-videos/marketing-campaigns` | Marketing Campaigns tutorial |
| `/en/academy-videos/projects` | Projects tutorial |
| `/en/academy-videos/properties` | Properties search/filter tutorial |

**Legacy aliases** (pages that redirect to the canonical academy routes):

| Legacy path | Redirects to |
|-------------|--------------|
| `/tutorial` | `/en/academy-videos` |
| `/tutorial/calculator`, `/tutorial/calculadora` | `/en/academy-videos/calculator` |
| `/tutorial/hard-money`, `/tutorial/hardmoney` | `/en/academy-videos/hard-money` |
| `/tutorial/skip-trace` | `/en/academy-videos/skip-trace` |
| `/tutorial/marketing-campaigns` | `/en/academy-videos/marketing-campaigns` |
| `/tutorial/projects`, `/tutorial/projetos` | `/en/academy-videos/projects` |
| `/tutorial/properties` | `/en/academy-videos/properties` |
| `/en/academy-videos/calculadora` | `/en/academy-videos/calculator` |
| `/en/academy-videos/hardmoney` | `/en/academy-videos/hard-money` |
| `/en/academy-videos/projetos` | `/en/academy-videos/projects` |

### 3.5 Forms & thank-you flows

| Path | Purpose |
|------|---------|
| `/forms/[slug]` | Renders a **published** form from CMS by slug |
| `/thank-you/[slug]` | Thank-you page from `thank_you_pages` (video/CTA optional) |
| `/lp-obrigado` | Static PT thank-you after LP registration (app / temp password messaging) |
| `/search-thanks-you` | Static EN thank-you after search/register-style flows |

**Important form slugs used by landing pages:**

| Slug | Used on |
|------|---------|
| `flip-house` | `/lp` |
| `lp-brasil` | `/lp-br` |
| `contact` | `/en/contact-us` |
| `search` | Home hero (when published) |

After submit, forms redirect to `thank_you_page_url` on the form record (fallback often `/thank-you/default`).

### 3.6 Admin panel (`/admin/*`)

Middleware requires cookie `property_admin_session` except `/admin/login`. Fine-grained permissions live in `src/lib/admin-permissions.ts`.

| Path | Purpose |
|------|---------|
| `/admin/login` | Admin login |
| `/admin/access-denied` | Shown when role lacks permission |
| `/admin/dashboard` | KPI overview (properties, leads, forms, submissions, users) |
| `/admin/dashboard/properties` | Alternate / older properties dashboard list |
| `/admin/properties` | Property management list (`properties.read`) |
| `/admin/properties/new` | Create property (`properties.create`) |
| `/admin/properties/[id]/edit` | Edit property, media, SEO, visibility (`properties.update`) |
| `/admin/complementos` | Reusable complement blocks for property pages |
| `/admin/users` | Admin users list (`users.read`) |
| `/admin/users/new` | Create admin user (`users.create`) |
| `/admin/users/[id]/edit` | Edit user role/status/password (`users.update`) |
| `/admin/forms` | Forms CMS list (duplicate / open / public preview) |
| `/admin/forms/new` | Create form |
| `/admin/forms/[id]` | Edit form settings, **fields** (create/edit/delete), webhooks, emails, recent submissions |
| `/admin/forms/[id]/submissions/[submissionId]` | Single submission detail + webhook/email logs |
| `/admin/forms/[id]/webhooks/[webhookId]` | Edit webhook |
| `/admin/forms/[id]/emails/[emailId]` | Edit email notification template |
| `/admin/submissions` | Global submissions inbox with filters |
| `/admin/settings` | Site branding / contact / social / default CTA |

---

## 4. API routes

| Path | Purpose |
|------|---------|
| `POST /api/forms/[slug]/submit` | Public form submit endpoint |
| `POST /api/campaign/register` | Campaign registration helper |

---

## 5. Redirects (`next.config.ts`)

| Source | Destination | Type |
|--------|-------------|------|
| `/lp-brasil` | `/lp-br` | permanent |
| `www.checkmateproperty.com/:path*` | `https://checkmateproperty.com/:path*` | permanent |

Additional redirects also exist **inside** some `page.tsx` files (tutorial → academy-videos, `/contact` → `/en/contact-us`).

---

## 6. SEO entry points

- `src/app/sitemap.ts` — home, properties, projects, contact, legal, `/lp`, `/lp-br`, `/tutorial`, `/aprenda`, plus dynamic property slugs
- `src/app/robots.ts` — crawl rules for public vs admin/private paths

---

## 7. Systems other AIs should know

### 7.1 Dynamic forms

- Admin builds forms at `/admin/forms/[id]`
- Field names must be unique per form (`form_fields_form_id_name_unique`); create/update auto-suffix (`name_2`) when needed
- Field types include text, email, phone, select, radio, state (US), presets `state_br`, `whatsapp_br`, `whatsapp_us`, etc.
- Public renderer: `DynamicFormComponent` + `getPublishedFormBySlug` in `src/lib/forms.ts`
- Landing pages often embed the same form instead of linking out to `/forms/[slug]`

### 7.2 Properties

- Managed in admin; public at `/properties` and `/properties/[slug]`
- Complements configured under `/admin/complementos`
- Media hosted on Supabase Storage (`property-media`, `site-assets`, etc.)

### 7.3 Landing pages (`/lp` vs `/lp-br`)

| Route | Positioning | Form slug | Main CSS |
|-------|-------------|-----------|----------|
| `/lp` | Free educational Flip House content | `flip-house` | `src/app/lp/lp.css` (`.cmp-free`) |
| `/lp-br` | Investor / capital / U.S. market access | `lp-brasil` | `src/app/lp-br/lp-br.css` (`.cmp-invest`) |

Shared LP pieces: YouTube click-to-play cover under `src/components/lp/`, reveal animations, portfolio carousel via `getFlipHouseImageUrl`.

### 7.4 Admin auth

- Cookie: `property_admin_session`
- Middleware blocks `/admin/*` without cookie (except login)
- Permissions checked per section (properties, users, settings, forms)

---

## 8. Suggested mental model for agents

```
Public traffic
  ├─ Home / Properties / Projects / Academy / Contact / Legal
  ├─ LP funnels (/lp, /lp-br) → CMS forms → thank-you
  └─ /forms/[slug] standalone form pages

Admin (/admin)
  ├─ Content: properties, complements, settings
  ├─ Growth: forms, fields, webhooks, emails, submissions
  └─ Access: users + roles
```

When changing a landing page:

1. Confirm which form slug it loads.
2. Confirm thank-you URL on that form in admin.
3. Keep legal footer links pointing to `/terms-of-use` and `/privacy-policy`.
4. Prefer editing existing LP CSS classes over inventing a parallel design system.

When adding a page:

1. Put `page.tsx` under `src/app/...`
2. Update `sitemap.ts` / `robots.ts` if it should be public SEO
3. Add redirects if replacing an old URL
4. Document it in this file

---

## 9. Quick file index for common tasks

| Task | Start here |
|------|------------|
| Edit FREE BR LP | `src/app/lp/page.tsx`, `src/app/lp/lp.css` |
| Edit Invest LP | `src/app/lp-br/page.tsx`, `src/app/lp-br/lp-br.css` |
| Form field CRUD (admin) | `src/lib/admin-forms.ts`, `src/components/admin/forms/*` |
| Public form render | `src/app/forms/[slug]/page.tsx`, `src/components/forms/dynamic-form.tsx` |
| Property public page | `src/app/properties/[slug]/page.tsx` |
| Admin shell / nav | `src/app/admin/layout.tsx` |
| Redirects | `next.config.ts` + individual legacy `page.tsx` files |

---

## 10. Out of scope / not pages

- Client-only components and CSS modules are not routes.
- `not-found.tsx` is the global 404 UI, not a navigable product page.
- The separate mobile/web app at `app.checkmateproperty.com` is **outside** this Next.js repo.
