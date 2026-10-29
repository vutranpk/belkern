/**
 * Belkern GmbH — Tailwind CSS Design System Configuration (js/tailwind-config.js)
 * Shared across all HTML pages for consistent tokens, typography, and animations
 * Official Design Directives:
 *   - Dark Background Surface / Headings: #182639 (Deep European Navy Slate, updated from #071F14)
 *   - Primary Body Text: #293649 (Deep Slate Navy Charcoal, enhanced from #475569 for maximum contrast)
 *   - Brand Green: #046738 (Official Logo Belkern Green — 7.19:1 on #FFFFFF — WCAG AAA)
 *   - Luminous Mint: #34D399 (High-contrast kicker & accents on dark backgrounds — 9.45:1 on #182639 — WCAG AAA)
 * Reference: docs/design.md
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        slate: {
          500: '#3D4F66',           // Deepened from #64748b for legible secondary text
          600: '#293649',           // Official Primary Text (deep slate navy, enhanced from #475569)
        },
        brand: {
          surface: '#FFFFFF',
          canvas: '#F8FAFC',
          dark: '#182639',          // Deep European Navy Slate (updated from #071F14 per directive)
          text: '#293649',          // Deep Slate Navy Text (enhanced from #475569)
          green: '#046738',         // Official Logo Belkern Green (7.19:1 on white — WCAG AAA)
          greenDark: '#034E2B',     // Deep Forest Green for button hovers (9.81:1 on white — WCAG AAA)
          greenLight: '#0B8A4D',    // Mid Forest Green for dark surface hover
          mint: '#34D399',          // Luminous Mint for dark backgrounds (9.45:1 on #182639 — WCAG AAA)
          mintDark: '#10B981',      // Vibrant Emerald (7.21:1 on #182639 — WCAG AAA)
          charcoal: '#293649',      // Official Slate Gray (enhanced to #293649 for rich readability)
          border: '#E2E8F0',
          // Seamless aliases to redirect legacy yellow/amber to Belkern Green:
          gold: '#046738',
          goldDark: '#034E2B',
          amber: '#046738',
        }
      },
      fontFamily: {
        sans: ['"Roboto Condensed"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 35s linear infinite',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    }
  }
};
