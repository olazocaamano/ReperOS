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

## 📂 Repository Structural Layout

The system follows a clean modular component architecture separating application context layers from structural user interface cards:

```text
ReperOSWeb/
├── src/
│   ├── components/
│   │   ├── Inventory.jsx       # Master catalog list controller & backup manager
│   │   └── SetlistBuilder.jsx  # Active gig workspace & high-fidelity PDF canvas export
│   ├── context/
│   │   └── RepertoireContext.jsx # Global state engine wrapper using LocalStorage pipelines
│   ├── App.jsx                 # Base layout core container framework
│   ├── main.jsx                # Application build lifecycle mounting script
│   └── index.css               # Unified Tailwind CSS directive layers
├── public/                     # Static production asset directory
├── package.json                # Project environment layout dependency manifesto
└── vite.config.js              # Vite compiler optimization properties
```

---

## 💾 Core Data Model Interface Specs

When backup workflows compile arrays into external portable `.json` snapshot packages, objects adhere strictly to the following declarative TypeScript specification:

```typescript
interface SongObject {
  id: string;          // Cryptographically assigned unique primitive hash token
  name: string;        // Absolute Title of the performance asset
  artist?: string;     // Optional tracking string representing band/performer profile
  key?: string;        // Dynamic key tuning scale designation (e.g., "Am", "F#")
  bpm?: number;        // Quantifiable numerical cadence beat notation mapping variable
  voiceType: string;   // Structural vocal registry designation (e.g., "Tenor", "Soprano")
}

interface SetlistObject {
  id: string;          // Unique show timeline index sequence reference key
  name: string;        // Human-readable identifier designating show name or event date
  songIds: string[];   // Relational index pointers linking directly back to song array objects
}
```

---

## 🛠️ Technology Ecosystem Stack

* **React 18** — Component-driven operational architecture handling predictable state rendering trees.
* **Vite** — Optimized Next-Gen build pipeline and zero-latency Hot Module Replacement (HMR).
* **Tailwind CSS v4** — Declarative utility-first atomic CSS styling system powering adaptive dark mode rendering.
* **Lucide React** — Crisp, performant, and lightweight scalable vector layout iconography.
* **jsPDF** — Programmatic multi-page binary document layout generation and direct file system downloads.

---

## 📦 Local Workspace Bootstrapping

Ensure you have Node.js installed on your host machine. Execute these terminal primitives to spin up the local environment:

```bash
# 1. Clone the version-controlled repository system
git clone https://github.com/YOUR_ACCOUNT/ReperOSWeb.git

# 2. Navigate straight into the project root folder tree
cd ReperOSWeb

# 3. Pull required external dependency packages from the NPM registry
npm install

# 4. Initialize the localized hot-reloading development server
npm run dev
```

---

## ☁️ Cloud Production Deployment

The software is optimized to build as a zero-dependency, static client-side web application. To deploy your workspace safely into a public or private cloud pipeline using **Vercel**, deploy directly from the CLI toolchain:

```bash
# 1. Global installation of the cloud management client binaries
npm install -g vercel

# 2. Trigger automated cloud workspace setup routines
vercel
```

### Deployment Configuration Choices

When prompted by the interactive terminal workflow, configure the project utilizing these target configurations:

1. `Set up and deploy ...?` -> **`Y`** (or press `Enter`)
2. `Which scope...?` -> Press `Enter` to select your default user scope.
3. `Link to existing project?` -> **`N`** (Creates a brand new tracking instance)
4. `What’s your project’s name?` -> **`reperos`** *(Must be fully lowercase)*
5. `In which directory is your code located?` -> Press `Enter` to target current root `./`
6. `Want to override settings? / Change additional settings?` -> **`N`** *(Vercel will natively map the optimal Vite engine build scripts automatically)*

---

## 🗺️ Future Roadmap Architecture

* [x] High-performance native jsPDF layout generation overhaul.
* [x] Standard US Letter automated margin distribution refactor.
* [ ] Implement secure cloud account synchronization capabilities (Firebase/Supabase database integrations).
* [ ] Add interactive track sorting drag-and-drop interfaces using `@hello-pangea/dnd`.
* [ ] Include automated setlist time-duration summation metrics based on standard song tempos.