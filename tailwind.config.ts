import type { Config } from 'tailwindcss'

/**
 * Identidade visual
 * -----------------------------------------------------------
 * Base CLARA e premium. O grafite (#1A1A1A) sustenta textos fortes
 * e areas de contraste; o rosa (#E04A67) e usado com parcimonia,
 * sempre como cor de destaque e conversao.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Grafite oficial da marca
        ink: {
          DEFAULT: '#1A1A1A',
          900: '#1A1A1A',
          800: '#212121',
          700: '#2B2B2B',
          600: '#3A3A3A',
          500: '#565656',
          400: '#7C7C7C',
          300: '#A6A6A6',
          200: '#CFCFCF',
          100: '#E7E7E7',
          50: '#F4F4F4',
        },
        // Rosa oficial da marca (#E04A67)
        accent: {
          DEFAULT: '#E04A67',
          50: '#FDF3F5',
          100: '#FCE7EB',
          200: '#F9CFD8',
          300: '#F3A6B7',
          400: '#EC748F',
          500: '#E04A67',
          600: '#CB2F4F',
          700: '#AB2540',
          800: '#8E213A',
          900: '#782034',
        },
        // Superficies claras
        paper: {
          DEFAULT: '#FFFFFF',
          soft: '#FBFBFA',
          muted: '#F5F5F4',
          fog: '#EFEFF1',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['clamp(2rem, 5vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.4rem, 6vw, 4rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.75rem, 7vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
      },
      maxWidth: {
        shell: '1200px',
        wide: '1360px',
        prose: '62ch',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(26,26,26,0.04), 0 12px 32px -18px rgba(26,26,26,0.28)',
        'card-hover': '0 2px 6px rgba(26,26,26,0.06), 0 28px 60px -28px rgba(26,26,26,0.38)',
        frame: '0 30px 90px -30px rgba(26,26,26,0.5), 0 8px 24px -12px rgba(26,26,26,0.35)',
        accent: '0 18px 40px -18px rgba(224,74,103,0.65)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'preview-in': {
          from: { opacity: '0', transform: 'translateY(18px) scale(0.985)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'halo-pulse': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'preview-in': 'preview-in 0.42s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'spin-slow': 'spin-slow 9s linear infinite',
        'halo-pulse': 'halo-pulse 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
