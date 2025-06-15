# MwSP Academy – Software Requirements Specification (SRS v1)

> This document converts the original product brief provided by the founder into a structured Markdown SRS. It preserves all functional requirements while incorporating the technical decisions already locked in (Next.js 14, TailwindCSS, Prisma, pnpm monorepo, Auth0, Stripe, Supabase, Mux, shadcn/ui).

---

## 1  Platform Overview
Build a modern SaaS video-learning platform with a binge-friendly UI inspired by Netflix, Amazon Prime, and MasterClass. The product combines sleek video browsing, smart content categories, and robust subscription management.

---

## 2  Functional Requirements

### 2.1  Frontend – User Interface
| # | Area | Requirement |
|---|------|-------------|
| FR-1 | **Homepage / Dashboard** | • Hero banner or featured carousel (trending courses / upcoming events)<br>• Sticky top nav with logo, global search, notifications, profile dropdown<br>• Category menu tabs (Sales, Marketing, Product…) similar to Amazon Prime |
| FR-2 | **Content Discovery** | • Responsive grid of course cards (thumbnail, % completed, category badge)<br>• Sections: _Resume watching_, _Start Here_, _New & Popular_, _Recommended for You_ |
| FR-3 | **Course Page** | • Netflix-style player (autoplay next lesson, speed control, chapter markers)<br>• Sidebar: modules / lessons list with % complete, downloadable resources<br>• Tabs: Overview, Comments, Attachments<br>• Progress sync across devices |
| FR-4 | **Account & Payment** | • Social login (Google, GitHub, Apple) + email/password via Auth0<br>• Subscription flow: 30-day free trial, credit-card required, monthly / annual toggle via Stripe Checkout<br>• Account page: view plan, payment history, change card, cancel subscription |

### 2.2  Backend – Admin Features
| # | Area | Requirement |
|---|------|-------------|
| FR-5 | **Content Management** | • Drag-and-drop video uploader (Mux direct uploads)<br>• Auto-thumbnail generation<br>• Organise videos into modules / playbooks<br>• Visibility flags (free, premium, hidden)<br>• Tagging with categories & skills |
| FR-6 | **Video Settings** | • Title, description, duration<br>• Chapter markers<br>• Attachments (PDFs, links) |
| FR-7 | **User Management** | • List users by cohort, signup date, subscription status<br>• Filter by course progress, most-watched topics, churn risk<br>• Manually extend trial / grant VIP access |
| FR-8 | **Subscriptions & Payments** | • View revenue reports, retry failed payments, issue refunds<br>• Plan builder: monthly / yearly, optional add-ons (1-on-1 coaching, certifications) |

### 2.3  Analytics Dashboard
| FR-9 | **User Engagement** | Daily / Monthly active users, average watch time, funnel drop-off |
| FR-10 | **Course Performance** | Views by module, completion rate, ratings / feedback |
| FR-11 | **Revenue Metrics** | MRR, ARR, churn rate, trial-to-paid conversion |

### 2.4  Optional Premium Features (Phase 2+)
• Live Office Hours (Zoom embed)
• Completion certificates (auto-generated PDF)
• Gamification (badges, streaks, leaderboard)
• AI Coach Bot (ChatGPT-like assistant)

---

## 3  Non-Functional Requirements
| ID | Category | Requirement |
|----|----------|-------------|
| NFR-1 | **Performance** | First Meaningful Paint < 2 s on 4G mobile, streaming starts < 1 s. |
| NFR-2 | **Reliability** | ≥ 99.9 % uptime, graceful degradation if Mux/Supabase is down. |
| NFR-3 | **Security** | OAuth best-practices, HTTPS everywhere, Stripe PCI redirect, no PII in logs. |
| NFR-4 | **Scalability** | Serve 10 k concurrent viewers; use Vercel edge + Mux streaming. |
| NFR-5 | **Accessibility** | WCAG 2.1 AA compliance, keyboard nav, captions support. |
| NFR-6 | **Maintainability** | Monorepo with shared ESLint / Prettier; 80 % unit-test coverage. |
| NFR-7 | **Internationalisation** | i18n-ready; default English, add locales via JSON resources. |

---

## 4  Tech Stack (Locked-In)
| Layer | Choice |
|-------|--------|
| Frontend | **Next.js 14 (App Router) + shadcn/ui + TailwindCSS** |
| Styling / Design System | Tailwind with brand palette `#F6B352 #F68657 #383A3F #1F2124` |
| State / Data Fetching | React Server Components + React Query (tbd) |
| Package Manager | **pnpm** workspaces (monorepo) |
| Backend ORM | **Prisma** with Supabase Postgres |
| Authentication | **Auth0** (social + email/password) |
| Payments | **Stripe** (monthly / yearly plans, 30-day trial) |
| Video | **Mux** (direct uploads, webhooks, stream-only) |
| CMS | **Sanity Studio** at `/admin` |
| Hosting | **Vercel** (frontend + serverless functions) |

---

## 5  User Roles
| Role | Description |
|------|-------------|
| Visitor | Unauthenticated; can view marketing pages & teaser videos. |
| Subscriber | Paying customer; full access to premium content. |
| Admin | Manage content, users, subscriptions, analytics. |

---

## 6  Milestones & Phases
1. **Initial Scaffold** (✔) – monorepo, tooling, Tailwind palette
2. **MVP** – Auth0 auth, Stripe checkout, Mux playback, basic CMS
3. **Analytics & Dashboard** – engagement & revenue metrics
4. **Premium Features** – certificates, live sessions, AI coach

---

## 7  Open Questions
1. Final logo SVG – pending from design team ✔️
2. AI coach tech (OpenAI / Anthropic) – decide in Phase 2.
3. Exact CMS schema – refine during MVP.

---

## 8  Appendix
• Wireframes (to be linked from Figma)
• ERD for Postgres (to be generated after Prisma schema v1)

---

_End of SRS v1_
