# ShiftMaster Pro - 專業超勤加班費試算工具

ShiftMaster Pro 是一款專為台灣需輪班之公務人員（如警察、消防員）設計的 PWA (漸進式網頁應用程式)。它能協助使用者快速計算每月的工時、超勤時數以及加班費金額，並提供視覺化的進度追蹤，確保能達到每月的加班費上限目標。

## 🌟 主要功能

### 1. 彈性工時規則設定
*   可自訂各類班別的時數權重：
    *   **正常班** (預設 20H，可調整)
    *   **外宿班** (預設 12H，可調整)
    *   **補休** (預設 12H，可調整)

### 2. 直覺的排班輸入
*   只需輸入該月各類班別的天數（正常班、外宿班、補休、加休）。
*   **即時檢核**：系統會自動計算目前總天數，若未達每月應上班天數，會以紅色警示提醒。

### 3. 即時加班費試算
*   **自動計算**：根據輸入的參數，立即算出總工時與可報超勤時數。
*   **目標追蹤**：設定每月超勤金額上限（例如 $19,000），系統會顯示：
    *   目前的達成進度（百分比進度條）。
    *   還差多少金額/時數才能達標。
    *   達標後，自動顯示剩餘可存的時數。

### 4. PWA 行動裝置支援
*   **安裝免商店**：支援加入 iOS 與 Android 主畫面，操作體驗如原生 App。
*   **離線支援**：具備 Service Worker 快取功能，在網路不穩時仍可開啟介面查看。

## 🛠️ 技術架構

本專案使用現代化前端技術構建，確保極致的效能與開發體驗：

*   **核心框架**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **建置工具**: [Vite](https://vitejs.dev/)
*   **樣式設計**: [Tailwind CSS](https://tailwindcss.com/)
*   **圖示庫**: [Lucide React](https://lucide.dev/)
*   **PWA**: Web App Manifest + Service Worker

## 🚀 快速開始

### 本機開發

1.  **安裝依賴**
    ```bash
    npm install
    ```

2.  **啟動開發伺服器**
    ```bash
    npm run dev
    ```

3.  **建置生產版本**
    ```bash
    npm run build
    ```

### 部署指南

本專案已設定好標準 Vite 結構，推薦使用 [Vercel](https://vercel.com/) 進行免費部署：

1.  將專案上傳至 GitHub。
2.  在 Vercel 匯入該 Repository。
3.  Vercel 會自動偵測 Vite 設定，點擊 Deploy 即可。
4.  部署完成後，即可獲得 HTTPS 網址，支援手機安裝 PWA。

## 📱 如何安裝到手機

*   **iOS (Safari)**: 點擊瀏覽器下方「分享」按鈕 → 選擇「加入主畫面」。
*   **Android (Chrome)**: 點擊瀏覽器右上角選單 → 選擇「安裝應用程式」或「加到主畫面」。

---

*Designed for productivity.*
