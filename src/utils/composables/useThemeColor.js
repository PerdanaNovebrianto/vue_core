import { updatePrimaryPalette } from '@primeuix/themes'

const STORAGE_KEY = 'theme-color'
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

export const THEME_COLORS = [
  { name: 'Zinc',   code: 'zinc',   hex: '#71717a' },
  { name: 'Slate',  code: 'slate',  hex: '#64748b' },
  { name: 'Stone',  code: 'stone',  hex: '#78716c' },
  { name: 'Blue',   code: 'blue',   hex: '#3b82f6' },
  { name: 'Green',  code: 'green',  hex: '#22c55e' },
  { name: 'Red',    code: 'red',    hex: '#ef4444' },
  { name: 'Orange', code: 'orange', hex: '#f97316' },
  { name: 'Amber',  code: 'amber',  hex: '#f59e0b' },
  { name: 'Violet', code: 'violet', hex: '#8b5cf6' },
  { name: 'Rose',   code: 'rose',   hex: '#f43f5e' },
]

function buildPalette(color) {
  return Object.fromEntries(SHADES.map(s => [s, `{${color}.${s}}`]))
}

const currentColor = ref(localStorage.getItem(STORAGE_KEY) || 'zinc')

function apply(color) {
  const palette = buildPalette(color)
  updatePrimaryPalette(palette)
  localStorage.setItem(STORAGE_KEY, color)
}

export function useThemeColor() {
  const colors = THEME_COLORS

  function setThemeColor(color) {
    currentColor.value = color
    apply(color)
  }

  return {
    currentColor: readonly(currentColor),
    colors,
    setThemeColor
  }
}
