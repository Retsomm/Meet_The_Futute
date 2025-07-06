// 這個組件提供內聯的主題初始化腳本，防止 FOUC
export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function getTheme() {
              try {
                const saved = localStorage.getItem('theme-storage');
                if (saved) {
                  const parsed = JSON.parse(saved);
                  return parsed.state?.theme || 'light';
                }
              } catch (e) {
                // 如果解析失敗，檢查系統偏好
              }
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            
            const theme = getTheme();
            document.documentElement.classList.add(theme);
            
            // 動態設置主題色
            const themeColor = theme === 'dark' ? '#1f2937' : '#0891b2';
            const existingThemeColor = document.querySelector('meta[name="theme-color"]');
            if (existingThemeColor) {
              existingThemeColor.content = themeColor;
            } else {
              const meta = document.createElement('meta');
              meta.name = 'theme-color';
              meta.content = themeColor;
              document.head.appendChild(meta);
            }
          })();
        `,
      }}
    />
  );
}
