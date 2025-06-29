# 測試用 OAuth 憑證設定指南

## 快速測試 GitHub 登入功能

如果您想立即測試登入功能，請按照以下步驟設定 GitHub OAuth：

### 1. 創建 GitHub OAuth App

1. 前往 https://github.com/settings/developers
2. 點擊「New OAuth App」
3. 填入以下資訊：
   - **Application name**: `個人成長管理系統`
   - **Homepage URL**: `http://localhost:3002`
   - **Authorization callback URL**: `http://localhost:3002/api/auth/callback/github`
4. 點擊「Register application」

### 2. 獲取憑證

註冊後，您會看到：

- **Client ID**: 複製此值
- **Client Secret**: 點擊「Generate a new client secret」並複製

### 3. 更新環境變數

在 `.env.local` 文件中替換：

```bash
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### 4. 重啟服務器

```bash
npm run dev
```

### 5. 測試登入

1. 訪問 http://localhost:3002
2. 點擊右上角的「登入」按鈕
3. 選擇「使用 GitHub 登入」
4. 完成 GitHub 授權流程

### 注意事項

- GitHub OAuth App 只能在 `http://localhost:3002` 上工作
- 如果需要部署到正式環境，需要更新 callback URL
- Google 和 Facebook 登入需要額外的設定步驟

## 其他提供商設定

詳細的 Google 和 Facebook OAuth 設定請參考主要的 README.md 文件。
