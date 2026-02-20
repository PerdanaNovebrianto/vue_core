import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    svgLoader(),
    Components({
      dirs: [],
      resolvers: [
        PrimeVueResolver()
      ]
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
      ],
      dirs: [
        'src/utils/composables',
        'src/utils',
      ],
      ignore: [
        'src/utils/constants.js',
      ],
      eslintrc: {
        enabled: true,
      },
      dts: true, // Generate type definitions
      vueTemplate: true, // Enable auto-imports in Vue templates
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
