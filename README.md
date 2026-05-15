# 🎵 ReperOS Web

A highly responsive, production-focused single-page application built to let performing musicians organize their core master song list data, manage tuning/key constraints, and generate optimized setlist exports for upcoming live events.

## 🚀 Key Architectural Features

- **Dynamic Repertoire Mutation:** Save, modify, and purge tracking data parameters including: Title, Key configurations, Genre definitions, Vocal profiles, and Arranging notes.
- **Setlist Workspace Assembly:** Spin up distinct workspaces to stack or pull tracks from the main inventory into show lineups.
- **High-Resolution Canvas Export:** Uses vector scaling mechanics to snap the current show line-up DOM node into pristine standalone PDF configurations.
- **State Serialization Backups:** Complete JSON import and export handling. Back up your dataset locally into explicit `.json` structure profiles and re-seed the environment onto any machine immediately without server dependency.
- **Zero-Latency Persistence:** Leverages localized browser state caches (`LocalStorage`) to keep workflows fluidly preserved during sudden dropouts or unexpected manual system reloads.

## 🛠️ Technology Ecosystem Stack

- **React 18** paired with **Vite** compilation runtimes.
- **Tailwind CSS v4** styling framework handling unified component design layers.
- **Lucide React** serving vector layout glyph instrumentation iconography.
- **html2canvas** + **jspdf** processing binary document compilation formats.

## 📦 Local Workspace Bootstrapping

Ensure you have [Node.js](https://nodejs.org/) up and configured. Follow these terminal actions:

```bash
# 1. Clone the repository system
git clone [https://github.com/YOUR_ACCOUNT/repertorio-musical-app.git](https://github.com/YOUR_ACCOUNT/repertorio-musical-app.git)

# 2. Enter into the tracking target project root directory
cd repertorio-musical-app

# 3. Pull required environment modules from package registries
npm install

# 4. Spin up localized hot-reloading development instances
npm run dev
```