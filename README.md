# Éther Phoenix Noir — Interactive 3D Motion Experience

An ultra-luxurious, immersive 3D WebGL perfume showcase web application built with **React**, **Three.js**, **GLSL Shaders**, **GSAP**, and **Tailwind CSS**.

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.169-black?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## ✨ Features

- 🌌 **3D Particle Morphing WebGL Scene**: Custom GPU vertex and fragment shaders with real-time morphing between perfume bottle geometries, ethereal smoke embers, and celestial rings.
- 📜 **Scroll-Driven Storytelling Timeline (350vh)**: Pinned hero viewport with synchronized GSAP animation triggers responding smoothly to scroll progress.
- ✍️ **Bespoke Engraving Atelier Studio**: Real-time 3D custom typography preview directly mapped onto the perfume flacon with dynamic gold foil styling.
- 🔺 **Interactive Olfactory Pyramid**: Interactive exploration of Top, Heart, and Base notes with instant WebGL particle burst flares.
- 🔥 **Custom Flame Particle Cursor**: Smooth physics-based interactive cursor trail with glowing amber embers.
- 🎵 **Spatial Soundscape & Audio System**: Interactive ambient audio and tactile sound effects powered by Web Audio synthesis.
- 🔮 **Scent Signature Quiz Modal**: Personalized questionnaire matching users to bespoke fragrance variants.
- 🛍️ **Luxury Sliding Cart Drawer**: Complete checkout preview with gift vault customization and engraving preservation.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://reactjs.org/) |
| **Build Tool** | [Vite 5](https://vitejs.dev/) |
| **3D & Graphics** | [Three.js](https://threejs.org/), Custom GLSL Shaders |
| **Animations** | [GSAP](https://greensock.com/gsap/), CSS Transitions |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), Custom Design System |
| **Icons & Effects** | [Lucide React](https://lucide.dev/), Canvas Confetti |

---

## 📁 Project Structure

```
project-3d-motion/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── App.jsx                       # Main application component & state
    ├── main.jsx                      # React DOM root entry
    ├── index.css                     # Global styles, fonts, and utilities
    ├── components/
    │   ├── Canvas/
    │   │   ├── MorphScene.jsx        # Three.js Canvas container & animations
    │   │   ├── Bottle3D.jsx          # 3D flacon geometry representation
    │   │   └── SceneBottleMesh.js    # Procedural mesh generation helpers
    │   ├── Hero/
    │   │   └── HeroOverlay.jsx       # Scroll timeline HUD and phase navigation
    │   ├── Navigation/
    │   │   ├── Navbar.jsx            # Luxury header navigation
    │   │   └── CustomCursor.jsx      # Interactive amber flame cursor
    │   ├── Sections/
    │   │   ├── OlfactoryPyramid.jsx  # Notes breakdown (Top, Heart, Base)
    │   │   ├── FlaconCraftsmanship.jsx# Craftsmanship showcase
    │   │   ├── EngravingStudio.jsx   # Live bottle engraving customizer
    │   │   ├── AlchemicalRitual.jsx  # Fragrance ritual & application guide
    │   │   └── ScentQuizModal.jsx    # Scent finder quiz modal
    │   └── Cart/
    │       └── CartDrawer.jsx        # Slide-over luxury shopping bag
    ├── shaders/
    │   └── particleShaders.js        # GLSL Vertex & Fragment shader sources
    └── utils/
        ├── audio.js                  # Web Audio synthesizers & sound effects
        ├── particleGeometry.js       # Mathematical point cloud generators
        └── particleTexture.js        # Dynamic particle canvas sprite generator
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Minahilmunir/project-3d-motion.git
   cd project-3d-motion
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173` to explore the experience.

---

## 📦 Build & Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
