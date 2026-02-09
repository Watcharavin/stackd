import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // LOCKED PALETTE - DO NOT ADD MORE COLORS
        navy: 'var(--navy)',
        'steel-blue': 'var(--steel-blue)',
        'steel-blue-dark': 'var(--steel-blue-dark)',
        'ice-white': 'var(--ice-white)',
        'fog-gray': 'var(--fog-gray)',
        slate: 'var(--slate)',
        charcoal: 'var(--charcoal)',
        'accent-cyan': 'var(--accent-cyan)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
