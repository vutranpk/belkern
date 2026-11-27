# 🧩 Belkern GmbH — UI Component Directory (`components.md`)
## Reusable Component Directory & Technical Specifications (100% Light Theme)

> **Design System Compliance:** Must strictly adhere to `design.md` light tokens (Colors, Typography, Spacing).  
> **Tech Stack:** HTML5 Semantic Structure + 100% TailwindCSS Utility Classes + Vanilla JavaScript.  
> **Visual Principle:** 100% Crisp Light Theme (Nền sáng sạch, không dùng nền tối).  
> **Languages:** English (`EN`) & German (`DE`).  
> **Mobile-First Strategy:** All components default to mobile layout and switch to multi-column desktop at `lg:` (1024px).

---

## 0. Global Modular Asset Architecture (Shared Across Project)

To ensure strict DRY and high maintainability, all `<style>` and `<script>` blocks have been decoupled into dedicated external assets:

| Asset Path | Type | Purpose & Responsibility |
| :--- | :--- | :--- |
| [`css/style.css`](file:///d:/antigravity/Belkern/css/style.css) | Stylesheet | Base smooth scrolling, infinite commodity marquee ticker (`.marquee-track`), and hero floating particle physics (`@keyframes floatParticleSlow`, `.animate-float-slow`). |
| [`js/tailwind-config.js`](file:///d:/antigravity/Belkern/js/tailwind-config.js) | JavaScript Config | Centralized Tailwind CSS configuration declaring brand colors, fonts (`Plus Jakarta Sans` & `JetBrains Mono`), and animation presets. |
| [`js/main.js`](file:///d:/antigravity/Belkern/js/main.js) | Core Vanilla JS | Universal client logic: Lucide Icons bootstrap, dynamic year, full-screen menu takeover, exclusive accordion navigation, header scroll transformation with DM/LM logo swap, interactive RFQ intake, multi-layer 3D parallax engine, and 60fps/120fps hardware-accelerated Inertial Momentum Scroll Engine (`initInertialScroll`, `window.smoothScrollTo`). |

### Standard Inclusion Boilerplate for All HTML Pages
```html
<head>
  <!-- Tailwind CSS & Lucide Icons -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  
  <!-- Shared Tailwind Configuration & Global Stylesheet -->
  <script src="js/tailwind-config.js"></script>
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="...">
  <!-- Page Content -->

  <!-- Shared Core Application Script -->
  <script src="js/main.js"></script>
</body>
```

---

## 1. Global Navigation Components (Comaxx System)

### 1.1. `ComaxxHeader` (Transparent Over Hero · Compact Background on Scroll)
* **File Locations:**
  * **Standalone Live Preview File:** [`header.html`](file:///d:/antigravity/Belkern/header.html) (Mở trực tiếp trên trình duyệt ở thư mục gốc để kiểm tra toàn bộ hiệu ứng scroll, mở menu, responsive).
  * **Component Showcase & Spec File:** [`components/header.html`](file:///d:/antigravity/Belkern/components/header.html) (Trang showcase độc lập trong thư mục components, có đầy đủ CSS/JS/đường dẫn `../` và vùng mô phỏng scroll trực quan).
* **Purpose:** Unified enterprise navigation sitting transparently over the full-screen hero at the top, and smoothly transforming into a compact fixed navigation bar with solid backdrop blur on scroll.
* **Official Dual Brand Logos (Zero-Repaint Strategy):**
  * **Dark Mode Logo (`images/DM-Belkern-2.png`):** Monogram + white typography. Set to height `h-[3.4rem] w-auto object-contain`. Rendered when resting transparently over dark hero at page summit (`scrollY <= 25`), and inside `#fullScreenMenu`.
  * **Light Mode Logo (`images/LM-Belkern-1.png`):** Monogram + dark charcoal typography. Displayed automatically when scrolled down over the solid white compact sticky navbar (`scrollY > 25`), and inside the footer corporate profile.
  * **Zero-Flicker Mechanism:** Both images are preloaded in DOM simultaneously; JavaScript toggles `.block` and `.hidden` on scroll with zero network delay or layout shift.
* **Top State (`scrollY <= 25`):**
  * Sits directly on top of the hero: `fixed top-0 left-0 right-0 z-40 bg-transparent border-b border-transparent transition-all duration-300 relative`.
  * **Ambient Header Scrim (`#headerScrim`):** `<div id="headerScrim" class="absolute inset-0 -z-10 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-transparent transition-opacity duration-500 pointer-events-none"></div>` ensures crisp text contrast over bright photography.
  * Brand Logo: Displays `DM-Belkern-2.png` at height `h-[3.4rem]`.
  * PC Navigation Links: `text-[15px] font-bold text-white/90 hover:text-brand-gold`.
  * Tier 1 (Utility Bar): Fully expanded with Frankfurt Hub coordinates, Incoterms 2020, email, phone, and `EN | DE` language selector.
  * Tier 2 (Main Nav Line): Full height `h-20`.
* **Scrolled State (`scrollY > 25`):**
  * Compact sticky navigation: `bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs`.
  * Scrim overlay fades out (`opacity-0`).
  * Brand Logo: Instant swap to `LM-Belkern-1.png`.
  * Tier 1 (Utility Bar): Smoothly collapses to `max-h-0 opacity-0 overflow-hidden py-0`.
  * Tier 2 (Main Nav Line): Compact height `h-16`.

### 1.2. `FullScreenMenuOverlay` (Comprehensive Full-Screen Overlay Navigation)
* **Purpose:** Full-screen takeover triggered by clicking the 3-line Hamburger button, faithful to the Comaxx reference layout and hierarchical information architecture tree.
* **Structure & Aesthetics:**
  * **Canvas:** `fixed inset-0 z-50 bg-brand-dark text-white overflow-y-auto` with subtle radial atmospheric glow (`bg-gradient-to-br from-brand-gold/[0.05] via-brand-green/[0.08] to-transparent`). Zero distracting watermark symbol for optimal text contrast and Swiss editorial clarity.
  * **Top Bar:** Official Dark Mode Logo `images/DM-Belkern-2.png` on left, refined Close button (`X` with hairline stroke `1.75` and hover rotate effect) on right. Compact vertical padding (`pb-4 sm:pb-5 border-b border-white/[0.08]`).
  * **2-Column Layout (Desktop $\ge 1024\text{px}$):**
    * **Left Column (7 Cols):** Pure English editorial hierarchy with authoritative typography (`text-lg sm:text-xl lg:text-2xl font-bold`), clean dividers (`border-b border-white/[0.07]`), refined mint/gold accents, smooth slide-down accordion animation, and single-open exclusive behavior:
      1. `Home`
      2. `About Us` (About Belkern, International Commodity Trade Network, Legal & Corporate Governance)
      3. `Products` (The 7 Commodities in exact canonical sequence:
         - *Coffee Beans:* Green Coffee Beans — Arabica & Robusta (`product-coffee.html`)
         - *Spices & Sauces:* Black Pepper (`product-pepper.html`), Black Pepper Sauce (`product-pepper-sauce.html`), Cassia Cinnamon (`product-cinnamon.html`), Star Anise (`product-star-anise.html`)
         - *Commodities:* Cashew Kernels (`product-cashews.html`), Desiccated Coconut (`product-coconut.html`)).
      4. `Sustainability & ESG` (Sustainable Pepper Project, ESG Commitments & Carbon Reduction, Ethical Supply Chain)
      5. `Certificates` (International Standards & Accreditations)
      6. `Careers`
      7. `Contact`
    * **Right Column (5 Cols):**
      * Corporate office: Belkern GmbH, Melsunger Straße 15, 60389 Frankfurt am Main, Germany (HRB 99468 Frankfurt, USt-IdNr.: DE 298 174 135).
      * Direct phone (`+49 69 97 76 16 69`), email (`mail@belkern.com`), Incoterms 2020 (`FOB • CIF • CFR`).
      * Prominent CTA button: `Contact Direct Desk` (`h-11 sm:h-12 rounded-xl bg-brand-green` with arrow disc).
      * Language selector (`EN | DE`).
  * **Bottom Bar:** Legal compliance links (`Terms (AGB)`, `Imprint`, `Privacy Policy`) & Copyright 2026.

### 1.3. `ButtonSystem` (Enterprise Architectural Radius Suite)
* **Design Philosophy:** Standardized architectural corner radius (`rounded-xl` = 12px) across all pages. Eliminates tiny `text-xs` (12px) buttons in favor of standard **`text-sm font-bold tracking-wide` (14px)** with strict `font-bold` (700) weight. Icon is **always positioned on the RIGHT** (`<span>Label</span> <icon>`).
* **Design Tokens & Surface Matrix:**
  1. **Primary on Dark Surface (`btn-dark-primary`):**
     * Class: `h-11 sm:h-12 inline-flex items-center justify-center gap-3 pl-5 sm:pl-6 pr-2 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 group shrink-0 active:scale-[0.99] cursor-pointer`
     * Squircle Disc: `<span class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 shadow-2xs shrink-0"><i data-lucide="arrow-right" class="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]"></i></span>`
  2. **Secondary Glass on Dark Surface (`btn-dark-glass`):**
     * Class: `h-11 sm:h-12 inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 rounded-xl border border-white/25 hover:border-white/60 bg-white/10 hover:bg-white/15 backdrop-blur-md text-white font-bold text-sm tracking-wide transition-all duration-200 active:scale-[0.99] cursor-pointer group shrink-0`
     * Icon: Pure white on dark: `<i data-lucide="..." class="w-4 h-4 text-white/80 group-hover:text-white transition-colors"></i>` (No green or gold icons).
  3. **Primary on Light Surface (`btn-light-primary`):**
     * Class: `h-11 sm:h-12 inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white font-bold text-sm tracking-wide shadow-xs hover:shadow-md transition-all duration-200 group shrink-0 active:scale-[0.99] cursor-pointer`
     * Icon: `<i data-lucide="arrow-right" class="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-0.5"></i>`
  4. **Secondary Outline on Light Surface (`btn-light-outline`):**
     * Class: `h-11 sm:h-12 inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 rounded-xl border border-slate-300 hover:border-brand-green bg-white hover:bg-brand-green/5 text-slate-800 hover:text-brand-green font-bold text-sm tracking-wide transition-all duration-200 group shrink-0 active:scale-[0.99] cursor-pointer shadow-2xs hover:shadow-xs`
     * Icon: `<i data-lucide="arrow-right" class="w-4 h-4 text-slate-400 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all"></i>`
  5. **Header Contact CTA (`btn-header-contact`):**
     * Class: `hidden lg:inline-flex h-11 items-center justify-center gap-2.5 pl-5 pr-2 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white font-bold text-sm tracking-wide shadow-xs hover:shadow-md transition-all duration-200 group active:scale-[0.99]`
     * Disc: `<span class="w-7 h-7 rounded-lg bg-white/20 text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5"><i data-lucide="arrow-right" class="w-3.5 h-3.5 stroke-[2]"></i></span>`
     * Secondary action: `rounded-xl border border-slate-300 text-slate-700 hover:border-brand-gold`
* **Scale Matrix:**
  * `btn-lg`: `px-7 py-3.5 rounded-xl text-base`
  * `btn-md`: `px-5 py-2.5 rounded-xl text-sm`
  * `btn-sm`: `px-3.5 py-1.5 rounded-lg text-xs`

---

## 2. Hero & Identity Components

### 2.1. `HeroSection` (Full-Width · 3-Layer PNG Parallax · Subtle Dark Overlay · Delta Style)
* **Purpose:** Expansive full-width hero section modeled after the high-end editorial layout of Delta Cafés, utilizing 3 pluggable PNG image layers for true optical depth, a subtle dark atmospheric overlay (`bg-slate-950/25` + directional gradients) to showcase rich natural imagery without white washing, and high-contrast typography.
* **Canvas & Dimensions:** `min-h-[100dvh] h-[100dvh] flex flex-col justify-between` (header sits transparently on top), full edge-to-edge spanning (`w-full px-5 sm:px-10 lg:px-14 xl:px-20`). The `100dvh` unit guarantees zero overflow on mobile browsers with dynamic URL bars.
* **Height-Aware Laptop Optimization (`@media (min-width: 1024px) and (max-height: 850px)` in `css/style.css`):**
  * Solves cramped viewport issues on standard laptops (1366x768, 1440x900) where low viewport height (~700px-780px) collided with oversized desktop H1 typography.
  * Dynamically throttles H1 font-size to `3.25rem` (52px), reduces top spacer to `4.5rem`, tightens bottom margins, and constrains pillar grid to `max-w-3xl`, recovering > 90px of vertical headroom while preserving spaciousness and maritime route indicator alignment.
* **3 Pluggable Parallax Layers:**
  * **Layer 1 - Far Background (`data-depth="-0.04"`):** Panoramic aerial view of Vietnam Highland river & coffee/pepper plantation landscape (`images/about/bg-hero.webp`).
  * **Layer 2 - Midground (`data-depth="0.10"`):** Real transparent coffee plant branches, green foliage & ripe red coffee cherries framing the viewport (`images/about/layer2.webp`).
  * **Layer 3 - Foreground (`data-depth="0.22"`):** Foliage & subtle ambient golden pollen/coffee micro-particles (`images/hero-layer-3-fore.png`).
* **Atmospheric Contrast Overlay:**
  * Subtle dark atmospheric overlay (`bg-black/25` + directional gradients) delivering crisp typography contrast while preserving rich natural plantation greens.
* **Editorial Copy & CTAs:**
  * **Origin Kicker:** Responsive glassmorphic pill (`bg-white/10 border-white/20 text-white/90`): Mobile displays compact `Direct Vietnam Export` to preserve visual hierarchy; Desktop displays full `B2B Agricultural Commodities · Direct Vietnam Export`.
  * **Headline (H1):** *"Direct Origin.<br>Global Ports."* (`text-[38px] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.04]`, with `from-emerald-400 via-teal-300 to-brand-gold` gradient accent).
  * **Subtitle:** *"Supplying premium green coffee, steam-sterilized pepper, and bulk spices in Full Container Loads (FCL) under German law."* (`text-slate-200 text-xs sm:text-base lg:text-lg`).
  * **Actions:** Standardized `rounded-xl` primary CTA button `Request FCL Quote` + Secondary glass CTA `Explore Commodities →` with `whitespace-nowrap` protection.
* **Docked Full-Width Bottom Bar (Delta Style · Guaranteed First View Across All Devices):**
  * Spans a full-width rule line `w-full border-t border-white/20 pt-3 sm:pt-4 pb-3.5 sm:pb-6 lg:pb-8` featuring:
    1. **4 Synchronized Enterprise Proof-Point Pillars (`grid-cols-2 sm:grid-cols-4 max-w-3xl`):**
       * Strictly unified typography architecture: Gold header (`text-brand-gold/90 text-[11px] sm:text-xs tracking-wider uppercase font-bold`) / High-contrast monospace figures (`text-white font-mono text-base sm:text-lg lg:text-xl font-bold tracking-tight`) / Subtle Slate captions (`text-slate-300 text-[11px] sm:text-xs leading-snug`).
       * **`01 · Scale`**: `10,000+ MT` (Annual Export Volume).
       * **`02 · Origin`**: `100% Vietnam` (Direct Processing Hubs).
       * **`03 · EUDR`**: `EUDR-Ready` with active green radar beacon (`<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>03 · EUDR`) and `whitespace-nowrap` protection (Zero Deforestation Verified).
       * **`04 · Entity`**: `HRB 99468` (Frankfurt am Main Register).
    2. **Right Desktop Route Indicator ($\ge 1024\text{px}$):**
       * `Direct Route: Vietnam Ports → Rotterdam / Hamburg` + `EU Trade Compliance` with pulsating green dot.
* **Motion Physics:** Vanilla JS 60fps requestAnimationFrame lerp interpolation ($0.075$ factor) + CSS `@keyframes floatParticleSlow` & `floatParticleFast`. Disabled on touch devices via `pointer: fine`.

---

## 2.2. `WhoWeAreVideoExpansion` (Scroll-Driven Cinematic Dual Video Specimen: PC 5:2 to 16:9 · Mobile 4:4 to 9:16 · Light Theme)
* **Purpose:** Immersive origin storytelling bridging the dark Hero section and Commodity showcases. Set on a **refined light background (`bg-brand-canvas`)** to establish clean breathing room and crisp contrast before the commodities section.
* **Layout & Structure (`#whoWeAreSection`):**
  * **Viewport Pinning:** Outer container with `min-h-[300vh] sm:min-h-[320vh]` housing a sticky full-screen viewport (`sticky top-0 h-[100dvh] w-full overflow-hidden bg-brand-canvas relative z-20`) with zero static padding.
  * **Absolute Specimen Frame (`#whoWeAreVideoContainer`):** Positioned directly as an absolute layer centered horizontally (`left: 50%; transform: translate(-50%, -50%)`), completely free from nested flexbox constraints, allowing it to expand seamlessly to true $100\% \times 100\text{dvh}$ filling all 4 corners of the viewport.
  * **Dual Dedicated Video Streams:**
    1. **PC / Desktop Video Stream (`#whoWeAreVideoDesktop`):** Visible on `lg:` ($\ge 1024\text{px}$), horizontal landscape 16:9 clip. Starts at a cinematic $5:2$ frame ratio below the editorial header and expands to true 16:9 / $100\% \times 100\text{dvh}$.
    2. **Mobile Video Stream (`#whoWeAreVideoMobile`):** Visible on $< 1024\text{px}$, vertical portrait 9:16 clip. Starts at an elegant $4:4$ (1:1 square) frame ratio nestled below the mobile header and expands to true vertical 9:16 / $100\% \times 100\text{dvh}$ edge-to-edge.
  * **Center-Aligned Editorial Header (`#whoWeAreHeader`):**
    * Pinned at `z-30` as an absolute top layer (`pt-16 sm:pt-18 lg:pt-20 px-4 sm:px-6`).
    * *Kicker Badge:* Minimalist text (`WHO WE ARE`, strict `font-sans`).
    * *Headline:* Concise, authoritative, and evocative (`Where Highland Heritage Meets German Contractual Precision.`, `text-xl sm:text-3xl lg:text-4xl font-black`).
    * *Subtitle:* Captivating B2B narrative: *"Direct from Vietnam's premier plantations to European hub ports. 100% verified physical origin, Full Container Loads, and German contract assurance."* (`max-w-xl text-slate-600 text-xs sm:text-sm lg:text-base`).
    * *CTA Button:* Pinned directly below subtitle: **`Explore Commodities`** (`rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-white font-bold`).
  * **Full-Screen Interactive Control Dock (`#whoWeAreVideoControls` · Unified Vertical Stack with Go-Top):**
    * *Initial Frame:* Completely clean, no floating button in the corner.
    * *Full-Screen Reveal ($P \ge 0.58$):* A minimalist frameless vertical action stack (`flex flex-col items-center gap-2 sm:gap-2.5`) docked along the right edge at **`bottom-[68px] sm:bottom-[78px] right-5 sm:right-6`**.
    * *100% Unified Alignment with Go-Top Button (`#backToTopBtn`):*
      - **Shared Vertical Axis:** Exactly aligned along `right-5 sm:right-6` (20px mobile / 24px desktop) on the exact same vertical center line.
      - **Harmonious Rhythm & Gap:** Positioned at `bottom-[68px]` (60px Go-Top top + 8px gap) on mobile and `sm:bottom-[78px]` (68px Go-Top top + 10px gap) on desktop, creating an identical 8px/10px spacing between all 4 buttons: Play/Pause → Sound → Restart → Go-Top.
      - **Shared Design Identity:** All 4 buttons share the exact same `w-10 h-10 sm:w-11 sm:h-11` dimensions, subtle `rounded-xl` squircle radius, dark glassmorphic finish (`bg-slate-900/70 backdrop-blur-md border border-white/20`), crisp white icons, and `hover:bg-brand-gold active:bg-brand-gold` feedback.
    * *Tactile Action Buttons ($40 \times 40\text{px}$ Mobile, $44 \times 44\text{px}$ Desktop):*
      1. **Play / Pause Button (`#whoWeArePlayPauseBtn`):** Toggles active video playback state with instant Lucide `pause` / `play` icon synchronization.
      2. **Sound Toggle Button (`#whoWeAreSoundBtn`):** Toggles audio state between muted and unmuted with Lucide `volume-x` / `volume-2`.
      3. **Restart Button (`#whoWeAreRestartBtn`):** Resets active video time to start (`currentTime = 0`).
      4. **Go-Top Button (`#backToTopBtn`):** Anchors the base of the column with smooth scroll-to-top execution.
  * **Full-Screen Video Overlay Caption (`#whoWeAreVideoCaption` · Rich Mobile Title & Subtitle):**
    * Docked at `bottom-6 sm:bottom-10 left-4 sm:left-10 right-20 sm:right-28 z-20` (horizontal safety margin `right-20` guarantees text never collides with the vertical right dock).
    * Fades in synchronously with controls at $P \ge 0.58$.
    * Features:
      1. *Eyebrow Badge:* `Direct Origin Transparency` pill with gold pulsating dot (`animate-pulse`).
      2. *Main Title:* `Highland Heritage Meets German Precision.` (`text-base sm:text-xl lg:text-2xl font-black drop-shadow-lg`).
      3. *Subtitle / Route:* `Vietnam Central Highlands • Hai Phong / Cat Lai POL → Hamburg & Rotterdam POD • 100% Polygon Traceable` (`text-[11px] sm:text-sm text-slate-200 font-medium drop-shadow-md`).
  * **Editorial Vertical Scroll Indicator (`#whoWeAreScrollHint`):**
    * Minimalist editorial vertical composition replacing generic chevrons: uppercase `SCROLL` label (`font-sans text-[10px] tracking-[0.28em]`) resting above a slender vertical rule with a golden traveling light pulse (`.animate-scroll-pulse`).
  * **Typography Constraint (Strict):** `font-mono` is strictly restricted to significant numbers/codes (`100%`, `10,000+`, `HRB 99468`), never applied to prose, badges, or labels.
* **Scroll-Expansion Mechanics (`js/main.js`):**
  * `initWhoWeAreScrollExpansion()`:
    * **60fps / 120fps Smooth Lerp Engine:** Uses exponential linear interpolation (`currentProgress += diff * 0.16`) within a `requestAnimationFrame` loop, completely eliminating discrete mouse-wheel notch jumps and stuttering ("không còn giật giật").
    * **Reading Grace Zone ($P \in [0, 0.06]$):** Header remains 100% visible (`opacity: 1`, `translateY(0)`), video remains locked in pristine initial specimen frame ($5:2$ on PC, $4:4$ square on Mobile).
    * **Header Lift & Fade Out ($P \in [0.06, 0.24]$):** Header lifts gently (`translateY: 0 → -35px`) and fades out (`opacity: 1 → 0`). At $P \ge 0.24$, `visibility: hidden` clears the header completely before the video expands wide.
    * **Expansion Phase ($P \in [0.08, 0.56]$):** Container dynamically expands from initial frame ($5:2$ on PC, $4:4$ on Mobile) to true $100\% \times 100\text{dvh}$ with power-1.25 ease curve, rounding down borders and shadows to 0.
    * **Full-Screen Dwell Phase ($P \in [0.56, 1.0]$):** Video remains **100% full screen** across ~44% of the scroll journey, giving the user ample time to experience the video in full view before the section naturally unpins and scrolls smoothly into `#commodities`. Both vertical controls and mobile title/subtitle fade in seamlessly at $P \ge 0.58$.

---

## 3. Commodity & Product Components

### 3.1. `CommodityHorizontalShowcase` & `CommodityShowcaseCard` (Full-Width Horizontal Specimen Showcase)
* **Design Philosophy:** Dynamic full-width horizontal specimen row. Employs a **peek ratio strategy** across breakpoints, affording tactile horizontal exploration while keeping 70% of each specimen photograph crystal-clear, minimal, and unobstructed without floating overlay buttons or cluttered filter chips.
* **Layout Architecture & Split Header (`index.html`):**
  * **Unified Section Header Pattern (Standardized Across Homepage & Product Pages):**
    * *Layout Grid:* `grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start mb-8 sm:mb-10 lg:mb-12` (Divided equally into 2 columns on desktop).
    * *Left Column:* Eyebrow kicker (`text-xs sm:text-sm font-bold uppercase tracking-[0.18em] mb-2 sm:mb-2.5`) resting directly above the primary H2 Title (`text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark tracking-tight leading-[1.1]`). No preceding decorative squares.
    * *Right Column:* Concise authoritative subtitle text paired directly with dual action CTA buttons (`[View All Products / Request FCL Quotation]` or `[Request FCL Quotation / Technical Parameters]`). Aligned horizontally with the top edge of the H2 title using `lg:pt-[30px]` (equivalent to kicker text height 20px + margin 10px).
    * *Main Content Below:* Full-width specimen slider track (`#commodityScrollTrack`), interactive certifications track, or edge-to-edge photography panorama positioned directly underneath.
    * *Zero Arbitrary Metric Clutter:* Complete elimination of 4-metric right-hand boxes across the site in favor of spacious Swiss editorial hierarchy.
  * **Full-Width Specimen Track (`#commodityScrollTrack`):**
    * Native smooth horizontal scrolling: `flex gap-5 sm:gap-6 overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch] scroll-smooth`.
    * Left and right edge fade masks on desktop: `w-12 bg-gradient-to-r/l from-white to-transparent pointer-events-none`.
* **Multi-Device Responsive Peek Ratios:**
  * **Mobile (< 640px):** **Phương án B (Xem đồng thời 2 Card — Dual-Card Glance ~2.15 Cards)**: `w-[42vw] max-w-[175px] min-w-[145px] shrink-0 h-[270px] gap-3 px-4` -> Hiển thị trọn vẹn **2 card đồng thời** kèm **~15% phần hé lộ (peek) của Card thứ 3** ở mép phải màn hình (tối ưu hoàn hảo cho các màn hình mobile 375px - 430px như iPhone SE/13/14/15/16). Bố cục typography: `h3` cỡ `text-sm font-bold`, subtitle `text-[10px]`, các nút `TDS` và mũi tên điều hướng bố trí theo hàng riêng phía dưới chữ (`justify-start pt-0.5`), gradient scrim `from-black/90 via-black/40 to-transparent` bảo vệ độ tương phản chữ trắng tuyệt đối trên nền ảnh thực tế.
  * **Tablet (640px – 1024px):** `sm:w-[300px] md:w-[320px] shrink-0 h-[440px] gap-6 px-10` -> Hiển thị **~2.25 cards** với khoảng cách cân đối, các nút bấm chuyển thành hàng ngang bên cạnh tiêu đề (`sm:flex-row sm:items-end justify-between`).
  * **Desktop (≥ 1024px):** `lg:w-[340px] xl:w-[360px] shrink-0 h-[480px] xl:h-[500px] gap-6 px-14 xl:px-20` -> Hiển thị **~3.5 cards**, với vạch cắt ở mép phải kích thích hành vi cuộn ngang và hệ thống fade mask mượt mà.
* **Specimen Card Anatomy (`CommodityShowcaseCard` · `.commodity-showcase-card`):**
  * Container: `group relative shrink-0 rounded-xl sm:rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-700 ease-out border border-slate-200/90 hover:border-brand-gold/70 select-none`.
  * Background Photo: Official high-resolution origin product photography (`images/product/*.jpg`) with `loading="lazy"`, `group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none select-none`.
  * Top Floating Metadata Badges (`absolute top-2.5 inset-x-2.5 sm:top-4 sm:inset-x-4 z-10 flex items-center justify-between gap-1.5 pointer-events-none`):
    * Left: Primary compliance / grade badge (`bg-brand-green/90 text-white font-bold text-[9px] sm:text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg`).
    * Right: Physical benchmark chip (`hidden sm:inline-flex bg-black/50 text-brand-gold font-semibold text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md sm:rounded-lg`).
  * Bottom Docked Scrim (`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none`):
    * 100% authentic origin product photography without artificial muddy tint. Neutral gradient protects typography contrast at bottom half.
    * Product Title & Subtitle: High-contrast white typography (`text-sm sm:text-xl font-bold text-white group-hover:text-brand-gold transition-colors duration-200 tracking-tight leading-snug drop-shadow-md`). Subtitle `text-[10px] sm:text-xs font-sans font-medium text-slate-300 mt-0.5 sm:mt-1 leading-snug line-clamp-1 sm:line-clamp-none`.
    * Dual Action Controls: Drops down to its own dedicated left-aligned row below text on mobile (`flex items-center justify-start sm:justify-start gap-1.5 shrink-0 pt-0.5 sm:pt-0`), liberating 100% horizontal breathing room for text; sits side-by-side on tablet/desktop. Includes 1-click TDS spec modal trigger button (`h-7 sm:h-auto px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/15 hover:bg-brand-gold` with visible `TDS` label) + direct product link arrow disc (`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-white/15 hover:bg-brand-gold`).
* **The 9 Canonical Commodity Products:**
  * **Coffee:**
    1. *Arabica:* Specialty & Commercial · `SCA 82+` · Cau Dat Origin.
    2. *Robusta:* Screen 18/16 Wet Polished · `EUDR-Ready` · Dak Lak Origin.
  * **Pepper & Spices:**
    3. *Black Pepper & White Pepper:* Steam Sterilized · Cleaned · `HTST Sterilized`.
    4. *Chili:* Whole Dried & Flakes · `≥60,000 SHU`.
    5. *Star Anise:* Whole Autumn Crop · `Autumn Crop` · Lang Son Origin.
    6. *Turmeric:* Curcumin Content ≥5% · `Curcumin ≥5%`.
    7. *Cassia Cinnamon:* Split & Tube Export Grade · `Oil ≥3.5%` · Yen Bai Origin.
  * **Agricultural Commodities:**
    8. *Cashew Kernels:* WW240 / WW320 Vacuum · `AFI Standard`.
    9. *Desiccated Coconut:* High Fat · Fine & Medium · `High Fat`.
* **Bottom Controls & Exploration Affordance (Synchronized with Section 7):**
  * Quick Navigation Buttons: Twin bottom buttons (`#commodityBottomPrevBtn`, `#commodityBottomNextBtn`) with full 44x44px touch targets (`w-11 h-11 sm:w-12 sm:h-12 rounded-xl`) positioned on the left.
  * Interactive Gold Progress Bar (`#commodityProgressBar`): Dynamically reflects scroll percentage across the track, positioned on the right with `CATALOG` uppercase label. Primary CTA buttons are centralized in the top header.
  * Ultra-Smooth Dynamic Edge Fade Masks (`#commodityFadeLeft`, `#commodityFadeRight`): Feather-light edge gradient (`from-white via-white/15 to-transparent`, `w-12 lg:w-16`) with dynamic auto-hide at boundaries (`opacity-0` at track start/end) to eliminate milky haze over cards.
* **Interactive Engine (`js/main.js`):**
  * `initCommodityTrack()`:
    * Manages real-time scroll listener computing track percentage, updating `#commodityProgressBar`, dynamic edge masks opacity, and disabling/fading buttons at start/end.
    * **Interactive Mouse Drag-to-Scroll:** Captures `mousedown`, `mousemove`, and `mouseup` to enable tactile gliding across cards with responsive velocity multiplier and `cursor-grabbing` state.
    * **Anti-Ghost Image Drag:** Neutralizes native HTML5 drag-and-drop ghosting via `dragstart` preventDefault, `draggable="false"`, and `pointer-events-none select-none` on all specimen images.
    * **Anti-Stick Release Guard:** Dynamically validates hardware mouse button state (`(e.buttons & 1) !== 1`) during `mousemove` and binds release listeners across `mouseup`, `blur`, and `dragend` to ensure the slider unconditionally releases upon click release.
    * **Click-Guard:** Suppresses accidental link clicks if mouse movement exceeds 5px during drag.
  * `scrollCommodityTrack(direction)`: Handles 1-card increment left/right stepping tied to bottom navigation buttons.
  * `initCommodityStaggerReveal()`: Uses `IntersectionObserver` to trigger a staggered fade-in entrance (`opacity-0 translate-y-8` -> `opacity-100 translate-y-0`) with a 100ms delay per card as the showcase enters viewport.

### 3.3. `CommodityPortfolioGrid` (Full-Card Clickable Portfolio Grid · `products.html`)
* **Purpose:** Responsive 3-column specimen grid displaying the 9 core Vietnamese agricultural commodities on [`products.html`](file:///d:/antigravity/Belkern/products.html).
* **Full-Card Clickability Architecture:**
  * Toàn bộ khối card `.commodity-card` được bọc trực tiếp bằng thẻ `<a href="product-[name].html" class="commodity-card group relative block ... cursor-pointer">`.
  * Khách hàng click vào bất kỳ điểm nào trên card (hình ảnh, nền tối, tiêu đề, nút bấm) đều điều hướng trực tiếp đến trang chi tiết sản phẩm.
  * Tiêu đề `<h3>` kích hoạt hiệu ứng đổi màu vàng thương hiệu `group-hover:text-brand-gold`.
  * Nút mũi tên chuyển thành `<span class="... group-hover:bg-brand-green group-hover:translate-x-0.5 ...">` phản hồi vi mô mượt mà khi rê chuột.
  * Chuẩn hóa Semantic HTML5: Không lồng thẻ `<a>` con bên trong thẻ `<a>` cha.
  * Tích hợp bộ lọc danh mục (`filterCommodities()`) và tìm kiếm từ khóa (`searchCommodities()`) thời gian thực dựa trên `data-category` và `data-keywords`.

### 3.4. `CommoditySpecimenPanorama` (`#productSpecimen` · All 9 `product-*.html` Pages)
* **Design Philosophy (Hướng 2 — Specimen Gallery & Contract Sourcing Declaration):**
  * Replaces rigid lab metric tables and unmaintainable ISO/ppb thresholds with an authentic **4-step physical photography gallery** on the left paired with a **single, 100% stable contract sourcing declaration** on the right.
  * Solves director mandate: "các trang sản phẩm chỉ giới thiệu sơ về sản phẩm không nói về chi tiết các chỉ số hay tiêu chuẩn sản phẩm vì nội dung có thay đổi nhiều nên phần slider trong trang sản phẩm cần tính toán định hướng lại".
* **Layout & Grid Architecture:**
  * **Top Section Header:** Standardized 2-column header (`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start mb-8 sm:mb-10 lg:mb-12`). Left side has kicker (`COMMODITY SPECIMEN & SOURCING`) + H2 title (`{Commodity} Specimen & Physical Lot Selection.`). Right side has subtitle + dual CTAs (`[Request FCL Quotation]` & `[Inquire Specifications]`) aligned with H2 top via `lg:pt-[30px]`.
  * **Split Stage (`#certPanoramaShowcase`):**
    * **Left Column (Full-Bleed 4-Step Image Gallery):**
      - 4 cross-fading images (`.cert-panorama-img` with `opacity-100` / `opacity-0` transitions).
      - Step 1: `01 Specimen Overview` (Overview of physical lot, multi-origin sourcing).
      - Step 2: `02 Cleaned & Optical Sorted` (Optical color sorting, defect reduction).
      - Step 3: `03 Uniformity & Texture` (Screen retention / count / pod integrity).
      - Step 4: `04 Export Packaging & Bagging` (Bags, GrainPro®, Big Bags, FCL cargo).
      - Clean translucent badges (`bg-black/50 backdrop-blur-md border border-white/20`) describing the visual process, free of rigid lab claims.
    * **Right Column (Contract-Tailored Procurement Showcase):**
      - Single stable block (`class="cert-panorama-content"`, so `contents.length === 1` in `js/main.js`). Zero layout shift when images transition.
      - Authoritative title: `Supplied Strictly Per Buyer Contract Specifications.`
      - Explainer paragraph confirming direct multi-origin sourcing (Vietnam, Brazil, Indonesia, India, Africa) from verified cooperatives and processors according to buyer purchase orders and destination standards.
      - **3 Commercial Commitment Pillars:**
        1. *Tailored Grading & Selection* (Screen sizing, optical color sorting, moisture thresholds, defect tolerances).
        2. *Independent Pre-Shipment Inspection (COA)* (SGS / Eurofins / Cafecontrol / VinaControl).
        3. *Flexible Export Packaging & Logistics* (Kraft paper bags, GrainPro® jute sacks, vacuum cartons, bulk Big Bags).
      - **Bottom Navigation Dock:** Step counter (`<span id="certCurrentStep">01 Specimen Overview</span> / 04`) + twin squircle buttons (`stepCertPanorama(-1)`, `stepCertPanorama(1)`).

---

## 4. Bilateral Trade & Quality Components

### 4.1. `TheDualPowerModel` (Two Continents · One Direct Supply Chain · 50vw Full-Width Split Stage)
* **Design Philosophy:** Replaces constrained card containers with a **True 100% Full-Width Split Stage** (`#about`), giving each continental hub exactly **`50vw`** on desktop. Delivers a grand, cinema-scale comparative presentation of Belkern's bilateral strength: European legal sanctuary in Frankfurt and massive direct processing power in Vietnam.
* **Layout & Grid:**
  * Clean, breathable `#FBFBFA` background with top border separator.
  * Section Header sits inside standard `max-w-7xl mx-auto px-5 sm:px-8 lg:px-12` grid container.
  * The 2 Grand Portals break out to true **100% full-width edge-to-edge (`w-full grid grid-cols-1 lg:grid-cols-2 gap-0`)** with a subtle vertical hairline separator (`divide-white/10`).
* **The 2 Grand 50vw Portals:**
  * **Portal 01: Frankfurt am Main (European Commercial Hub · 50vw):**
    - High-res Frankfurt commercial skyline (`images/about/Skyline-Frankfurt-am-Main.webp`) with clean unobstructed upper view.
    - Headline & subtitle: `Frankfurt am Main` · `European Commercial Hub · European Banking · CET Trade Desk`.
    - 3 Fast Value Chips: `International Trade Terms`, `SEPA Euro Settlement`, `CET Working Hours`.
    - Action link: `View Legal Profile →` linking to `about.html#legal`.
  * **Portal 02: Global Sourcing Network (Multi-Origin Sourcing · 50vw):**
    - High-res origin landscape backdrop (`images/about/VIETNAM-ORIGIN.webp`) with clean unobstructed upper view.
    - Headline & subtitle: `Global Sourcing Network` · `Vetted Producers across Vietnam · Brazil · Indonesia · India · Africa`.
    - 3 Fast Value Chips: `Reputable Global Partners`, `Contract Specifications`, `Full Container Loads (FCL)`.
    - Action link: `Explore Commodity Portfolio →` linking to `products.html`.
* **Typography & Standards:** Strict `font-sans` (`Roboto Condensed`). Cinema-scale height: `h-[520px] sm:h-[580px] lg:h-[640px] xl:h-[720px]`. Upper 70% completely unshaded and free of floating badges for authentic photographic clarity. Bottom-docked layout (`flex flex-col justify-end`). Smooth hover zoom (`group-hover:scale-105 duration-700`). Touch targets $\ge 44$px. Zero horizontal scrollbar guaranteed.

### 4.2. `EdgeToEdgeSplitPanorama` (Cinematic Split Stage Showcase · Embedded SVG Certification Badges)
* **Purpose:** High-impact compliance and sustainability showcase that spans 100% of the viewport width with zero extra borders, zero card boxes, and zero screen jump when switching standards.
* **Layout & Structure (`#certifications`):**
  * **True 100% Full-Width Architecture:** Stretches edge-to-edge across the screen without outer card frames, margins, rounded corners, or floating shadows.
  * **Left Half (Col 6 / 12):** Panoramic full-bleed photography stage with smooth cross-fade across 4 authentic photos from `images/about/`:
    - Slide 01: `images/about/Slide-01.jpg` (Multi-Origin Sourcing & EUDR Geolocation)
    - Slide 02: `images/about/Slide-02.jpg` (Industrial Processing & Contract Specifications)
    - Slide 03: `images/about/DSC_2911_compressed.webp` (Independent Pre-Shipment Testing & COA)
    - Slide 04: `images/about/Slide-04.jpg` (Sustainable Agriculture & Responsible Supply Chain)
  * **Right Half (Col 6 / 12):** Expansive editorial canvas with headline, streamlined narrative aligned with multi-origin independent trading house model, and distinct contextual proof chips:
    - *Standard 01 (Origin Traceability):* Focus on multi-origin sourcing (Vietnam, Brazil, Indonesia, India, Africa) and EUDR geolocation compliance for customs clearance.
    - *Standard 02 (Contract Specifications):* Focus on supplying strictly per buyer purchase order parameters from vetted international processors.
    - *Standard 03 (Pre-Shipment Testing):* Focus on independent accredited laboratory testing and pre-shipment COAs (zero in-house lab claims).
    - *Standard 04 (Trade Governance):* Focus on Incoterms® 2020 contracts and responsible origin sourcing.
  * **Zero-Jitter Architecture:** All 4 standard contents stack in the exact same CSS grid cell (`col-start-1 row-start-1`) with `opacity` transitions.
* **Typography Rule:** Strict 100% `font-sans` across the entire interface (zero `font-mono`).

---

## 5. Lead Capture & Conversion Components

### 5.1. `ProcurementTerminal` (Frankfurt B2B Container RFQ Desk · Focused High-Clarity Deck)
* **Purpose:** Institutional-grade maritime procurement intake terminal governed under German commercial law.
* **Streamlined Architecture:**
  1. **Clean Section Header:**
     * Kicker: `DIRECT PROCUREMENT` (gold uppercase tracking).
     * Headline: `Request Container (FCL) Quotation` (authoritative brand dark).
     * Subtitle: Clear origin-to-port statement.
     * Service Level Agreement beacon: `< 24h response (CET)` and direct Frankfurt phone link (`+49 69 97 76 16 69`).
     * *Zero repetitive metric clutter:* Avoids repeating metrics already featured in prior sections.
  2. **High-Clarity Form Card (`#inquiryFormContainer`):**
     * Elevated white card `max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12`.
     * **No `overflow-hidden`:** Ensures dropdown menus float freely with `z-50 shadow-xl` without being clipped.
     * Intuitive 2-Column Grid Flow:
       - *Section 1 (Cargo & Route):* Custom Commodity dropdown + Target Volume input + Destination Port input + Incoterms® 2020 dropdown (CIF, CFR, FOB). Streamlined, minimal inputs with clear placeholders and zero pill clutter.
       - *Section 2 (Corporate Contact):* Company Name & Corporate Email.
       - *Section 3 (Accreditations):* 4 optional check chips with brand green styling (`accent-[#1B4332]`).
       - *Submission & Privacy:* DSGVO consent checkbox + standardized enterprise gold button with squircle arrow disc.
  3. **High-End Ingestion Confirmation State:** Zero browser `alert()`; smoothly transitions into a verified commercial registration card with reference tracking code (`BK-XXXXXX`) and 24h SLA dispatch guarantee.

---

## 6. Corporate Legal & Footer Components

### 6.1. `CorporateFooter` (Modern European Commercial Layout · Mobile Collapsible Accordions)
* **Purpose:** Clean, authoritative European B2B corporate footer providing legal transparency (§ 5 DDG & GDPR/DSGVO) with pure typography and zero card/box clutter.
* **Visual Polish & Architecture:**
  * Background: `bg-slate-100 text-slate-600 text-xs py-14 sm:py-16 lg:py-20 relative overflow-hidden`.
  * Visual Grounding: Distinct tonal shift from preceding `bg-brand-canvas` (#F8FAFC) to `bg-slate-100` (#F1F5F9), establishing a solid corporate anchor without harsh divider borders.
  * **Mobile-First Collapsible Architecture (< 1024px):**
    - Columns 2, 3, and 4 (`Navigation`, `Commodity Lines`, `European Headquarters`) automatically transform into clean, interactive accordions on mobile and tablet portrait (< 1024px) triggered by `toggleFooterAccordion(id)`.
    - Features subtle chevron indicator inside squircle container (`w-6 h-6 rounded-lg bg-slate-100`) that rotates 180° upon expansion.
    - Vastly reduces mobile vertical scroll height while allowing buyers to quickly inspect specific details on demand.
    - On Desktop ($\ge 1024\text{px}$), the accordions are permanently expanded (`lg:max-h-none lg:opacity-100 lg:overflow-visible`) with chevron hidden, rendering the full 4-column enterprise layout.
  * Pure Editorial Layout (Zero card boxes, zero extra borders):
    1. **Corporate Profile & German Registry:** Light Mode logo (`LM-Belkern-1.png`), 2-line corporate export narrative, and crisp typography-led legal coordinates (`HRB 99468 · Frankfurt am Main`, `DE 298 174 135`, `Incoterms® 2020: FOB · CIF · CFR`).
    2. **Fast Navigation:** Clean text links to core pages with subtle hover underline/color transitions.
    3. **Commodity Lines (Pure Information):** Non-jumpy, informative export portfolio list with subtle square category indicators (`w-1.5 h-1.5`) and grade specs (Robusta & Arabica, Steam Sterilized Pepper, Cashew Kernels AFI, Cassia & Star Anise, Turmeric).
    4. **European Headquarters & Contact:** Clean editorial address (`Melsunger Straße 15, Frankfurt am Main`), direct phone (`+49 69 97 76 16 69`), direct email (`mail@belkern.com`), and CET operating hours.
  * Bottom Legal Strip: Copyright 2026, German trade identity, Imprint (Impressum), and Privacy Policy (DSGVO).
  * **Compact Enterprise Back-to-Top Button (`#backToTopBtn`):**
    - Sits fixed at `bottom-5 right-5 sm:bottom-6 sm:right-6 z-40`.
    - Compact enterprise squircle shape (`rounded-xl` = 12px architectural radius, matching the ButtonSystem standard; NO outdated circular bubble).
    - Compact size: `w-10 h-10 sm:w-11 sm:h-11`.
    - Smooth scroll driven by `window.smoothScrollTo(0)` with inertial momentum deceleration.

---

## 7. Legal & Compliance Components

### 7.1. `ImprintArticle` (`imprint.html`)
* **Purpose:** Satisfies § 5 DDG (formerly § 5 TMG) & § 18 Abs. 2 MStV for German corporate websites.
* **Layout:** Clean elevated white cards with high-contrast text (`bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10`).
* **Fields:** Company legal form, HRB 99468 Frankfurt am Main, USt-IdNr. DE 298 174 135, registered office Frankfurt am Main, official EU ODR link, disclaimer clauses for content and links.

### 7.2. `PrivacyDisclosureCard` (`privacy-policy.html`)
* **Purpose:** Fulfils GDPR (DSGVO) transparency requirements (Articles 12, 13, 14).
* **Layout:** Structured modular sections with green verified accents, monospace data points, and highlighted SSL/TLS security badges.
* **Fields:** Responsible controller identity, server access logs, commercial RFQ data retention (HGB/AO statutory retention), cookie policy (no third-party profiling), cross-border trade data transfer clauses, and data subject rights (Articles 15–21 GDPR).

---

## 8. Iconography & Micro-Aesthetic Standards (Lucide Swiss Precision)

* **Design Philosophy:** Replaced chunky, cartoonish strokes with refined Swiss hairline precision (`1.65`–`1.75`), elevating the entire site to European high-end corporate B2B standards.
* **Global Injection Token (`js/main.js`):**
  ```javascript
  window.lucide.createIcons({
    attrs: {
      'stroke-width': 1.65
    }
  });
  ```
* **Specific Sizing & Stroke Standards:**
  * **CTA Arrow Discs:** `w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]` inside `w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20`.
  * **Off-Canvas Close Button:** Scaled from oversized `w-7 h-7 sm:w-8 sm:h-8` down to refined `w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]` inside a 44x44px touch-compliant circle.
  * **Two Pillar Model Squircles:** Scaled from crowded `w-7 h-7` down to `w-6 h-6 stroke-[1.65]` inside `w-14 h-14 rounded-xl` to ensure optical breathing room (3:7 ratio).
  * **List Bullet Checkmarks:** Refined from heavy `stroke-[3]` down to crisp `stroke-[1.75]` inside `w-5 h-5 rounded-md bg-brand-green/10`.
  * **Slider / Panorama Chevrons:** Standardized to `w-4 h-4 stroke-[1.75]` or `w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.75]`.

---

## 9. Strategic B2B Procurement Components (Conversion & Decision Architecture)

### 9.1. `SpecSheetModal` (`#specSheetModal`)
* **Purpose:** Executive 1-Click Technical Data Sheet (TDS / PDS) modal providing instant lab benchmarks and guaranteed quality limits for European QA/QC and R&D managers before contracting.
* **Layout & Multi-Device Responsive Architecture:**
  * Backdrop Overlay: `fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-hidden`.
  * Modal Card Architecture: `Minimalist Monolithic Card` (`relative w-full max-w-3xl lg:max-w-4xl bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2),0_0_1px_1px_rgba(0,0,0,0.05)] border border-slate-200/80 overflow-hidden flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] lg:max-h-[88vh]`).
  * **Zero Heavy Dark Header:** Completely eliminates outdated heavy black top banners in favor of a clean, seamless white editorial top bar (`bg-white border-b border-slate-100`) with subtle gold eyebrow badge (`Technical Data Sheet · Frankfurt QA Desk`), high-contrast title typography, and a minimalist floating circular close button (`w-10 h-10 rounded-full border border-slate-200 bg-slate-50`).
  * **Clean Un-carded Attribute Grid:** 4 clean typographic metadata items (Origin, Grade, EUDR, MOQ) arranged with subtle hairline border and zero box/card clutter.
  * **Specifications Table:** Clean, natural table typography with bold parameters and standards, completely free of pill/badge wrappers, enclosed in a refined rounded-2xl container (`border border-slate-200 overflow-hidden shadow-2xs bg-white`).
  * **German HGB Legal Notice:** Seamless text notice with brand gold shield icon confirming legally enforceable pre-shipment retain sample storage in Frankfurt archives.
  * **Minimalist Bottom Action Dock:** Pure light theme sticky bottom bar (`bg-slate-50/90 border-t border-slate-100 px-6 sm:px-8 py-4`) with elevated dual action triggers.
  * Scrollable Body (`flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6 [scrollbar-width:thin]`): Adapts dynamically to remaining viewport headroom with smooth internal scroll.
  * Responsive Table: Wrapped in `overflow-x-auto [scrollbar-width:thin]` with `min-w-[500px] sm:min-w-0` to eliminate line wrapping on narrow mobile screens.
* **Data Coverage (9 Commodities):**
  * Botanical classification, elevation/region, EUDR mapping status, standard MOQ.
  * Guaranteed specification matrix table (Moisture, Bulk Density, Purity, MRLs, Salmonella, Ochratoxin A).
  * Packaging (Jute bag, GrainPro, Vacuum cartons, 1MT Big Bags) and European Incoterms.
* **Conversion Actions:**
  * `[Print / Save as PDF (TDS)]`: Triggers `printSpecSheet()` which renders an institutional single-page A4 corporate document via `#printableTdsDocument` with Belkern German letterhead, HRB 99468 registration, document reference number, Eurofins/SGS compliance seals, Incoterms® 2020 protocol, and official Quality Assurance signatory block. Incorporates high-contrast ink (`#0f172a` / `#020617`), bold solid table grid rules (`border-2 border-slate-700` and `border-r border-slate-400`), solid card boundaries (`border-2 border-slate-400`), and dark text weights for guaranteed laser and monochrome print readability. The interactive modal chrome and buttons are automatically excluded from the print output.
  * `[Request 500g Courier Sample]`: Closes modal, scrolls smoothly to `#rfq`, auto-checks the sample request toggle, and pre-selects the commodity in the dropdown.

### 9.2. `CropSeasonalityCalendar` (`#harvestModal` & Trigger Banner)
* **Purpose:** On-demand B2B procurement harvest calendar and forward booking windows modal dialog. Replaces the static inline table on the homepage with an interactive popup triggered explicitly by commercial buyers via the `[ View Sourcing Timeline ]` CTA banner, preserving clean vertical flow while offering in-depth seasonal intelligence.
* **Trigger Banner:** Sleek, compact institutional utility bar (`py-3 px-5 rounded-2xl`) placed below Commodities grid with calendar icon, gold `[6 Commodities]` badge, and action button calling `openHarvestModal()`.
* **Modal Structure (`#harvestModal`):**
  * Modal dialog with backdrop blur (`bg-brand-dark/80 backdrop-blur-sm`), smooth scale/fade transition, ESC key, and backdrop click dismissal.
  * 12 monthly columns (Jan–Dec) across 6 primary Vietnamese agricultural commodities (Robusta, Arabica, Black/White Pepper, Cassia Cinnamon, Star Anise, Cashew Kernels).
  * Triple color-coded status badges: `Peak Harvest` (Emerald), `Forward Booking Window` (Amber), `Year-Round Stock` (Slate).
  * European Forward Contract Guarantee banner citing German Commercial Law (HGB) protection.
  * Direct conversion CTA `[ Inquire Forward Contract ]` calling `inquireFromHarvestModal()`, smoothly scrolling buyer to `#rfq`.

### 9.3. `CourierSampleTerminal` (`#sampleRequestContainer`)
* **Purpose:** B2B sample acquisition terminal within the RFQ form allowing verified European buyers to order a 500g physical lab/cupping sample dispatched via DHL/FedEx Express in 48 hours.
* **Architecture & State Transitions:**
  * **Default (Unchecked) State:** Ultra-condensed minimal single-line card showing only the checkbox, title (`Request 500g Physical Working Sample`), and `Free Express` badge. No verbose explainer text, eliminating visual noise.
  * **Active (Checked) State:** Expands via a 60fps CSS Grid Accordion (`grid-rows-[0fr] opacity-0` -> `grid-rows-[1fr] opacity-100` over 300ms ease-out) to eliminate layout snapping/jerking. Reveals the full service explainer banner (`DHL Express / FedEx dispatch within 48h from Frankfurt Desk / Origin Lab + pre-shipment COA`), delivery address (`#sampleAddressInput`), optional courier account (`#sampleCourierAccountInput`), and evaluation objective dropdown (`#sampleObjectiveSelect`). Automatically releases `overflow-hidden` post-transition to avoid clipping dropdown options.
  * Dynamic submit button label and confirmation state with active sample dispatch tracking reference.

### 9.4. `ProcurementInquiryTerminal` (`#rfq` & `#inquiryFormContainer`)
* **Purpose:** Focused, distraction-free single-card B2B procurement terminal engineered for European commercial buyers to submit inquiries and FCL quote requests in under 45 seconds (strictly conforming to `BELKERN_WEBSITE_CONTENT_SPEC.md` §22 & §23).
* **Layout:** Clean 12-column split stage (`lg:col-span-4` direct contacts & desk capabilities; `lg:col-span-8` elevated form container).
* **Left Column (Commercial Desk Capabilities):**
  * Office Address: Melsunger Straße 15, 60389 Frankfurt am Main, Germany.
  * Direct Phone: `+49 69 97 76 16 69` (08:30–17:30 CET).
  * Inbound Email: `mail@belkern.com` (24h SLA).
  * **Desk Languages Card:** Explicit support for `English`, `Deutsch`, and `Tiếng Việt` with active CET indicator.
  * Statutory Identity: Commercial Register `HRB 99468 (Frankfurt)`, VAT ID `DE 298 174 135`, Supply Model `Direct Origin Supply`.
* **Clean Border Hierarchy & Visual Flow:**
  * Major sections cleanly grouped into: Cargo & Logistics Scope → Courier Working Sample Terminal → Buyer Commercial Identity → Accreditations & Technical Notes → Privacy Agreement.
  * Elimination of intrusive floating quick-preset popup menus in favor of clean, robust text inputs with clear placeholder guidance (`Hamburg Port, Rotterdam, Antwerp, Koper` & `1 x 20' FCL (approx. 19.2 MT)`).
* **Visual Hierarchy & Field Mapping (Spec §22 Compliance):**
  * **Step 1 (Cargo & Logistics Scope):**
    * Commodity Cargo: Custom accessible dropdown with auto-clearing validation.
    * Target Volume (FCL / MT): Clean text input with standard container load placeholder.
    * Destination Port (POD) / Delivery Hub: Clean text input for base European ports.
    * Incoterms® 2020: Custom dropdown (CIF, CFR, FOB).
  * **Optional Add-on (500g Courier Working Sample):** Ultra-condensed when unchecked; expands to full details and required address fields on demand (`#sampleAddressInput` dynamically validated only when checked).
  * **Step 2 (Buyer Commercial Identity - Strict Spec §22):**
    * Full Name (`#contactNameInput`): Required contact person.
    * Company Name (`#companyInput`): Required corporate entity name.
    * Corporate Email (`#emailInput`): Required business email (RFC 5322 regex validation).
    * Country / European Market (`#countryInput`): Required target market.
    * Direct Phone (`#phoneInput`): Optional phone number.
  * **Step 3 (Accreditations & Notes):** 4 clean optional compliance chips (EUDR Polygon, Rainforest/4C, BRCGS, Steam Sterilized) and technical specification notes textarea (`#notesInput`).
  * **Submission:** Mandatory DSGVO privacy consent checkbox and gold action button with 24h SLA badge (`Send Commercial Inquiry (24h Desk SLA)`).
* **State Management & Validation Engine (`js/main.js`):**
  * **1. Missing / Invalid Field Handling (Error State):**
    * `novalidate` prevents silent browser stalling on hidden selects.
    * Real-time JavaScript validation checks: Commodity selection, Port of Destination, Target Volume, Sample Address (if toggled), Company Entity, Business Email regex, and DSGVO consent.
    * **Tactile Feedback:** Submit button triggers `@keyframes fieldShake` (`.animate-shake` over 450ms).
    * **Visual Highlighting:** Invalid inputs/dropdown triggers receive `border-red-500 ring-2 ring-red-500/20 bg-red-50/20`.
    * **Inline Error Tooltips:** Injects clean `.rfq-error-tip` badge with red warning circle icon and actionable guidance below each invalid field.
    * **Smart Focus & Scroll:** Auto-scrolls smoothly to the first invalid field and focuses it.
    * **Real-Time Dismissal:** Error styling and tooltips clear instantly as the user types (`input`) or selects (`change`).
  * **2. Transmitting State (Loading):**
    * Disables submit button to prevent duplicate submissions.
    * Renders animated spinner with `Transmitting RFQ to Frankfurt Desk...` label.
  * **3. Confirmation View (Success State):**
    * Replaces form card with institutional B2B confirmation receipt.
    * Displays unique tracking code (`BK-XXXXXX`), verified European desk registration badge, detailed inquiry matrix (Commodity, Volume, POD, Incoterm, Corporate Email, Courier Sample dispatch note if requested, Accreditations), and 24h CET response guarantee.
    * **In-Place Reset:** Includes `[Submit Another Container Inquiry]` button that cleanly restores cached form HTML and rebinds all interactive engines without full-page browser reloading.

---

## 10. Enterprise Modal Architecture & Global Controls

### 10.1. `MinimalistMonolithicModal` (`#specSheetModal` & `#harvestModal`)
* **Philosophy:** 100% unified Pure European Editorial White Architecture. No dark institutional headers, no heavy borders, no playful card-in-card nesting.
* **Shell & Backdrop:**
  * Backdrop: `fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300 ease-out flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-hidden`.
  * Card Architecture: `relative w-full max-w-4xl lg:max-w-5xl bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2),0_0_1px_1px_rgba(0,0,0,0.05)] border border-slate-200/80 overflow-hidden transform transition-all duration-300 ease-out translate-y-4 scale-95 opacity-0 my-auto flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] lg:max-h-[88vh]`.
* **Standardized Header:**
  * Background: Pure white with light bottom hairline divider (`shrink-0 bg-white px-6 sm:px-8 pt-6 sm:pt-7 pb-5 border-b border-slate-100 flex items-start justify-between gap-4 relative z-10`).
  * Kicker: Status dot + pill tag (`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] sm:text-[11px] font-bold uppercase tracking-wider`).
  * Floating Circular Close Button: `w-10 h-10 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all flex items-center justify-center cursor-pointer shrink-0 shadow-2xs active:scale-95 group`.
* **Body & Data Presentation:**
  * Scrollable container with native thin scrollbar (`overflow-y-auto px-6 sm:px-8 py-6 space-y-5 [scrollbar-width:thin]`).
  * Tables: Sticky first column with subtle elevation (`sticky left-0 z-10 bg-white border-r border-slate-200/80 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]`).
  * Subtle un-carded status badges (`bg-emerald-50 text-emerald-800` for Peak Harvest, `bg-amber-50 text-amber-800` for Forward Booking).
* **Bottom Action Dock:**
  * Clean institutional footer: `shrink-0 bg-slate-50/90 border-t border-slate-100 px-6 sm:px-8 py-4 sm:py-4.5 flex flex-col sm:flex-row items-center justify-between gap-3`.
  * Primary gold CTA + secondary neutral button.

### 10.2. `FloatingBackToTop` (`#backToTopBtn`)
* **Purpose:** Unobtrusive, smooth scroll-to-top floating action button following the user down long landing page reading journeys.
* **Component Anatomy:**
  * Position & Layer: `fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40`.
  * Size & Shape: `w-10 h-10 sm:w-11 sm:h-11 rounded-xl` (100% unified with video controls).
  * Visual Styling: `bg-slate-900/70 hover:bg-brand-gold active:bg-brand-gold text-white border border-white/20 hover:border-brand-gold shadow-md backdrop-blur-md transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 group`.
  * Micro-interaction: Icon smoothly shifts up by 2px on hover (`group-hover:-translate-y-0.5`).
* **Behavior Engine (`js/main.js` -> `initBackToTop()`):**
  * Passive scroll listener monitors `window.scrollY`.
  * When `scrollY > 300`: reveals via `opacity-100 pointer-events-auto translate-y-0`.
  * When `scrollY <= 300`: gracefully fades out via `opacity-0 pointer-events-none translate-y-3`.
  * Click Action: Invokes native smooth window scroll `if (window.smoothScrollTo) window.smoothScrollTo(0)`.

---

## 11. GSAP & ScrollTrigger Enterprise Motion Suite

* **Overview:** Hardware-accelerated (GPU-composited) motion engine elevating Belkern GmbH's landing page into a top-tier European corporate trade platform.
* **Core Libraries Loaded:**
  * `gsap.min.js` (v3.12.5)
  * `ScrollTrigger.min.js` (v3.12.5)
* **Choreographed Timelines & Triggers (`initGsapScrollAnimations()` in `js/main.js`):**
  1. **Hero Cinematic Stagger Entrance:**
     * Kicker (`text-brand-gold`), H1 headline, descriptive narrative, CTA action buttons, and 4 pillar stats stagger in with `power3.out` / `power4.out` ease curves on page load.
  2. **Section Headings Stagger Reveal:**
     * Triggers at `top 82%` viewport entrance for `#commodities`, `#about`, `#certifications`, and `#rfq`.
     * Kicker, H2 Title, and body text smoothly slide up (`y: 32 → 0`, `opacity: 0 → 1`, stagger 0.1s).
  3. **Commodity Showcase Wave Stagger Reveal:**
     * Triggers at `top 85%` for `#commodityScrollTrack`.
     * All 9 commodity cards glide up with hardware-accelerated wave delay (`y: 44 → 0`, `opacity: 0 → 1`, stagger 0.07s).
  4. **The Bilateral Model 50vw Portals:**
     * Frankfurt am Main (Left) and Vietnam Origin (Right) portals reveal with balanced delay (`duration: 0.9s`, ease `power3.out`).
  5. **Standards & Certifications Panorama:**
     * 4 quality/ESG metrics stagger in at `top 80%`, followed by the edge-to-edge photography panorama stage at `top 82%`.
  6. **RFQ Container Inquiry Terminal Card:**
     * Form terminal container gently elevates (`y: 40 → 0`, `duration: 0.85s`) as `#rfq` enters view.
  7. **Native Fallback Preservation:** If GSAP fails to load (e.g. offline/network blocked), `initCommodityStaggerReveal()` and native CSS transitions gracefully take over without breaking any layout.

---

## 12. Product Detail Page Architecture & Fast-Switcher Suite (`product-*.html`)

* **Live Specimen File:** [`product-chili.html`](file:///d:/antigravity/Belkern/product-chili.html) (Dedicated B2B showcase for Vietnamese Dried Chili).
* **Design Philosophy:** 100% Crisp Light Theme + High-contrast technical data presentation for European commodity procurement leads.

### 12.1. `HeroEditorialHierarchy` (No Visible Hero Breadcrumb · Clean Origin Kicker + H1)
* **Design Decision & Tech Standard:** To preserve high-end European B2B minimalism and prevent visual clutter above the fold, **visible in-hero breadcrumbs (`Home / ...`) have been completely removed across all pages** (`product-*.html`, `products.html`, and `contact.html`).
* **Hierarchy & Copywriting Formula (Ngắn gọn, Thân thiện & Chuẩn mực giao dịch):**
  * **Origin Kicker:** Origin terroir region, statutory identity, or key processing accreditation (`text-brand-gold uppercase tracking-[0.2em]` with an active pulsing status dot). Zero word overlap with H1.
  * **Main H1 Headline (2-Line Display):**
    * *Line 1 (White):* Concise, friendly, high-status commercial naming (2–3 words).
    * *Line 2 (Solid Gold):* Direct origin or core verifiable commercial grade/specification (e.g. `Screen 18 Wet Polished.`, `Steam Sterilized ASTA.`, `Cau Dat SCA 82+.`).
  * **Zero Word Repetition Rule:** Strict elimination of redundant echo words between Kicker and H1.
  * **SEO Integrity:** Structured metadata and Schema.org `Product` JSON-LD within `<head>` strictly use pure botanical and culinary descriptions without binding lab metrics.

### 12.2. `ProductSpecimenShowcase` (#productSpecimen · Visual Gallery & Sourcing Declaration)
* **Purpose:** Edge-to-edge split stage pairing real commodity photography with an authoritative sourcing declaration.
* **Architecture:**
  * **Left (6 Cols):** Edge-to-edge full bleed photographic slider documenting physical specimens, natural post-harvest handling, and export packaging (4 slides).
  * **Right (6 Cols):** Single stable contract declaration (`Supplied Strictly Per Buyer Contract Specifications`) with 3 commercial value pillars:
    1. *Diverse Cuts & Physical Selection:* Granulations, cuts, and sorting options tailored to buyer PO.
    2. *Direct Origin Sourcing & Clean Handling:* Clean post-harvest drying, natural handling without chemical additives.
    3. *Protective Export Packaging:* Heavy-duty barrier liners, multi-wall kraft paper sacks, or vacuum cartons.
* **Legal Shielding:** Clearly declares that Belkern does not enforce fixed in-house parameters; every lot is tailored, graded, and certified strictly in accordance with the buyer's purchase order and destination country regulations.

### 12.3. `ProductProcessingForms` (#productGrades · Pure Descriptive Product Showcase)
* **Design Philosophy:** 100% pure product descriptions focusing on sensory qualities, appearance, aroma, texture, and applications.
* **Strict Anti-Risk Rule:** ZERO rigid numerical thresholds, ZERO lab test tables (sieve/mesh, moisture, fat %, ppm, SHU, cupping score), and ZERO certificate claims (ISO, Halal, Kosher, COA) on product pages.
* **Card Anatomy (4 Pure Descriptive Cards):**
  * *Category Tag:* Clean neutral badge (`Bakery & Confection`, `Cereals & Toppings`, `Classic Espresso`, etc.).
  * *Commercial Name:* Clean title (`High Fat Fine Grade`, `Toasted Coconut Chips`, etc.).
  * *Descriptive Prose:* Rich, evocative explanation of cut, mouthfeel, aroma, and industrial/culinary suitability.
  * *Action Button:* Architectural button linking directly to RFQ with preselected commodity grade.

### 12.4. `ProductCrossNavGrid` (Explore Other Commodities)
* **Purpose:** Fast navigation slider below hero enabling instant 1-click exploration of all 9 commodities with clean titles and descriptive subtitles (e.g. `Whole & Pieces`, `Polished Fingers`, `Wet Polished`).

---

## 13. Careers Page Architecture & Job Posting Suite (`careers.html`)

* **Live File:** [`careers.html`](file:///d:/antigravity/Belkern/careers.html) (Frankfurt am Main Commercial Trading Desk Vacancies & Culture).
* **Design Philosophy:** 100% Crisp Light Theme + Authoritative German Commercial Sanctuary & Direct Vietnamese Agricultural Origin.
* **Tech Stack:** Semantic HTML5 + 100% TailwindCSS Utility Classes + Vanilla JS. Zero custom BEM classes.

### 13.1. `CareersHero` (Hero Formula: Ngắn gọn, Thân thiện & Chuẩn mực giao dịch)
* **Origin Kicker:** `● FRANKFURT AM MAIN · INTERNATIONAL COMMODITY TRADE`
* **Headline:**
  * Line 1: `Join Our Team.`
  * Line 2: `<span class="text-brand-gold">Trade with Impact.</span>`
* **Subtitle:** Concise explanation of the bilateral bridge between European industrial roasters/spice processors and direct Vietnamese processing facilities.
* **Dual Action Controls:** Primary `[View Openings ↓]` pointing to `#positions`, Secondary `[Why Belkern]` pointing to `#culture`.
* **Micro-metrics Strip:** `Frankfurt-Ost (HRB 99468)` · `6 Plants (Integrated Origin)` · `DE · EN (Bilingual Desk)`.

### 13.2. `TradingCulturePillars` (The Bilateral Trading Desk Advantage)
* **Design Pattern:** Open Swiss-style editorial layout with generous breathing room (zero cluttered card boxes).
* **3 Core Value Pillars:**
  1. *Dual Continental Bridge:* Daily interaction between Frankfurt commercial roasters/buyers and Central Highlands origin teams.
  2. *Commercial Standards & HGB:* Operating under German commercial jurisdiction, Incoterms® 2020, ASTA, and EUDR traceability.
  3. *High Impact & Short Loops:* Autonomous, agile trading environment with flat hierarchy and direct communication channels.
* **Visual Evidence:** High-contrast photographic bilateral pairing: Frankfurt Skyline (`images/about/Skyline-Frankfurt-am-Main.webp`) and Vietnam Origin Facilities (`images/about/VIETNAM-ORIGIN.webp`).

### 13.3. `VisualCommodityCareerCard` & `JobDossierModal` (Simplified, Photo-Enriched 3-Column Matrix)
* **Design Philosophy:** Replaces dry text-heavy accordion lists with vibrant, authentic B2B photo-enriched cards and a high-spec institutional modal dossier.
* **Photography & Visual Attribution:**
  * *Card 1 (Commercial Desk):* `images/about/frankfurt-am-main.jpg` — Bright, active European commercial trading office in Frankfurt am Main.
  * *Card 2 (Ocean Logistics):* `images/about/Slide-04.jpg` — International deep-sea container terminal with thousands of shipping containers in golden sunlight.
  * *Card 3 (Quality & EUDR):* `images/about/DSC_2911_compressed.webp` — Analytical testing laboratory and specialist conducting quality control for coffee & spices.
* **Streamlined Card Anatomy (Zero Clutter & Maximum Scannability):**
  * *Aspect-[16/10] Image Banner:* Smooth zoom effect (`group-hover:scale-105 duration-500`) with subtle gradient scrim.
  * *Floating Badges:* Distinct department pill (`Commercial Desk` emerald, `Ocean Logistics` blue, `Quality & EUDR` teal) + Ref code pill.
  * *Location Marker:* Bottom-left location tag directly on photo (`Frankfurt am Main Desk` / `Frankfurt / Hybrid`).
  * *Punchy 1-Sentence Pitch:* Concise, inspiring summary of the role's mission without redundant paragraphs.
  * *3 Minimalist Meta Pills:* Concise tags for *Employment Type*, *Languages*, and *Experience Level*.
  * *Primary Action Button:* `[View Full Details →]` opening the comprehensive Dossier Modal.
* **Institutional Dossier Modal (`#jobDossierModal`):**
  * Full breakdown of commercial scope, daily workflows, qualifications, and the Belkern Employee Value Proposition (benefits, Deutschlandticket, Q-Grader training, origin immersion).
  * Accessible with keyboard navigation (`Escape` key dismiss, click outside to close).
  * Smooth transition and dynamic application parameter preselection (`selectJobForApply`).

### 13.4. `ApplicationIntakeSection` (Submissions & Direct Recruitment Contact)
* **Structured Submission Checklist:** CV in English, Cover Letter / Intro, Earliest Starting Date, Salary Expectations.
* **DSGVO / GDPR Compliance Notice:** Clear applicant data privacy protection declaration under BDSG/GDPR.
* **Direct Addressee Coordinates:** Ms. Christiane Martin, `mail@belkern.com`, `+49 69 97 76 16 69`.
* **Interactive 1-Click Action:** Preformatted mailto link with encoded subject line and application body template.
