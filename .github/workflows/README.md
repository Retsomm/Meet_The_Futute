# GitHub Actions 工作流程

## 當前配置

### CI/CD Pipeline (`ci-cd.yml`)

- **觸發條件：**
  - Push 到 `main` 或 `master` 分支 → 生產部署
  - Pull Request 到 `main` 或 `master` 分支 → 預覽部署

### 工作流程步驟

#### 1. Test Job

- 程式碼檢查
- 安裝依賴
- ESLint 檢查
- 專案建置

#### 2. Deploy Preview (僅 PR)

- 部署到 Vercel 預覽環境
- 自動在 PR 中留言預覽連結

#### 3. Deploy Production (僅 Push)

- 部署到 Vercel 生產環境
- 僅在 push 到主分支時觸發

## 問題解決

✅ **已解決重複部署問題**

- 移除了重複的工作流程文件
- 現在每次提交只會觸發一次部署

## 環境變數設定

確保在 GitHub Secrets 中設定以下變數：

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
