# Portfolio Design System

## Direction & Feel

**Domain:** Frontend developer portfolio — código, terminal, craftmanship, precisión, documentación técnica.

**Intent:** Profesional pero accesible. Técnico sin ser frío. Cada elemento tiene propósito.

**Signature:** Cursor parpadeante `_` en verde terminal. Aparece en el logo y puede usarse como elemento decorativo en otros componentes.

## Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--bg-base` | white | slate-950 | Page background |
| `--bg-elevated` | white/80 | slate-950/80 | Header on scroll, cards |
| `--text-primary` | slate-900 | white | Headlines, important text |
| `--text-secondary` | slate-600 | slate-400 | Body text, nav links |
| `--accent` | emerald-500 | emerald-500 | CTAs, active states, cursor |
| `--accent-hover` | emerald-600 | emerald-600 | Button hover |
| `--border` | slate-200/50 | slate-800/50 | Subtle separators |

**Why emerald:** Evokes terminal green, success states, and code editors. Distinct from generic blue.

## Depth Strategy

**Approach:** Borders only + backdrop blur for elevation.

- No drop shadows on cards
- Borders at very low opacity (50%)
- Backdrop blur for floating elements (header on scroll, mobile menu)
- Glass effect: `bg-white/80 backdrop-blur-md` (light) / `bg-slate-950/80 backdrop-blur-md` (dark)

## Typography

| Element | Font | Weight | Size | Tracking |
|---------|------|--------|------|----------|
| Logo | `font-mono` | 600 | lg (1.125rem) | normal |
| Nav links | system sans | 500 | sm (0.875rem) | normal |
| Headlines | system sans | 600-700 | varies | tight |
| Body | system sans | 400 | base | normal |

**Why monospace for logo only:** Creates intentional contrast. The logo lives in "code world", the rest is readable prose.

## Spacing

**Base unit:** 4px (Tailwind default)

| Context | Value |
|---------|-------|
| Micro (icon gaps) | 2px (gap-0.5) |
| Component (buttons, inputs) | 8-16px (px-4 py-2) |
| Section | 24-32px (py-6, py-8) |
| Major | 48-64px (py-12, py-16) |

## Component Patterns

### Header
- Fixed position, transparent by default
- Glass effect on scroll (bg + blur + border-b)
- Logo: monospace + animated cursor
- Nav: text links with underline indicator on active
- CTA: filled button, separated with margin
- Mobile: hamburger → full-width dropdown with glass bg

```css
/* Cursor animation */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.cursor {
  animation: blink 1s step-end infinite;
}
```

### Footer
- Top border for separation (same as header on scroll)
- Same max-width and padding as header
- Two-row layout: main content + bottom bar
- Logo with cursor (signature consistency)
- Tagline in text-slate-500
- Social icons with hover background effect
- Copyright + "Built with" text in bottom bar

```html
<!-- Social icon button pattern -->
<a class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white">
  <svg class="size-5">...</svg>
</a>
```

### Buttons

**Primary (CTA):**
```
bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-4 py-2 text-sm font-medium
```

**Ghost/Secondary:**
```
text-slate-600 hover:text-slate-900 hover:bg-slate-100
dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800
```

### Links (in nav)
```
text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white
```

Active state: `text-slate-900 dark:text-white` + emerald underline

## Layout

- Max width: `max-w-5xl` (64rem / 1024px)
- Horizontal padding: `px-6 lg:px-8`
- Header height: `h-16` (64px)

## Transitions

- Duration: 200-300ms
- Easing: default (ease)
- Properties: colors, transform, opacity

```
transition-colors
transition-all duration-300
transition-transform duration-200
```

## Dark Mode

- Uses Tailwind's `dark:` variant
- Surfaces get darker (slate-950)
- Text inverts (white primary, slate-400 secondary)
- Accent stays the same (emerald-500)
- Borders stay same opacity, just darker hue

## Page Sections

### Section Header (Reusable)
```html
<app-section-header
  tag="// Proyectos"
  title="Trabajo Destacado"
  subtitle="Optional description text"
/>
```
- Tag: monospace, emerald-500, small
- Title: text-3xl/4xl, font-bold, tracking-tight
- Subtitle: text-lg, text-secondary, max-w-2xl centered

### Section Spacing
- Full sections: `py-24`
- Alternating backgrounds: `bg-slate-50/50 dark:bg-slate-900/50` with `border-y`
- Container: `mx-auto max-w-5xl px-6 lg:px-8`

### Project Card
- Border-only depth (no shadows)
- Image with hover scale effect
- Optional metrics badge (emerald pill)
- Tags in monospace, slate background
- "Ver caso de estudio" link with arrow

### Testimonial Card
- Quote text in slate-600
- Author with avatar, name, role, company
- Same border treatment as other cards

### Blog Card
- Meta line: date + read time with dot separator
- Title with hover color change to emerald
- Excerpt + "Leer más" link

### Service Card
- Icon in emerald container (bg-emerald-500/10)
- Title + short description
- Same border/bg treatment

## Signature Elements

The cursor `_` appears in:
1. Header logo
2. Footer logo
3. Hero greeting (`> Hola, soy`)
4. Section tags (`// Proyectos`)

This creates visual rhythm and reinforces the "developer" identity throughout.
