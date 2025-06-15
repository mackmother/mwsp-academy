# MwSP Academy – High-Level Architecture (v1)

> This document maps the functional requirements from the SRS to concrete architectural components across the **frontend**, **backend**, and **infrastructure** layers. It will evolve with design spikes and implementation feedback.

---

## 1  Component Diagram
```
┌──────────────────────────────────────────────────────────┐
│                        Browser                          │
│  (Next.js App Router – React RSC + CSR fallback)        │
└───────────────┬──────────────────────────────────────────┘
                │ HTTPS (Edge / CDN)
┌───────────────▼──────────────────────────────────────────┐
│       Vercel Edge Network  (CDN + Edge Functions)        │
└───────────────┬──────────────────────────────────────────┘
                │ Server-side rendering / API routes
┌────────────────▼────────────────┐    ┌──────────────────┐
│ Next.js Serverless Functions    │    │  Vercel Cron     │
│  • Auth callbacks (Auth0)       │    │  • Billing sync  │
│  • Webhooks (Mux, Stripe)       │    └────────┬─────────┘
└────────────────┬────────────────┘             │
                 │ Prisma Client                │
┌────────────────▼──────────────────────────────▼──────────┐
│               Supabase Postgres (managed)               │
│  • Users  • Subscriptions  • Courses  • Progress        │
└────────────────┬──────────────────────────────┬─────────┘
                 │                              │
        ┌────────▼────────┐            ┌────────▼────────┐
        │   Stripe API    │            │   Mux API       │
        │  • Billing      │            │  • Video ingest │
        └─────────────────┘            └─────────────────┘
```

---

## 2  Frontend
| Concern | Technology | Notes |
|---------|------------|-------|
| UI Framework | **Next.js 14** (App Router) | SSG/SSR via Vercel; React Server Components for data-heavy pages. |
| Styling | **TailwindCSS** + shadcn/ui | Brand palette injected; shadcn for accessible primitives. |
| State / Data | React Context + SWR/React Query | Light global state (auth), streaming fetch for lessons. |
| Video Player | **Mux Player** + custom controls | Autoplay next, playback speed, chapters from text tracks. |
| Auth | **Auth0 React SDK** | Handles token acquisition + refresh.

### Folder Layout (apps/web)
```
apps/web
├─ app/            # Next.js routes (RSC)
│  ├─ (marketing)/  # Public pages
│  ├─ dashboard/    # Authenticated shell
│  ├─ course/[id]/  # Player + lessons
│  └─ api/          # Route handlers (if not edge fn)
├─ components/
├─ lib/            # fetchers, helpers
└─ styles/
```

---

## 3  Backend
| Concern | Technology | Notes |
|---------|------------|-------|
| Data Store | **Postgres (Supabase managed)** | Reliable, scalable, built-in backups. |
| ORM | **Prisma** | Type-safe DB access; generates client for edge/Node. |
| Auth | **Auth0** | Social + password; webhook to create user row. |
| Video | **Mux** | Direct uploads from admin UI; webhooks update asset status. |
| Payments | **Stripe** | Checkout + Customer Portal; webhook sync to `subscriptions` table. |
| CMS | **Sanity Studio** (@ `/admin`) | Embedded iframe; uses Sanity API. |
| Analytics | **Supabase SQL + Vercel Cron** | Nightly materialised views; optional Snowflake export.

### Database Schema (simplified v1)
```
users(id, auth0_id, email, name, avatar_url, created_at)
subscriptions(id, user_id, stripe_id, plan, status, trial_ends_at, …)
courses(id, title, description, category, visibility, created_at)
modules(id, course_id, title, order)
lessons(id, module_id, mux_asset_id, title, duration_s, order)
progress(id, user_id, lesson_id, position_s, completed_at)
```

---

## 4  DevOps & Tooling
| Area | Choice | Purpose |
|------|--------|---------|
| Monorepo | **pnpm workspaces** | Shared dev-deps; isolated build caches. |
| Lint / Format | ESLint, Prettier | Consistent code style. |
| CI | GitHub Actions + Vercel | Lint, type-check, test on PR; auto-deploy preview. |
| Testing | Vitest + Playwright | Unit and e2e coverage. |
| Releases | Conventional Commits + semantic-release | Automated changelog & versioning. |

---

## 5  Security Considerations
1. **Token Storage** – Auth0 sessions via HTTP-only cookies.  
2. **Webhook Verification** – Stripe/Mux signatures validated in edge functions.  
3. **RBAC** – `role` column in `users`; admin UI protected by Auth0 Rule.  
4. **Secrets Management** – Vercel project env vars; no secrets in repo.

---

## 6  Scaling Path
| Stage | Expected Load | Scaling Action |
|-------|---------------|----------------|
| MVP | ≤ 1k MAU | Vercel Hobby + Supabase Free |
| Growth | 10k MAU, 100 concurrent streams | Upgrade Supabase to Pro, enable Mux multi-CDN |
| Enterprise | 100k MAU, 1k concurrent streams | Vercel Pro, shard Postgres, introduce Redis edge cache |

---

## 7  Deployment Flow
1. Developer PR → GitHub.  
2. GitHub Action runs lint/test.  
3. Vercel creates Preview Deployment.  
4. Merge to `main` triggers Production deployment.  
5. Supabase migrations applied via `prisma migrate deploy` in post-deploy hook.

---

## 8  Open Items
• Churn risk model (simple SQL vs ML) – tbd.  
• Real-time comments (Supabase Realtime vs Pusher) – evaluate.  
• Multi-tenant variant (org accounts) – future phase.

---

_End of Architecture Doc v1_
