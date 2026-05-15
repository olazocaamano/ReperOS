# 🎵 ReperOS Web

A highly responsive, production-focused single-page application engineered for performing musicians and live audio bands to streamline master song-list repositories, manage key/BPM performance constraints, and generate polished, print-ready show manifests.

<p align="left">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite Engine" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Deployment" />
  <img src="https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge" alt="MIT License" />
</p>

---

## 🚀 Key Architectural Features

* **Dynamic Repertoire Mutation:** Seamlessly write, update, and filter tracking variables including: Title, **Artist/Brand Credits**, **BPM Cadence**, Key signatures, Vocal profile ranges, and structural arrangement metadata.
* **Isolated Setlist Workspaces:** Spin up independent gig/show timelines to stage or pull tracks out of the master index array into standalone live performance sequences.
* **High-Contrast Vector PDF Engine:** Bypasses unpredictable raster canvas captures to assemble standardized **US Letter (8.5" x 11")** print layouts with vector text shapes. Guarantees an immaculate **pure white paper backdrop layout** even when the operational UI runs on high-contrast dark mode.
* **State Serialization Snapshots:** Complete native JSON system backup utilities. Export your local dataset configuration state into compressed `.json` structural file schemas and immediately seed the active application cache on any secondary device.
* **Zero-Latency Data Persistence:** Strategic integration of localized browser runtime caches (`LocalStorage`). Your system workflow modifications persist instantly across manual window reloads, hardware dropouts, or disconnected offline environments.

---

## 🛠️ Technology Ecosystem Stack

* **React 18** — Component-driven operational architecture handling predictable state rendering trees.
* **Vite** — Optimized Next-Gen build pipeline and zero-latency Hot Module Replacement (HMR).
* **Tailwind CSS v4** — Declarative utility-first atomic CSS styling system powering adaptive dark mode rendering.
* **Lucide React** — Crisp, performant, and lightweight scalable vector layout iconography.
* **jsPDF** — Programmatic multi-page binary document layout generation and direct file system downloads.

---

## 📦 Local Workspace Bootstrapping

Ensure you have [Node.js](https://nodejs.org/) installed on your host machine. Execute these terminal primitives to spin up the local environment:

```bash
# 1. Clone the version-controlled repository system
git clone [https://github.com/YOUR_ACCOUNT/ReperOSWeb.git](https://github.com/YOUR_ACCOUNT/ReperOSWeb.git)

# 2. Navigate straight into the project root folder tree
cd ReperOSWeb

# 3. Pull required external dependency packages from the NPM registry
npm install

# 4. Initialize the localized hot-reloading development server
npm run dev