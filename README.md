# 🌟 Ryan's Personal Dashboard & Live Clock

> A sleek, modern personal dashboard featuring real-time precision digital clock, dynamic greetings, interactive theme accents, and glassmorphic aesthetics.

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://meryan-421.github.io/Course_pratice/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/vanilla-JS-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/style-Glassmorphism-purple.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Responsive](https://img.shields.io/badge/design-Responsive-success.svg)](#)

🚀 **Live Demo**: [https://meryan-421.github.io/Course_pratice/](https://meryan-421.github.io/Course_pratice/)

---

## ✨ Features

- **🕒 Precision Live Clock**:
  - Displays hours, minutes, and seconds with sub-second accuracy and smooth animated second-progress bar.
  - One-click toggle between **12-Hour** (with AM/PM badge) and **24-Hour** formats.
  - Toggle seconds visibility on/off for minimalist viewing.
  - Displays full localized date and detected timezone (with UTC offset).

- **👤 Personalized Profile**:
  - Prominently displays user name (**Ryan**) and avatar initials badge (**RY**).
  - Dynamic time-of-day greeting (e.g., `🌅 Good morning, Ryan`, `☀️ Good afternoon, Ryan`, `🌆 Good evening, Ryan`).
  - Interactive profile editor (click name, bio, or avatar badge to edit).
  - Instant persistence across browser sessions via `localStorage`.

- **🎨 Glassmorphic Dark UI & Ambient Lighting**:
  - Modern deep-space dark background with ambient floating neon glow orbs.
  - Frosted glass container (`backdrop-filter: blur(28px)`).
  - **5 Curated Accent Themes**:
    - 🟣 **Aurora** (Violet / Indigo)
    - 🔵 **Cyber Cyan** (Electric Blue)
    - 🟢 **Emerald** (Lush Mint)
    - 🔴 **Sunset Rose** (Coral Magenta)
    - 🟡 **Amber Gold** (Warm Glow)

- **⚡ Quick Tools & Utilities**:
  - **Copy Time**: Instantly copy formatted timestamp to clipboard with visual toast notification.
  - **Zero Dependencies**: Pure HTML5, Vanilla CSS, and JavaScript.

---

## 🛠️ Tech Stack

- **Structure**: Semantic HTML5 with accessibility attributes (`aria-*`, `role`).
- **Styling**: Vanilla CSS with custom CSS variables, flexbox, CSS keyframe animations, and glassmorphism.
- **Typography**: 
  - [Outfit](https://fonts.google.com/specimen/Outfit) (Headings & UI)
  - [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Tabular numbers for jitter-free clock digits)
- **Logic**: Vanilla JavaScript (ES6+) utilizing `requestAnimationFrame` and the Web Storage API.

---

## 📂 Project Structure

```text
Course_pratice/
├── index.html       # Main HTML markup & structure
├── styles.css       # Design tokens, themes, animations & responsive styling
├── app.js           # Clock logic, theme switching & localStorage state
└── README.md        # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/MERYAN-421/Course_pratice.git
cd Course_pratice
```

### 2. Run locally
Since this is a lightweight frontend application with no build step required, you can view it directly:

- **Directly open**: Double-click `index.html` in your file explorer.
- **Using Python HTTP Server**:
  ```bash
  python -m http.server 8080
  ```
  Then visit [http://localhost:8080](http://localhost:8080) in your browser.

- **Using VS Code Live Server**: Right-click `index.html` and select **"Open with Live Server"**.

---

## ⚙️ Configuration & Customization

All personal details can be customized directly in the UI or modified in the source code:

- **Change Name & Bio**: Click on the name or tagline on the page, or modify the initial state in `app.js`.
- **Change Default Theme**: Change the `data-theme` attribute on the `<body>` tag in `index.html` or adjust `state.theme` in `app.js`.

---

## 👤 Author

**Ryan**
- GitHub: [@MERYAN-421](https://github.com/MERYAN-421)

---

## 📄 License

This project is licensed under the MIT License.
