# Boumiza Square — Digital Experience

Welcome to the official web application repository for **Boumiza Square**, the premier destination for luxury, gastronomy, and entertainment in Sousse. 

This repository contains the source code for our next-generation digital experience—a highly interactive, multilingual, and mobile-optimized Single Page Application (SPA).

## ✨ Key Features

* **Progressive Web App (PWA)**: Installable directly to mobile devices with offline caching for rapid access.
* **Immersive 3D Hero**: Powered by Three.js and custom GLSL shaders, featuring an interactive terrain animation ("GLSL Hills") that responds to user input without sacrificing performance.
* **Interactive Floor Plan**: A custom scalable vector map allowing visitors to explore store layouts, view details dynamically, and navigate the mall directory instantly.
* **Multilingual Architecture**: Full content localization implemented natively without external libraries, supporting **French, English, and Arabic (RTL)**.
* **Dynamic Deep-Linking**: A custom hash-based routing engine providing specific SEO-friendly URLs for individual brands (e.g., `#/enseigne/okaya`).
* **Modern Design System**: Styled with CSS variables utilizing our "Warm Dusk" palette (sophisticated navy with amber gold accents) and rich glassmorphism UI elements.
* **High Performance**: Built with Vite and hardware-accelerated GSAP animations to deliver cinematic fluid transitions.

## 🛠 Tech Stack

* **Core**: HTML5, Vanilla JavaScript (ES Modules), Vanilla CSS3.
* **Build Tool**: [Vite](https://vitejs.dev/) for blazing-fast Hot Module Replacement (HMR) and optimized production builds.
* **Animation**: [GSAP (GreenSock)](https://gsap.com/) for scroll reveals and layout transitions.
* **3D Graphics**: [Three.js](https://threejs.org/) for WebGL shader rendering.
* **Icons**: [Lucide Icons](https://lucide.dev/).

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (or download the source code):
   ```bash
   git clone <repository-url>
   cd WebSiteV2
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   *The application will be accessible at `http://localhost:3000` (or the port specified by Vite).*

### Build for Production

To compile traditional, minified assets ready for deployment:

```bash
npm run build
```
This generates a `dist` folder containing the optimized production application.

## 📂 Project Structure

```text
BoumizaSquare/
├── index.html          # Main HTML entrypoint
├── package.json        # Dependencies & NPM scripts
├── netlify.toml        # Netlify deployment configuration
├── public/             # Static assets (images, PWA manifest, service worker)
└── src/
    ├── main.js         # Application bootstrap & PWA registration
    ├── style.css       # Core design system and utility classes
    ├── data.js         # Single source of truth for brands, services, and promotions
    ├── router.js       # Custom SPA routing logic
    ├── i18n/           # Translation JSON files (fr.json, en.json, ar.json)
    ├── components/     # Reusable UI components (e.g., GLSL shaders, Canvas logic)
    └── pages/          # Page rendering logic (Home, Enseignes, Plan, Brand Details, etc.)
```

## ☁️ Deployment

This project is configured out-of-the-box for [Netlify](https://www.netlify.com/).

The included `netlify.toml` automatically establishes:
- The build command (`npm run build`)
- The target publish directory (`dist`)
- Catch-all fallback routing (`/* -> /index.html`) required for SPAs.

Simply push this repository to GitHub/GitLab and link it to your Netlify account to instantly deploy the latest changes via Continuous Integration (CI).

## 📝 Authors

Built specifically for the Boumiza Square ecosystem.

---
*© 2026 Boumiza Square — Tous droits réservés.*
