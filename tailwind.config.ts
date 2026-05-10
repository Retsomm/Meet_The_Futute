import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-source-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        'bg-3': 'var(--bg-3)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        'ink-4': 'var(--ink-4)',
        line: 'var(--line)',
        'line-2': 'var(--line-2)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        'accent-soft': 'var(--accent-soft)',
        'accent-bg': 'var(--accent-bg)',
        positive: 'var(--positive)',
        'positive-bg': 'var(--positive-bg)',
        warn: 'var(--warn)',
        'warn-bg': 'var(--warn-bg)',
      },
      maxWidth: {
        container: '1200px',
        narrow: '880px',
      },
      borderRadius: {
        ds: 'var(--radius-sm)',
        d: 'var(--radius)',
        dl: 'var(--radius-lg)',
      },
      boxShadow: {
        ds: 'var(--shadow-sm)',
        dm: 'var(--shadow-md)',
      },
    },
  },
  plugins: [],
};

export default config;
