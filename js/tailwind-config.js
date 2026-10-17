/**
 * Belkern GmbH — Tailwind CSS Design System Configuration (js/tailwind-config.js)
 * Shared across all HTML pages for consistent tokens, typography, and animations
 * Reference: docs/design.md
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          surface: '#FFFFFF',
          canvas: '#F8FAFC',
          dark: '#0A1D14',
          green: '#1B4332',
          lightGreen: '#2D6A4F',
          gold: '#D97706',
          goldDark: '#B45309',
          amber: '#D97706',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
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
