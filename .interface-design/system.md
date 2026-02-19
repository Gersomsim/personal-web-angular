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

## Markdown Renderer (`app-markdown`)

Componente para renderizar artículos del blog escritos en Markdown. Scoped a `.md-prose` con `ViewEncapsulation.None`.

### Typography
- `text-base leading-[1.85]` — generous line height for reading comfort
- `text-slate-700 dark:text-slate-300` — secondary text tone (not primary, not muted)
- Paragraphs: `mb-6`

### Headings
- H2 signature: `::before` emerald accent bar (`h-px w-6 bg-emerald-500`) above heading — same visual language as section `// tags`
- All headings get `id` slugs (NFD normalized) for TOC anchoring
- H1: `text-3xl font-bold tracking-tight`, H2: `text-2xl`, H3: `text-xl`

### Code blocks (terminal style)
```html
<div class="md-code-block">
  <div class="md-code-header">
    <span class="md-code-lang">typescript</span>
    <button class="md-code-copy" data-index="0">Copiar</button>
  </div>
  <pre><code>...</code></pre>
</div>
```
- Header: `bg-slate-100 dark:bg-slate-800/80` with border-b
- Body: `bg-slate-900` — dark terminal regardless of theme
- Lang label: `font-mono text-xs font-medium text-slate-500`
- Copy button: event delegation via `(click)` on `.md-prose`, `data-index` → `codeBlocks[]` array

### Inline code
`bg-emerald-500/8 text-emerald-700 dark:text-emerald-400` — terminal green on subtle emerald wash

### Lists
- Unordered: custom `▸` bullet in `text-emerald-500` (no disc)
- Ordered: `counter(decimal-leading-zero)` in emerald monospace

### Blockquote
`border-l-4 border-emerald-400 pl-5 italic` — matches editor preview

### HR
`::before { content: '· · ·' }` in `font-mono text-slate-300` — avoids generic horizontal line

### Tables
`font-mono text-[10px] uppercase tracking-widest` headers — matches `// tag` pattern

## Category Card (Hero Context)

Used as a page-level hero heading in filtered views (e.g., PostsFilter).

- Title: `text-4xl/5xl font-bold tracking-tight` — same as page headings
- Post count: emerald pill with dot indicator `bg-emerald-500/10 font-mono text-xs`
- Description: `text-lg text-secondary max-w-2xl mx-auto`
- Not a bordered card — inline hero content within `text-center` containers
- Conditional rendering with `@if` for optional fields

```html
<!-- Count badge pattern -->
<span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
  <span class="size-1.5 rounded-full bg-emerald-500"></span>
  {{ count }} posts
</span>
```

## Project Detail (Case Study Page)

Full case study layout for `/portfolio/:slug`. Sections flow vertically with alternating backgrounds.

### Model Extensions
```typescript
solution?: string
features?: string[]
challenges?: { title: string; solution: string }[]
results?: { label: string; value: string; description?: string }[]
techStack?: { category: string; items: string[] }[]
gallery?: string[]
duration?: string
team?: string
learnings?: string[]
```

### Page Sections (in order)
1. **Header** — breadcrumb `portfolio / slug`, meta badges (role, duration, team, metrics), title, subtitle, description, tags, action buttons
2. **Hero Image** — full-width with `border-y`, image in rounded container
3. **Problem & Solution** — two-column grid with `// El problema` / `// La solución` tags
4. **Features** — alternating bg, 2-col grid with emerald dot bullets
5. **Tech Stack** — 4-col grid, each category in a bordered card with `uppercase tracking-widest` label
6. **Challenges** — numbered cards (`size-7 rounded-full bg-slate-100`) with title + solution
7. **Results** — 4-col grid, value in `font-mono text-2xl font-bold text-emerald-500`
8. **Gallery** — alternating bg, 2-col image grid
9. **Learnings** — numbered `01, 02` in mono, bordered cards
10. **CTA** — "¿Tienes un proyecto similar?" + contact/portfolio buttons

### Key patterns
- Breadcrumb: `font-mono text-sm text-slate-500` with `/` separator and hover to emerald
- Meta badges: `rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs` (same as tag pills)
- Section alternation: white → `bg-slate-50/50 dark:bg-slate-900/30` with `border-t`
- All sections use `// tag` pattern in emerald for section labels

## Admin Layout

Panel administrativo con sidebar aside para gestionar contenido. El header público se conserva.

### Structure
```
Header (público, fixed, h-16)
├── Sidebar (fixed, top-16, w-56, border-r)
│   ├── Context bar ("A" badge + "Admin Panel")
│   ├── Nav groups (// contenido, // portfolio)
│   └── Footer ("Ver sitio" link)
└── Main content (flex-1, lg:pl-56)
    ├── Top bar (sticky top-16, h-12, breadcrumb ~/admin)
    └── Page content (p-6 lg:p-8)
```

### Sidebar
- Same background as content — no color fragmentation, border-only separation
- Navigation grouped with `// comment` labels: `font-mono text-[10px] uppercase tracking-widest text-slate-400`
- Nav items compact: `px-2 py-1.5 text-sm` with icon (size-4) + label
- Active state: `bg-slate-100 text-slate-900 dark:bg-slate-800/80 dark:text-white`
- Hover: `hover:bg-slate-50 dark:hover:bg-slate-800/50`
- Icons: inline SVG Heroicons outline, 16px, `shrink-0`

### Top bar
- Sticky below header: `sticky top-16 z-20 h-12`
- Glass effect: `bg-white/80 backdrop-blur-md dark:bg-slate-950/80`
- Breadcrumb: `font-mono text-xs` with emerald `~` prefix
- Mobile hamburger toggle (hidden on `lg:`)

### Responsive
- Desktop: sidebar visible, content `lg:pl-56`
- Mobile: sidebar off-screen (`-translate-x-full`), toggle reveals with overlay (`bg-slate-950/20 backdrop-blur-sm`)
- Overlay click-to-close

### Admin spacing
- Tighter than public site: `p-6 lg:p-8` for content area
- No `py-24` mega sections — admin is dense and functional

### Nav sections
```
// contenido  → Posts, Categorías
// portfolio  → Proyectos, Skills
```
