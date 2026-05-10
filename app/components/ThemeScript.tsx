export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function getTheme() {
              try {
                var saved = localStorage.getItem('theme-storage');
                if (saved) {
                  var parsed = JSON.parse(saved);
                  return parsed.state && parsed.state.theme ? parsed.state.theme : 'light';
                }
              } catch (e) {}
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            var theme = getTheme();
            document.documentElement.classList.add(theme);
            var themeColor = theme === 'dark' ? '#1f2937' : '#0891b2';
            var existingThemeColor = document.querySelector('meta[name="theme-color"]');
            if (existingThemeColor) {
              existingThemeColor.content = themeColor;
            } else {
              var meta = document.createElement('meta');
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
