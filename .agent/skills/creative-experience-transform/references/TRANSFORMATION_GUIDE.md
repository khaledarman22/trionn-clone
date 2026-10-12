# Creative Project Transformation Guide (Awwwards / FWA Standard)

This guide outlines how to transform any ordinary web project into an award-winning creative experience while retaining that project's genuine brand identity and color system.

---

## 1. Preserving and Elevating Brand Colors

When transforming a project, **DO NOT enforce Trionn's black/monochrome theme** unless the project is naturally dark-mode.

### How to adapt color palettes:
1. **Dark/High-Contrast Brands (Luxury, Cyber, Tech, Gaming):**
   - Deep background tones (e.g., `#08090C`, `#0D0E15`, or deep navy).
   - High-contrast text (`#F5F5F7`, `#E1E1E6`).
   - Vivid accent pops (e.g., Electric violet, cyan, emerald green).
2. **Light/Clean Brands (Fintech, SaaS, Healthcare, Editorial):**
   - Warm off-white or paper-like canvas (`#F8F9FA`, `#FAF8F5`).
   - Deep rich typography (`#121316`, `#1A1D20`).
   - Subtle tinted glass surfaces (`rgba(255, 255, 255, 0.7)` with `backdrop-blur`).
   - Primary brand color as the dynamic interactive glow / gradient mesh accent.
3. **Playful/Creative Brands (Agencies, Studios, Fashion):**
   - Section-by-section dynamic theme inversion (e.g., scroll triggers that smoothly transition `body` background color from Light to Deep Brand Primary).

---

## 2. Animation & Motion Choreography

Instead of generic fade-ins, use cinematic motion choreographies:
* **Staggered Character/Word Unrolling:** Split text and slide up from an `overflow: hidden` container.
* **Scroll-Bound Timeline Scrubbing:** Link complex multi-step reveals to the user's scroll position via GSAP `ScrollTrigger` with `scrub: 1`.
* **Sticky Stage Pinning:** Pin a canvas, 3D model, or product card in the center of the screen while text stories slide past in narrative layers.
* **Fluid Velocity Distortion:** Skew or scale cards based on the scroll velocity (`ScrollTrigger.getVelocity()`).

---

## 3. Architecture & Code Structure

Organize the transformed project cleanly:
```
src/
├── app/
│   ├── layout.tsx         # Global fonts, Smooth scroll & PageTransition wrapper
│   └── page.tsx           # Pinned storytelling sections
├── runtime/
│   ├── scroll/            # Lenis Smooth Scroll runtime
│   ├── quality/           # Device power detection
│   └── audio/             # Subtle micro-interaction sounds (optional)
├── components/
│   ├── motion/            # Magnetic, TextReveal, Parallax, Cursor
│   └── ui/                # Refined branded UI components
└── features/
    ├── hero/              # High-impact branded hero stage
    ├── storytelling/      # Pinned interactive narrative sections
    ├── showcase/          # Grid/Carousel with velocity skew
    └── footer/            # Sticky reveal outro
```

---

## 4. Performance & a11y Safeguards
* Always use `useGSAP` from `@gsap/react` to ensure automatic garbage collection and cleanup of timelines and ScrollTriggers.
* Query `window.matchMedia("(prefers-reduced-motion: reduce)")` to disable scroll-jacking and pin spacers when requested by the operating system.
* Use `will-change: transform` sparingly and remove it when animations are complete to save GPU memory.
