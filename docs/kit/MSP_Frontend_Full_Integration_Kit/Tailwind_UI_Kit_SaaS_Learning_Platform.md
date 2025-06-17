
# 🧩 Tailwind CSS UI Kit – MSP Growth Hub Platform

This design system governs all public-facing and admin-facing experiences for the MSP Growth Hub. It ensures consistency, responsiveness, and efficiency across all user journeys — from signed-in members to admin users.

---

## 🎨 Theme Tokens

### Colors
- `primary`: #0041C2
- `accent`: #FF4D4F
- Grayscale: #F9FAFB → #111827
- Admin highlights: blue-50, blue-600, red-500, green-600

### Typography
- H1: 36–48px, bold
- H2: 28–32px, semibold
- Body: 16px, Caption: 14px

---

## 🧱 Layout Grid

### Front-End Pages
- Full-width sections with max-width containers (`max-w-6xl`)
- Mobile-first grid layout (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`)

### Admin Panel
- 3-part layout:
  - `aside` (Sidebar)
  - `header` (Top Nav)
  - `main` (Dashboard/Module Panel)

---

## 🧭 Navigation Components

### Public Sticky Top Nav
```html
<header class="sticky top-0 bg-white shadow flex justify-between px-4 py-2">
  <div class="font-bold text-primary">MSP Growth Hub</div>
  <nav class="space-x-4 text-sm">Sales, Marketing, etc.</nav>
</header>
```

### Admin Sidebar
```html
<aside class="w-64 bg-white border-r shadow-md">
  <nav class="text-sm space-y-2">Dashboard, Videos, Audio, Docs, Members, Roles, Logs</nav>
</aside>
```

---

## 📦 Component Library

### Buttons
```html
<button class="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700">Primary</button>
```

### Cards
```html
<div class="bg-white shadow rounded-lg p-4">
  <h3 class="font-semibold text-lg">Title</h3>
  <p class="text-sm text-gray-600">Subtitle</p>
</div>
```

### Video/Audio Upload Zones
```html
<div class="border-2 border-dashed border-gray-300 rounded p-6 text-center bg-gray-50">
  Drag & drop your file here
</div>
```

---

## 📊 Dashboard & Analytics

### Metrics Summary Grid
- Responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`)
- Each card shows KPIs like Active Users, Video Views, Completion %

### Placeholder Charts
```html
<div class="bg-white rounded p-6 shadow">
  [Chart Placeholder for Recharts.js or Chart.js]
</div>
```

---

## 🔐 Roles & Admin Members

- Admin Members only (not end-user members)
- Roles: Owner, Admin, Editor, Viewer
- Editable dropdown inside table row

---

## 🧾 Tables & Logs

- All tables use `min-w-full`, `text-sm`, `text-left`, with zebra-striping or card view on mobile
- Activity Logs use color-coded left borders and timestamps

---

## 🗂 Tabs (Lesson Viewer)

```html
<ul class="flex border-b text-sm font-medium text-gray-600">
  <li><a class="px-4 py-2 border-b-2 border-blue-600 text-blue-600">Overview</a></li>
  <li><a class="px-4 py-2 hover:text-blue-600">Attachments</a></li>
  <li><a class="px-4 py-2 hover:text-blue-600">Comments</a></li>
</ul>
```

---

## 📱 Responsive Breakpoints

| Device  | Prefix | Width        |
|---------|--------|--------------|
| Mobile  | sm:    | ≤ 767px      |
| Tablet  | md:    | 768–1023px   |
| Desktop | lg:    | ≥ 1024px     |

---

## ✅ Best Practices

- All admin pages follow reusable layout structure (sidebar + topbar)
- Public pages maintain consistency across hero, cards, tabbed content
- Utility-first: Tailwind used directly; no component framework overrides
- Color cues are consistent: action = blue, warning = red, system = gray

---

Let this guide serve as your single source of truth for visual and layout consistency across the MSP Growth Hub.
