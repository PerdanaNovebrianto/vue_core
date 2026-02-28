# Vue Core

A Vue 3 starter template with a pre-configured UI and developer experience stack.

## Tech Stack

- **Vue 3** with `<script setup>` SFC syntax
- **Vite** for fast dev server and build
- **PrimeVue 4** (Aura theme) with auto-imported components
- **Tailwind CSS 4** with `tailwindcss-primeui` integration
- **Font Awesome 7** (free) for icons
- **Vue I18n** for internationalization (English, Bahasa Indonesia)
- **Vue Router 4** with lazy-loaded routes
- **Pinia** for centralized state management
- **Axios** for API communication with interceptors
- **Vuelidate** for reactive form validation
- **CryptoJS** for client-side payload/token utilities
- **vite-svg-loader** for inline SVG components

## Features

- **Dark Mode** — toggle with system preference detection and localStorage persistence, synced across PrimeVue and Tailwind via a shared CSS class selector
- **Theme Color Picker** — switch the entire app's primary and surface palette at runtime (zinc, slate, stone, blue, green, red, orange, amber, violet, rose) with localStorage persistence
- **Internationalization** — locale auto-detection from browser, switchable at runtime with a dropdown or compact flag toggle, persisted to localStorage
- **Store with Pinia** — session and state are handled in a dedicated store for easier route guard and component integration
- **Axios Plugin** — centralized request/response interceptors for token handling, consistent API config, and unified error flow
- **Vuelidate Forms** — schema-based, reactive validation for login and other form workflows
- **CryptoJS Helpers** — encryption/decryption helpers for sensitive client-side auth data handling
- **Auto Imports** — Vue APIs, vue-i18n, and composables are auto-imported; PrimeVue components resolve via `PrimeVueResolver`
- **Custom PrimeVue Theme** — Aura base with a dynamic `createPreset()` function that generates primary/surface palettes from any color name
- **CSS Layering** — ordered `theme, base, primevue` layers to keep style specificity predictable
- **unDraw Illustrations** — SVG illustrations with `currentColor` accent, dynamically themed via the `UndrawSvg` wrapper component

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
├── assets/                         # Assets directory
├── components/                     # Re-useable component directory
├── locales/                        # i18n translation JSON files (en, id)
├── pages/                          # Pages directory
├── plugins/                        # Plugins configuration directory
├── routes/                         # Routes directory
├── stores/                         # States management directory
├── utils/                          # Utilities directory (composables, constants, formatters, etc.)
├── App.vue                         # Root component (router-view)
├── main.js                         # App entry point
└── style.css                       # Tailwind + PrimeUI imports, dark mode variant, custom styles
```
