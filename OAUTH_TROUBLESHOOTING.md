# OAuth 登入問題排除指南

## 常見 Google OAuth 錯誤

### 1. "invalid_client" 錯誤
**錯誤訊息**: `The OAuth client was not found. 錯誤代碼 401: invalid_client`

**可能原因**:
- Google Client ID 或 Client Secret 不正確
- 授權重新導向 URI 不匹配
- OAuth 應用程式未正確設定

**解決方案**:
1. 確認 `.env.local` 中的 `GOOGLE_CLIENT_ID` 和 `GOOGLE_CLIENT_SECRET` 正確
2. 在 Google Cloud Console 中檢查「Authorized redirect URIs」必須包含：
   - `http://localhost:3003/api/auth/callback/google`
3. 確認 `NEXTAUTH_URL` 與當前運行的端口匹配

### 2. Next.js Image 域名錯誤
**錯誤訊息**: `hostname "lh3.googleusercontent.com" is not configured under images`

**解決方案**: 已在 `next.config.mjs` 中配置以下域名：
- `lh3.googleusercontent.com` (Google 頭像)
- `avatars.githubusercontent.com` (GitHub 頭像)
- `platform-lookaside.fbsbx.com` (Facebook 頭像)
- `graph.facebook.com` (Facebook Graph API)

### 3. 端口變更問題
當開發伺服器端口改變時，需要同時更新：
1. `.env.local` 中的 `NEXTAUTH_URL`
2. Google Cloud Console 中的授權重新導向 URI
3. 其他 OAuth 提供商的回調 URL

## 測試檢查清單

### Google OAuth 測試
- [ ] 確認 Google Cloud Console 專案設定正確
- [ ] 確認 OAuth 2.0 客戶端 ID 設定正確
- [ ] 確認授權重新導向 URI 包含正確的端口
- [ ] 確認 `.env.local` 中的憑證正確
- [ ] 測試登入流程是否正常

### 其他提供商
- [ ] GitHub: 確認 callback URL 為 `http://localhost:3003/api/auth/callback/github`
- [ ] Facebook: 確認 redirect URI 為 `http://localhost:3003/api/auth/callback/facebook`

## 偵錯技巧

1. **檢查 Network 標籤**: 查看 OAuth 請求是否成功
2. **檢查 Console 錯誤**: 注意 JavaScript 錯誤訊息
3. **確認環境變數**: 重啟開發伺服器後環境變數才會生效
4. **檢查 NextAuth 配置**: 確認 `app/api/auth/[...nextauth]/route.js` 設定正確
