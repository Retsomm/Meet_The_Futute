# GitHub Actions 自動部署到 Vercel 設定指南

## 前置作業

### 1. 安裝 Vercel CLI

```bash
npm install -g vercel@latest
```

### 2. 登入 Vercel

```bash
vercel login
```

### 3. 在專案根目錄執行 Vercel 初始化

```bash
vercel
```

按照提示完成設定。

### 4. 取得必要的 Token 和 ID

#### 取得 Vercel Token

1. 前往 [Vercel Dashboard](https://vercel.com/account/tokens)
2. 點擊 "Create Token"
3. 輸入 Token 名稱 (例如: `github-actions-token`)
4. 選擇過期時間
5. 複製產生的 Token

#### 取得 Vercel Organization ID 和 Project ID

執行以下命令來取得 ID：

```bash
vercel ls
```

或者查看 `.vercel/project.json` 檔案：

```bash
cat .vercel/project.json
```

你會看到類似以下的內容：

```json
{
  "orgId": "your-org-id",
  "projectId": "your-project-id"
}
```

### 5. 設定 GitHub Secrets

前往你的 GitHub repository，點擊 **Settings** > **Secrets and variables** > **Actions**，然後新增以下 secrets：

- `VERCEL_TOKEN`: 在步驟 4 中取得的 Vercel Token
- `VERCEL_ORG_ID`: 你的 Vercel Organization ID
- `VERCEL_PROJECT_ID`: 你的 Vercel Project ID

## 工作流程說明

### 檔案結構

```
.github/
└── workflows/
    ├── deploy.yml                    # 統一部署工作流程 (第一個版本)
    ├── vercel-production.yml         # 生產環境部署
    └── vercel-preview.yml            # 預覽環境部署
```

### 工作流程觸發條件

- **Production 部署**: 當 code 推送到 `main` 或 `master` 分支時
- **Preview 部署**: 當建立 Pull Request 到 `main` 或 `master` 分支時

### 環境變數

如果你的專案需要環境變數，請在 Vercel Dashboard 中設定：

1. 前往 [Vercel Dashboard](https://vercel.com/dashboard)
2. 選擇你的專案
3. 點擊 **Settings** > **Environment Variables**
4. 新增必要的環境變數

## 常見問題

### Q: 部署失敗怎麼辦？

1. 檢查 GitHub Actions 的執行日誌
2. 確認所有 Secrets 都已正確設定
3. 確認 Vercel Token 有足夠的權限
4. 檢查專案的 `vercel.json` 配置是否正確

### Q: 如何查看部署狀態？

1. 前往 GitHub repository 的 **Actions** 頁面
2. 查看最新的 workflow 執行狀態
3. 或前往 Vercel Dashboard 查看部署歷史

### Q: 如何修改部署設定？

編輯 `.github/workflows/` 目錄下的 YAML 檔案，根據需要調整觸發條件、環境變數或建置步驟。

## 進階設定

### 自訂建置命令

如果需要自訂建置命令，可以修改 `vercel.json`：

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

### 分支保護

建議設定分支保護規則，確保只有通過 CI/CD 檢查的 code 才能合併到主分支。

---

## 支援

如果遇到問題，請參考：

- [Vercel 官方文檔](https://vercel.com/docs)
- [GitHub Actions 文檔](https://docs.github.com/en/actions)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)
