# Vue Core

A Vue 3 starter template with a pre-configured UI and developer experience stack.

## Tech Stack

- **Vue 3** with `<script setup>` SFC syntax
- **Vite** for fast dev server and build
- **PrimeVue 4** (Aura theme, zinc color preset) with auto-imported components
- **Tailwind CSS 4** with `tailwindcss-primeui` integration
- **Font Awesome 7** (free) for icons
- **Vue I18n** for internationalization (English, Bahasa Indonesia)

## Features

- **Dark Mode** — toggle with system preference detection and localStorage persistence, synced across PrimeVue and Tailwind via a shared CSS class selector
- **Internationalization** — locale auto-detection from browser, switchable at runtime, persisted to localStorage
- **Auto Imports** — Vue APIs and PrimeVue components are auto-imported (no manual import statements needed)
- **Custom PrimeVue Theme** — Aura base with a full zinc primary/surface palette for both light and dark schemes
- **CSS Layering** — ordered `theme, base, primevue` layers to keep style specificity predictable

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start dev server             |
| `npm run build`   | Build for production         |
| `npm run preview` | Preview production build     |

## Project Structure

```
src/
├── locales/            # i18n translation JSON files (en, id)
├── plugins/
│   ├── i18n.js         # Vue I18n configuration
│   └── primevue.js     # PrimeVue theme preset
├── utils/
│   └── composables/
│       └── useDarkMode.js  # Dark mode composable
├── App.vue             # Root component
├── main.js             # App entry point
└── style.css           # Tailwind + PrimeUI imports, dark mode variant
```
