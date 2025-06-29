# OAuth 設定指南 - 修復 redirect_uri_mismatch 錯誤

## 問題分析

你遇到的 `redirect_uri_mismatch` 錯誤是因為 OAuth 應用程式中設定的重定向 URI 與實際請求的不匹配。

## 當前配置狀態 ✅

- ✅ NEXTAUTH_URL 已正確設定為 `http://localhost:3000`
- ✅ NextAuth 路由配置正確
- ✅ 環境變數格式正確

## 需要修復的部分

### 1. Google OAuth 設定（最重要！）

**前往 Google Cloud Console:**
https://console.cloud.google.com/

**步驟:**

1. 選擇你的專案
2. 前往 `APIs & Services` > `Credentials`
3. 找到你的 OAuth 2.0 Client ID: `402602348350-h52kb6pgsafoftlkeai6sh9ccf7u0bhn.apps.googleusercontent.com`
4. 點擊編輯
5. 在 **"Authorized redirect URIs"** 中確保包含以下兩個網址：
   ```
   http://localhost:3000/api/auth/callback/google
   https://meetthefuture.vercel.app/api/auth/callback/google
   ```

### 2. GitHub OAuth 設定

**前往 GitHub:**
https://github.com/settings/applications

**步驟:**

1. 找到你的 OAuth App
2. 在 "Authorization callback URL" 中設定：
   ```
   http://localhost:3000/api/auth/callback/github
   ```
3. 如果有生產環境，也添加：
   ```
   https://meetthefuture.vercel.app/api/auth/callback/github
   ```

### 3. Twitter/X OAuth 設定

**前往 Twitter Developer Portal:**
https://developer.twitter.com/en/portal/dashboard

**步驟:**

1. 選擇你的 App
2. 前往 "App settings" > "Authentication settings"
3. 在 "Callback URLs" 中添加：
   ```
   http://localhost:3000/api/auth/callback/twitter
   https://meetthefuture.vercel.app/api/auth/callback/twitter
   ```

## 測試步驟

1. **完成上述設定後**，重新啟動開發伺服器：

   ```bash
   npm run dev
   ```

2. **訪問登入頁面**：
   ```
   http://localhost:3001/auth/signin
   ```

3. **測試各個 OAuth 提供者**

## 常見問題

### Q: 為什麼需要兩個重定向 URI？

A: 一個用於本地開發 (`localhost:3000`)，一個用於生產環境 (`vercel.app`)

### Q: 設定後還是出現錯誤怎麼辦？

A:

1. 檢查 OAuth 應用程式的重定向 URI 是否完全匹配（包括 http/https）
2. 清除瀏覽器快取
3. 確保沒有防火牆阻擋

### Q: 如何確認設定是否正確？

A: 啟動開發伺服器後，檢查控制台的 debug 日誌，會顯示當前配置狀態

## 重要提醒

⚠️ **設定完成後需要等待幾分鐘讓變更生效**

⚠️ **確保重定向 URI 完全匹配，包括協議（http vs https）**

⚠️ **本地開發使用 http://localhost:3000，生產環境使用 https://your-domain.com**
