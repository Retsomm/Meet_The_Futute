# SEO 設定說明

本專案已新增完整的 SEO 優化設定，包括以下功能：

## 📋 已實現的 SEO 功能

### 1. Metadata 設定

- ✅ 全站基本 metadata（title, description, keywords）
- ✅ Open Graph 標籤（Facebook 分享）
- ✅ Twitter Cards 標籤
- ✅ 每個頁面的特定 metadata
- ✅ 動態 metadata 生成工具

### 2. 搜尋引擎優化

- ✅ Sitemap.xml 自動生成
- ✅ Robots.txt 設定
- ✅ 結構化資料（JSON-LD）
- ✅ 正確的 HTML 語義標籤

### 3. 技術 SEO

- ✅ 壓縮啟用
- ✅ 圖片優化設定
- ✅ 安全標頭設定
- ✅ PWA manifest.json
- ✅ 快取策略

## 🔧 使用方式

### 環境變數設定

複製 `.env.example` 到 `.env.local` 並設定：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
GOOGLE_VERIFICATION=your-google-verification-code
```

### 自訂頁面 Metadata

```javascript
import { generateMetadata } from "../lib/seo";

export const metadata = generateMetadata({
  title: "頁面標題",
  description: "頁面描述",
  keywords: ["關鍵字1", "關鍵字2"],
  url: "/page-url",
  image: "/custom-og-image.jpg",
});
```

### 新增結構化資料

```javascript
import StructuredData from "../components/StructuredData";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  // ... 其他結構化資料
};

return (
  <>
    <StructuredData data={structuredData} />
    {/* 頁面內容 */}
  </>
);
```

## 📁 新增的檔案

- `app/sitemap.xml/route.js` - 動態生成 sitemap
- `app/robots.txt/route.js` - robots.txt 設定
- `app/components/StructuredData.js` - 結構化資料組件
- `lib/seo.js` - SEO 工具函數
- `public/manifest.json` - PWA manifest
- `.env.example` - 環境變數範例

## 🔒 不需要 SEO 設定的頁面

以下頁面不需要 SEO 優化，因為需要登入才能訪問或為私人內容：

- `/dashboard` - 個人儀表板（需要登入）
- `/admin` - 管理頁面（需要登入）
- `/auth/signin` - 登入頁面（已設定 noindex）
- `/auth/error` - 登入錯誤頁面
- 任何受 `AuthGuard` 保護的頁面

這些頁面通常設定 `robots: { index: false }` 或完全不設定 metadata。

## 🎯 需要手動設定的項目

1. **圖片資源**：

   - `/og-image.jpg` - 主要 Open Graph 圖片
   - `/og-about.jpg` - 關於頁面圖片
   - `/og-dashboard.jpg` - 儀表板圖片
   - `/logo.png` - 網站 Logo
   - `/icons/` 資料夾內的 PWA 圖示

2. **Google Search Console**：

   - 驗證網站所有權
   - 提交 sitemap
   - 監控搜尋表現

3. **社群媒體**：
   - 設定 Facebook 應用程式
   - 設定 Twitter 應用程式
   - 測試 Open Graph 預覽

## 🔍 SEO 檢查清單

- [ ] 設定正確的環境變數
- [ ] 新增所需的圖片資源
- [ ] 測試 sitemap.xml 和 robots.txt
- [ ] 驗證結構化資料
- [ ] 檢查 Open Graph 預覽
- [ ] 確認頁面載入速度
- [ ] 測試行動裝置友善性

## 📊 SEO 工具推薦

- Google Search Console
- Google PageSpeed Insights
- Facebook Sharing Debugger
- Twitter Card Validator
- Schema.org Validator
- Lighthouse (內建於 Chrome DevTools)

## 🚀 部署注意事項

部署到生產環境時，記得：

1. 更新 `NEXT_PUBLIC_SITE_URL` 為正確的網域
2. 設定 Google 驗證碼
3. 檢查所有圖片路徑是否正確
4. 測試 sitemap 和 robots.txt 是否可訪問
