
# MSP Growth Hub – Frontend Integration Instructions (for LLM Partner)

This ZIP contains all frontend HTML prototypes, design system references, and UI components that need to be integrated into the MSP Growth Hub monorepo using:

- Next.js (in `apps/web`)
- TailwindCSS v4
- shadcn/ui
- Auth0 (for login/auth)
- Supabase (for users/data/content)
- Mux (for video)
- Vercel (for deployment)

---

## 🧠 Goal

Convert these static HTML prototypes into scalable, modular React components that match the existing infrastructure and visual design. Use the Tailwind design tokens where applicable and maintain consistency with existing layout primitives.

---

## 🔨 Tasks for the LLM Assistant

1. Convert the HTML pages into React/TSX components using Tailwind + shadcn/ui.
2. Organize components into folders like `components/ui/`, `components/admin/`, `components/playbooks/` for reuse.
3. Integrate all components with existing layout wrappers and theme providers.
4. Incorporate Auth0 context where login/auth is required.
5. Wire up Supabase for dynamic content in member/account/admin views.
6. Ensure GDPR compliance:
   - `Request My Data` (trigger export route)
   - `Delete My Account` (trigger Supabase or API deletion)
7. Build Storybook entries for visual testing if possible.

---

## 🧾 Files Expected

All relevant frontend components and markdown guides.
