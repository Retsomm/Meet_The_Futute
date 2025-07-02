'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';

// Zustand store for theme management
const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      isInitialized: false,
      
      setTheme: (theme) => {
        set({ theme });
        // 更新 HTML class
        if (typeof window !== 'undefined') {
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(theme);
        }
      },
      
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },
      
      initializeTheme: () => {
        if (typeof window !== 'undefined' && !get().isInitialized) {
          const savedTheme = localStorage.getItem('theme-storage');
          let theme = 'light';
          
          if (savedTheme) {
            try {
              const parsed = JSON.parse(savedTheme);
              theme = parsed.state?.theme || 'light';
            } catch (e) {
              // 如果解析失敗，檢查系統偏好
              theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
          } else {
            // 沒有保存的主題，使用系統偏好
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          
          set({ theme, isInitialized: true });
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(theme);
        }
      }
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

// Custom hook for using theme
export function useTheme() {
  const { theme, setTheme, toggleTheme, initializeTheme, isInitialized } = useThemeStore();
  
  useEffect(() => {
    if (!isInitialized) {
      initializeTheme();
    }
  }, [initializeTheme, isInitialized]);
  
  return { theme, setTheme, toggleTheme };
}

// Theme provider component (optional, for consistency)
export function ThemeProvider({ children }) {
  const { initializeTheme, isInitialized } = useThemeStore();
  
  useEffect(() => {
    if (!isInitialized) {
      initializeTheme();
    }
  }, [initializeTheme, isInitialized]);
  
  return <>{children}</>;
}
