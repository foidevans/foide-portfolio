# Foide Evans — Frontend Portfolio

> An immersive, scroll-driven developer portfolio built with SvelteKit. Not just a page — an experience.

**Live URL:** [foide.dev](https://foide.dev)
**GitHub:** [github.com/foidevans/foide-portfolio](https://github.com/foidevans/foide-portfolio) 

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/foidevans/foide-portfolio.git
cd foide-portfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build & Preview

```bash
npm run build
npm run preview
```

### Type Checking

```bash
npm run check
```

### Deployment

The project uses `@sveltejs/adapter-auto` which automatically detects and adapts for Vercel, Netlify, or Cloudflare Pages. Push to your connected Git repo and it deploys automatically.

To deploy manually to Vercel:

```bash
npx vercel
```

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| SvelteKit | ^2.57.0 | Framework & routing |
| Svelte | ^5.55.2 | UI components (Svelte 5 runes) |
| TypeScript | ^6.0.2 | Type safety |
| TailwindCSS | ^4.3.0 | Utility styling |
| Three.js | ^0.184.0 | 3D/WebGL elements |
| Vite | ^8.0.7 | Build tool |

---

## Architecture

```
foide-portfolio/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Hero.svelte          # Landing section with parallax circles
│   │   │   ├── About.svelte         # Scroll-over parallax + glassmorphism
│   │   │   ├── Projects.svelte      # Project showcase with staggered cards
│   │   │   ├── Skills.svelte        # Tech stack display
│   │   │   ├── Contact.svelte       # Contact form with validation
│   │   │   └── Nav.svelte           # Sticky navigation
│   │   └── utils/
│   │       └── reveal.ts            # Reusable IntersectionObserver action
│   ├── routes/
│   │   └── +page.svelte             # Main single-page layout
│   └── app.css                      # Global styles, CSS custom properties
├── static/
│   └── Favour_Evans_CV.pdf          # Downloadable resume
├── package.json
└── vite.config.ts
```

### Component Architecture

Each section is an isolated Svelte component with its own scoped styles, animations, and scroll logic. Global design tokens (colors, typography, spacing) live in `app.css` as CSS custom properties (`--purple`, `--bg`, `--black`, etc.), keeping theming consistent without a runtime overhead.

State is managed entirely with **Svelte 5 runes** (`$state`, `$derived`, `$effect`) — no external state library needed. Scroll-driven interactions use native `IntersectionObserver` and `scroll` event listeners attached in `onMount` and cleaned up on destroy, preventing memory leaks.

---

## Animation Decisions

### Hero — Drop-bounce circles
The decorative circles drop from `translateY(-130vh)` to their final position using `cubic-bezier(0.34, 1.56, 0.64, 1)`. This bezier overshoots slightly past the destination before snapping back, producing a physical bounce feel without any animation library. Each circle has a staggered `animation-delay` (0ms to 350ms) so they cascade in rather than all landing at once. Parallax on mousemove is gated behind a `parallaxReady` flag that activates only after the last circle has settled (1600ms), preventing the two transforms from fighting.

### Hero content — Staggered fadeUp
Name, description, CTAs, and social links each animate with `fadeUp` (`translateY(24px) → 0` + `opacity: 0 → 1`) at increasing delays. This creates a reading rhythm — the eye is guided naturally down the page.

### About — Scroll-over parallax
The About section uses `border-radius: 28px 28px 0 0`, `margin-top: -28px`, and a `box-shadow: 0 -8px 40px` to visually "card" over the Projects section as the user scrolls. A passive scroll listener computes how far past the section top the user has scrolled and applies a proportional `translateY` offset, making the section rise slightly faster than the scroll — a depth illusion with zero library overhead.

### About — Word tumble
The heading words animate in with `translateY(40px) rotate(-3deg) → translateY(0) rotate(0)` using an overshoot bezier. The slight rotation on entry feels handmade rather than generated.

### Glassmorphism card — Shimmer sweep
A pseudo-element with a diagonal `linear-gradient` sweeps across the glass card on a 5-second `animation` loop, simulating a light reflection shifting across frosted glass.

### Project cards — Staggered scroll reveal
Cards animate in with `translateY(40px) → 0` + `opacity: 0 → 1` using a reusable `use:reveal` Svelte action that wraps `IntersectionObserver`. Each card gets a delay proportional to its index, creating a left-to-right cascade.

### Cinematic scroll storytelling
Sections are designed as sequential "scenes" — each with a distinct background, color palette, and entrance behavior. The About section physically layers over Projects (z-index + negative margin), reinforcing the narrative progression. A fixed scroll-progress indicator on the side tracks position across scenes.

---

## Performance Optimization

- **No animation library** — all animations use native CSS `@keyframes`, `transition`, and `transform`. Zero JS animation overhead.
- **`will-change: transform`** applied only to elements with active parallax, hinting the browser to promote them to their own compositor layer.
- **Passive scroll listeners** (`{ passive: true }`) on all scroll handlers — never blocks the main thread.
- **`requestAnimationFrame`** used for the canvas bubble animation loop, tied to the display refresh rate.
- **`IntersectionObserver`** for all scroll reveals — no scroll polling, no layout thrashing.
- **Canvas bubble system** reuses a single `<canvas>` element rather than DOM nodes per bubble.
- **Assets lazy-loaded** — project images use native `loading="lazy"`.
- **`adapter-auto`** with SvelteKit produces route-level code splitting automatically — each route is a separate chunk.
- **TailwindCSS v4** with Vite plugin purges unused classes at build time.

---

## Accessibility Considerations

- All sections have `aria-labelledby` pointing to their heading.
- Decorative elements (circles, canvas, orbs) carry `aria-hidden="true"`.
- Social links and icon-only buttons include descriptive `aria-label` attributes.
- Stats lists use `role="list"` / `role="listitem"` for screen reader enumeration.
- Resume link uses `download="Favour_Evans_Resume.pdf"` for a clean filename on download.
- Focus states preserved on all interactive elements — no `outline: none` without a replacement.
- Semantic HTML throughout: `<section>`, `<nav>`, `<h1>`–`<h2>`, `<ul>`, `<strong>`, `<em>`.
- Contact form includes proper `<label>` associations and validation feedback.
- Animations respect `prefers-reduced-motion` — wrapped in `@media (prefers-reduced-motion: reduce)` to disable transitions for users who prefer it.

---

## Trade-offs

| Decision | Trade-off |
|---|---|
| **No GSAP/Motion One** | Keeps bundle lean (~0kb animation overhead) but limits complex timeline sequencing. Native CSS covers 95% of needs here. |
| **Single-page layout** | Simpler scroll storytelling and no route transition flicker, but all components load upfront. Mitigated by lazy-loading heavy assets. |
| **Canvas for bubbles** | More performant than DOM nodes at scale, but requires manual resize handling and loses accessibility context (acceptable since purely decorative). |
| **Svelte 5 runes** | Cleaner reactivity model, but `$state`/`$derived` syntax is newer — some tooling (older Svelte plugins) may lag behind. |
| **TailwindCSS v4** | Faster build times and better defaults, but the v4 API differs from v3 — some community resources reference outdated syntax. |
| **`adapter-auto`** | Zero-config deployment to major platforms, but slightly less control than a platform-specific adapter if fine-tuning edge cases. |
| **Three.js in dependencies** | Full 3D capability available, but adds ~600kb to the bundle. Tree-shaking and dynamic imports used to minimize impact on initial load. |

---

## Contact

**Favour Evans (Foide)**  
Frontend Engineer — Port Harcourt, Nigeria

- GitHub: [github.com/foidevans](https://github.com/foidevans)
- LinkedIn: [linkedin.com/in/favour-evans](https://linkedin.com/in/favour-evans)
- Twitter: [@foidevans](https://twitter.com/foidevans)