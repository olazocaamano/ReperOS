# 🎵 ReperOS Cross-Platform Ecosystem

A highly responsive, production-focused single-page application and native mobile ecosystem engineered for performing musicians and live audio bands to streamline master song-list repositories, manage key/BPM performance constraints, and generate polished, print-ready show manifests.

<p align="left">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite Engine" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/Capacitor-6.x-119EFF?style=for-the-badge&logo=capacitor&logoColor=white" alt="Capacitor Mobile" />
  <img src="https://img.shields.io/badge/Android_APK-Natively_Supported-3DDC84?style=for-the-badge&logo=android&logoColor=black" alt="Android Support" />
  <img src="https://img.shields.io/badge/Firebase_Firestore-Cloud_Sync-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Engine" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Deployment" />
</p>

---

## 📚 Table of Contents

- [🚀 Key Architectural Features](#-key-architectural-features)
- [📂 Repository Structural Layout](#-repository-structural-layout)
- [💾 Core Data Model Interface Specs](#-core-data-model-interface-specs)
- [🛠️ Technology Ecosystem Stack](#️-technology-ecosystem-stack)
- [📦 Local Workspace Bootstrapping](#-local-workspace-bootstrapping)
- [🤖 Native Android APK Compilation Pipeline](#-native-android-apk-compilation-pipeline)
- [☁️ Cloud Production Web Deployment](#️-cloud-production-web-deployment)
- [🗺️ Future Roadmap Architecture](#️-future-roadmap-architecture)

---

## 🚀 Key Architectural Features

### Dynamic Repertoire Mutation
Seamlessly write, update, and filter tracking variables including:

- Title
- Artist / Brand Credits
- BPM Cadence
- Key Signatures
- Vocal Profile Ranges
- Structural Arrangement Metadata

---

### Isolated Setlist Workspaces
Spin up independent gig/show timelines to stage or pull tracks out of the master index array into standalone live performance sequences.

---

### High-Contrast Vector PDF Engine
Bypasses unpredictable raster canvas captures to assemble standardized **US Letter (8.5" × 11")** print layouts with vector text rendering.

Features:

- Pure white printable background
- Dark mode independent output
- High-fidelity typography
- Professional print-ready formatting

---

### Cross-Platform Native Runtime (Capacitor Engine)
Wraps the optimized web compilation distribution layer into a native Android container pipeline to assemble fully standalone, high-performance installable `.apk` packages.

---

### Real-Time Cloud Synchronization (Firebase Firestore)
Migrated from static local persistence layers to high-availability distributed document databases.

Capabilities include:

- Multi-device synchronization
- Instant cloud updates
- Automatic data replication

---

### Robust Offline Resiliency Cache
Strategic activation of Firestore persistent local cache mechanisms:

- `persistentLocalCache`
- `persistentMultipleTabManager`

This enables:

- Full read/write capability without internet
- Local change queueing
- Automatic synchronization when connectivity returns

Ideal for:

- Live stages
- Underground venues
- Basements
- Remote rehearsal environments

---

## 📂 Repository Structural Layout

```text
ReperOSWeb/
├── android/
│   └── app/src/main/res/
│       ├── mipmap/
│       ├── drawable/
│       └── values/
│
├── assets/
│   ├── icon-only.png
│   └── splash.png
│
├── src/
│   ├── components/
│   │   ├── Inventory.jsx
│   │   └── SetlistBuilder.jsx
│   │
│   ├── context/
│   │   └── RepertoireContext.jsx
│   │
│   ├── App.jsx
│   ├── firebase.js
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── capacitor.config.json
├── vite.config.js
└── README.md
```

---

## 💾 Core Data Model Interface Specs

Backup workflows compile arrays into portable `.json` snapshot packages using the following TypeScript structures:

```typescript
interface SongObject {
  id: string;
  name: string;
  artist?: string;
  key?: string;
  bpm?: number;
  voiceType: string;
}

interface SetlistObject {
  id: string;
  name: string;
  songs: SongObject[];
}
```

---

## 🛠️ Technology Ecosystem Stack

### Frontend

- React 18
- Vite 5
- Tailwind CSS v4
- Lucide React

---

### Native Mobile Layer

- Capacitor v6
- Android Studio
- Gradle Build System

---

### Cloud Infrastructure

- Firebase Firestore
- Firestore Offline Persistence
- Vercel Deployment

---

### Utilities

- jsPDF
- JSON Import / Export
- Context API

---

## 📦 Local Workspace Bootstrapping

Make sure you have installed:

- Node.js
- npm
- Android Studio (optional for APK builds)

---

### 1. Clone the Repository

```bash
git clone https://github.com/olazocaamano/ReperOS.git
```

---

### 2. Enter Project Directory

```bash
cd ReperOSWeb
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start Development Server

```bash
npm run dev
```

---

## 🤖 Native Android APK Compilation Pipeline

### 1. Build Production Bundle

```bash
npm run build
```

---

### 2. Sync with Capacitor

```bash
npx cap sync
```

---

### 3. Open Android Studio

```bash
npx cap open android
```

---

### Export APK from Android Studio

1. Wait for Gradle sync to complete.
2. Open the **Main Menu** (☰).
3. Navigate to:

```text
Build → Build Bundle(s) / APK(s) → Build APK(s)
```

4. When complete, click:

```text
locate
```

to access:

```text
app-debug.apk
```

---

## ☁️ Cloud Production Web Deployment

Deploy the web application using **Vercel**.

### Install Vercel CLI

```bash
npm install -g vercel
```

---

### Deploy

```bash
vercel --prod
```

---

## 🗺️ Future Roadmap Architecture

### Completed

- [x] High-performance jsPDF export engine
- [x] Firebase Firestore cloud synchronization
- [x] Native Capacitor Android support
- [x] Persistent offline cache
- [x] Multi-device synchronization

---

### Planned

- [ ] Drag-and-drop setlist sorting with `@hello-pangea/dnd`
- [ ] Automatic set duration calculations
- [ ] Song metadata tags
- [ ] Smart search filters
- [ ] Export to CSV
- [ ] iOS Capacitor support

---

## 📄 License

This project is intended for educational and professional portfolio purposes.

---

## ⭐ Support

If you find this project useful, consider giving the repository a star.

```bash
https://github.com/olazocaamano/ReperOS
```