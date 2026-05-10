'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  isInitialized: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      isInitialized: false,

      setTheme: (theme: Theme) => {
        set({ theme });
        if (typeof window !== 'undefined') {
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(theme);

          const themeColor = theme === 'dark' ? '#1f2937' : '#0891b2';
          const metaThemeColor = document.querySelector<HTMLMetaElement>(
            'meta[name="theme-color"]'
          );
          if (metaThemeColor) {
            metaThemeColor.content = themeColor;
          }
        }
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      initializeTheme: () => {
        if (typeof window !== 'undefined' && !get().isInitialized) {
          const savedTheme = localStorage.getItem('theme-storage');
          let theme: Theme = 'light';

          if (savedTheme) {
            try {
              const parsed = JSON.parse(savedTheme) as {
                state?: { theme?: Theme };
              };
              theme = parsed.state?.theme ?? 'light';
            } catch {
              theme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            }
          } else {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light';
          }

          set({ theme, isInitialized: true });
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(theme);

          const themeColor = theme === 'dark' ? '#1f2937' : '#0891b2';
          const metaThemeColor = document.querySelector<HTMLMetaElement>(
            'meta[name="theme-color"]'
          );
          if (metaThemeColor) {
            metaThemeColor.content = themeColor;
          }
        }
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

export function useTheme(): { theme: Theme; setTheme: (t: Theme) => void; toggleTheme: () => void } {
  const { theme, setTheme, toggleTheme, initializeTheme, isInitialized } =
    useThemeStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeTheme();
    }

    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        const savedTheme = localStorage.getItem('theme-storage');
        if (!savedTheme) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      };

      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () =>
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, [initializeTheme, isInitialized, setTheme]);

  return { theme, setTheme, toggleTheme };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { initializeTheme, isInitialized } = useThemeStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeTheme();
    }
  }, [initializeTheme, isInitialized]);

  return <>{children}</>;
}
