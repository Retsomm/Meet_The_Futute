# 遇見未來的自己 - 個人成長目標管理系統

## ��� 項目概述

「遇見未來的自己」是一個專為有未來憧憬的人類設計的目標管理系統。透過可視化「現在的自己」與「未來的自己」之間的差距，幫助用戶建立更緊密的未來自我連結，減少拖延，提高生產力，加速個人成長的速度。

## ��� 核心理念

### 未來自我延續性理論

> **「你愈是把自己視為陌生人，你就愈有可能把相當於給陌生人的工作份量，丟給未來的自己；你也就愈有可能把事情拖到明天 ── 留給未來的自己去做。」**

### 研究基礎

研究證實，當我們把未來的自己想像成更好、更具生產力的版本時，就能激勵現在的我們做出對未來有益的行為。這個系統幫助用戶：

- ��� **建立連結**：加強現在與未來自己的情感連結
- ��� **量化進度**：透過子目標完成度量化成長差距
- ��� **具體目標**：將抽象的未來願景轉化為具體行動

## ✨ 主要功能

### 1. 引導式介紹頁面

- 精美的漸層設計風格
- 核心理念說明
- 未來自我延續性概念介紹
- 互動式現在/未來自己對比

### 2. 目標追蹤儀表板 (`/dashboard`)

- ��� **統計總覽**：總目標數、完成目標、整體進度、差距分析
- ��� **進度圖表**：柱狀圖和餅圖視覺化進度
- ��� **個人對比**：現在 vs 未來自己的詳細對比分析
- ��� **詳細進度**：每個目標的完整進度展示

### 3. 後台管理系統 (`/admin`)

- ➕ **目標創建**：建立新的成長目標
- ✏️ **目標編輯**：修改現有目標和子目標
- ✅ **進度更新**：標記子目標完成狀態
- ���️ **目標管理**：刪除不需要的目標

### 4. 深入了解頁面 (`/about`)

- ��� 未來自我延續性詳細解釋
- ��� 自我連結程度測評量表
- ��� 系統功能詳細說明
- ��� 預期效果介紹

## ��� 快速開始

### 安裝依賴

```bash
npm install
```

### 開發模式運行

```bash
npm run dev
```

### 訪問應用

打開瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

## ��� 產品定位

**人生規劃目標追蹤工具**

透過可視化「現在的自己」與「未來的自己」的差距（軟硬實力），讓兩者之間保持持續連結，從而：

- ⏰ **減少拖延**：不再把困難任務推給「未來的自己」
- ��� **提高生產力**：明確的目標和進度激勵行動
- ��� **加速成長**：量化的成長軌跡讓進步看得見

## 🔧 設定說明

### 設定環境變數

複製環境變數範本並填入您的配置：

```bash
cp .env.example .env.local
```

### OAuth 提供商設定

#### Google OAuth

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 創建新專案或選擇現有專案
3. 啟用 Google+ API
4. 前往「憑證」頁面，創建 OAuth 2.0 用戶端 ID
5. 設定授權重新導向 URI：`http://localhost:3002/api/auth/callback/google`
6. 將取得的 Client ID 和 Client Secret 填入 `.env.local`

#### Facebook OAuth

1. 前往 [Facebook Developers](https://developers.facebook.com/)
2. 創建新應用程式
3. 新增「Facebook 登入」產品
4. 在「Facebook 登入」設定中，新增有效的重新導向 URI：`http://localhost:3002/api/auth/callback/facebook`
5. 將應用程式 ID 和密鑰填入 `.env.local`

#### GitHub OAuth

1. 前往 GitHub Settings > Developer settings > [OAuth Apps](https://github.com/settings/developers)
2. 點擊「New OAuth App」
3. 填入應用程式資訊：
   - Application name: `個人成長管理系統`
   - Homepage URL: `http://localhost:3002`
   - Authorization callback URL: `http://localhost:3002/api/auth/callback/github`
4. 將 Client ID 和 Client Secret 填入 `.env.local`

© 2025 遇見未來的自己 - 為每一位對未來有憧憬的人類而設計
