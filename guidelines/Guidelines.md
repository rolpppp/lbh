# NephroBook — Design System Guidelines

## Project Overview

NephroBook is a dialysis appointment and booking platform. The design prioritizes booking speed and patient clarity above all else.

## Aesthetic Stance: Swiss / International Typographic Style

Clean grid. Precise alignment. Function declares the aesthetic. One accent color. No decorative gradient, no drop shadows, no stock imagery. Trust is built through typographic clarity and whitespace, not visual ornamentation.

---

## Typography

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| Display / Heading | Plus Jakarta Sans | 600–800 | All `h1`–`h4`, step labels, section headers, button labels |
| Body | Inter | 400–600 | All body text, form fields, descriptions, captions |

### CSS classes
- `font-display` — `Plus Jakarta Sans` (registered via `@theme` in `index.css`)
- `font-sans` (default) — `Inter`

### Scale (approximate)
- Page headline: `text-4xl sm:text-5xl`
- Section heading: `text-xl` – `text-2xl`
- Card heading: `text-base` – `text-lg`
- Body: `text-sm` (14px)
- Caption / label: `text-xs` (12px)

---

## Color Tokens

### Brand (Teal)

| Token | Value | Class |
|-------|-------|-------|
| brand-50 | `#f0fdfc` | `bg-brand-50`, `text-brand-50` |
| brand-100 | `#ccfbf6` | `bg-brand-100` |
| brand-600 | `#0d9488` | `text-brand-600` |
| brand-700 | `#0f766e` | **Primary action color** |
| brand-800 | `#115e59` | Primary hover |
| brand-900 | `#134e4a` | Dark variant |

### Semantic

| Purpose | Class |
|---------|-------|
| Page background | `bg-white` |
| Surface / card | `bg-slate-50` |
| Primary text | `text-slate-900` |
| Secondary text | `text-slate-600` |
| Caption / label | `text-slate-400` – `text-slate-500` |
| Border | `border-slate-200` |
| Success | `text-emerald-600`, `bg-emerald-50` |
| Warning | `text-amber-600`, `bg-amber-50` |
| Error | `text-red-600`, `border-red-400` |
| Info | `text-brand-700`, `bg-brand-50` |

---

## Spacing

All spacing follows Tailwind's 4px base scale. Key values:
- Section padding: `py-10` – `py-12`
- Card padding: `p-5` – `p-6`
- Form gap: `gap-4`
- Small stack: `gap-1.5` – `gap-2`

---

## Border Radius

- Cards: `rounded-xl` (12px)
- Buttons: `rounded-lg` (8px)
- Inputs: `rounded-lg` (8px)
- Badges: `rounded-full`
- Small elements: `rounded-md` (6px)

---

## Components

### Primary Button
```tsx
<button className="px-4 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-semibold font-display rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2">
  Label
</button>
```

### Outlined Button
```tsx
<button className="px-4 py-2.5 border-2 border-brand-700 text-brand-700 hover:bg-brand-50 font-semibold font-display rounded-lg transition-colors">
  Label
</button>
```

### Form Input
```tsx
<input className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-transparent" />
```

### Availability Badges

- **Available**: `bg-emerald-50 text-emerald-700 border-emerald-200`
- **Limited**: `bg-amber-50 text-amber-700 border-amber-200`
- **Full**: `bg-slate-100 text-slate-500`

Always pair the colored dot with a text label — never use color alone to indicate status.

---

## Layout

- Max content width: `max-w-6xl` (most pages), `max-w-3xl` (form/detail pages)
- Always centered: `mx-auto px-4 sm:px-6`
- Booking page two-column: `lg:grid lg:grid-cols-[1fr_320px] lg:gap-8`
- Sidebar sticky: `lg:sticky lg:top-24`

---

## Booking Flow

Steps: **Session → Patient → Review → Confirmed**

The `StepIndicator` component lives in `BookingPage.tsx`. It shows numbered circles with line connectors. Completed steps show a checkmark. Active step has a ring.

---

## Accessibility Standards

- All interactive elements have `focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700`
- Status is never communicated by color alone (always paired with text or icon)
- Form fields use explicit `<label>` with `for`/`htmlFor`
- Error messages use `role="alert"` and `aria-invalid`
- Expandable sections use `aria-expanded`
- Screen reader only text via `sr-only` where needed
- Color contrast: body text on white meets AA (slate-900 on white ≈ 16.75:1)

---

## Brand Configuration

To white-label for a different center, update `src/config/data.ts`:

```ts
export const brand = {
  name: "YourCenterName",
  tagline: "Your tagline.",
  phone: "+63 ...",
  email: "...",
};

export const centers = [ ... ];
export const sessionTypes = [ ... ];
```

The visual design system remains unchanged. Only `brand` and `centers` data drives the identity.
