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
        // 更新 HTML class 和 theme-color meta 標籤
        if (typeof window !== 'undefined') {
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(theme);
          
          // 更新 theme-color meta 標籤
          const themeColor = theme === 'dark' ? '#1f2937' : '#0891b2';
          const metaThemeColor = document.querySelector('meta[name="theme-color"]');
          if (metaThemeColor) {
            metaThemeColor.content = themeColor;
          }
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
          
          // 更新 theme-color meta 標籤
          const themeColor = theme === 'dark' ? '#1f2937' : '#0891b2';
          const metaThemeColor = document.querySelector('meta[name="theme-color"]');
          if (metaThemeColor) {
            metaThemeColor.content = themeColor;
          }
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
    
    // 監聽系統主題變化
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = (e) => {
        // 只有在沒有用戶偏好設置時才自動跟隨系統主題
        const savedTheme = localStorage.getItem('theme-storage');
        if (!savedTheme) {
          const newTheme = e.matches ? 'dark' : 'light';
          setTheme(newTheme);
        }
      };
      
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, [initializeTheme, isInitialized, setTheme]);
  
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
