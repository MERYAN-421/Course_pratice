# 🌟 Ryan's Personal Page & Live Clock (DIC-1 Coursework)

> 國立中興大學 電機工程學系 (NCHU EE) — 個人首頁與即時高精度儀表板。具備強化式學習研究規劃、核心專業技能展示、毛玻璃深色美學與 5 款動態主題。

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://meryan-421.github.io/Course_pratice/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Course__pratice-blue.svg)](https://github.com/MERYAN-421/Course_pratice)
[![Vanilla JS](https://img.shields.io/badge/vanilla-JS-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/style-Glassmorphism-purple.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Responsive](https://img.shields.io/badge/design-Responsive-success.svg)](#)

---

## 🌐 繳交連結 (Submission URLs)

- 🔗 **① GitHub Repository**: [https://github.com/MERYAN-421/Course_pratice](https://github.com/MERYAN-421/Course_pratice)
- 🚀 **② Live Website (GitHub Pages)**: [https://meryan-421.github.io/Course_pratice/](https://meryan-421.github.io/Course_pratice/)

---

## ✅ DIC-1 作業基本要求達成清單 (Requirement Checklist)

| 項目 | 作業要求 | 實作成果說明 | 狀態 |
| :--- | :--- | :--- | :---: |
| **👤 1. Profile** | 姓名、Avatar、科系/專長、簡短自我介紹 | **姓名**：Ryan<br>**照片**：專屬高質感頭像（支援失敗回退）<br>**科系**：國立中興大學 電機工程學系<br>**專長**：強化式學習 (RL)、電機工程、足球運動 ⚽<br>**簡介**：「國立中興大學電機工程學系。專注於強化式學習演算法與智慧系統，球場上熱血的進攻核心 ⚽。老師教很好，感謝～！」 | **100% 達成** |
| **🛠 2. Skills** | 至少列出 3 項技能 | 列出 4 大技能卡片：<br>1. **Python & PyTorch** (強化學習、數值運算、演算法)<br>2. **C / C++ & 電機工程基礎** (嵌入式、微處理器)<br>3. **Web 開發 & Git / GitHub** (HTML5/CSS3/JS, 版本控制)<br>4. **足球競技 & 團隊合作** (戰術跑位、團隊協作、高敏捷力) | **100% 達成** |
| **🚀 3. Projects** | 至少介紹 1 個作品或專案 | 展示 2 項精選作品：<br>1. **DIC-1 Personal Dashboard & Live Clock** (已上線，附 Live Demo 與 GitHub 連結)<br>2. **RL Agent Playground** (本學期規劃進行之深度強化學習智慧自律代理人專案) | **100% 達成** |
| **🕐 4. Live Clock** | JavaScript 即時時鐘 (HH:MM:SS) 自動更新 | 具備毫秒級 `requestAnimationFrame` 即時更新時鐘、分秒行進進度條、12H/24H 雙模式即時切換、秒數開關、AM/PM 標籤與時區顯示。 | **100% 達成** |
| **🎨 5. Personal Design** | 個人化風格、色彩、字型、背景、動畫 | 採用深色現代毛玻璃 (Glassmorphism)、動態浮動光暈動畫 (Orb Animation)、Google Fonts (`Outfit`, `Noto Sans TC`, `JetBrains Mono`) 與無跳動等寬數字排版。 | **100% 達成** |

---

## ⭐ Bonus Challenges (加分項目實作)

- 🌅 **動態時段問候語**：依當前時間自動切換 `🌅 Good morning`、`☀️ Good afternoon`、`🌆 Good evening`、`🌙 Good night`，並附帶個人稱呼。
- 🔄 **12H / 24H 雙模式切換**：點擊即可無縫切換 12 小時制（含 AM/PM 徽章）與 24 小時制。
- 🌍 **時區自動偵測**：透過 `Intl.DateTimeFormat` 自動偵測本機時區與 UTC 偏移量（例如 `UTC+8 • Taipei Standard Time`）。
- 📋 **一鍵複製時間戳記**：提供快捷複製按鈕，點擊後自動寫入剪貼簿並彈出 Toast 通知。
- ✏️ **線上個人資料編輯**：點擊姓名、自介或大頭貼徽章即可開啟編輯彈窗，即時修改資料。
- 💾 **LocalStorage 狀態保存**：自動記憶姓名、自介、12/24H 喜好、秒數顯示狀態與主題配色。
- 🎨 **5 款精心調配動態主題**：
  - 🟣 **Aurora**（極光紫）
  - 🔵 **Cyber Cyan**（賽博藍）
  - 🟢 **Emerald**（翡翠綠）
  - 🔴 **Sunset Rose**（暮光玫）
  - 🟡 **Amber Gold**（曜石金）
- 📱 **全響應式跨裝置排版**：從手機、平板到大螢幕桌機皆享有流暢沉浸式體驗。

---

## 📂 專案檔案架構 (File Structure)

```text
Course_pratice/
├── index.html       # 語意化 HTML5 架構 (導覽列、個人簡介、時鐘、技能、專案、頁尾)
├── styles.css       # 設計權杖、毛玻璃深色主題、動態光暈動畫與響應式佈局
├── app.js           # 高精度時鐘排程、Scrollspy 導覽、主題切換、LocalStorage 狀態維護
├── avatar.jpg       # Ryan 專屬個人頭像相片
└── README.md        # 完整作業說明與繳交報告
```

---

## 🚀 本地開發與預覽 (Local Preview)

本專案為輕量純前端架構，無需任何建置步驟：

1. **直接開啟**：在檔案總管雙擊 `index.html` 即可於瀏覽器開啟。
2. **透過 Python 伺服器**：
   ```bash
   python -m http.server 8080
   ```
   瀏覽器開啟：[http://localhost:8080](http://localhost:8080)
3. **VS Code Live Server**：右鍵點擊 `index.html` 選擇 **"Open with Live Server"**。

---

## 👤 作者資訊 (Author)

**Ryan**
- 學校/系所：國立中興大學 電機工程學系 (NCHU EE)
- GitHub：[@MERYAN-421](https://github.com/MERYAN-421)
- 專案倉庫：[Course_pratice](https://github.com/MERYAN-421/Course_pratice)

---

## 📄 授權條款 (License)

本專案採用 MIT License 開源授權。
