import { updatePrimaryPalette } from '@primeuix/themes'

const STORAGE_KEY = 'theme-color'
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

export const THEME_COLORS = [
  { name: 'Zinc',   code: 'zinc',   hex: '#71717a' },
  { name: 'Blue',   code: 'blue',   hex: '#3b82f6' },
  { name: 'Cyan',   code: 'cyan',   hex: '#06b6d4' },
  { name: 'Green',  code: 'green',  hex: '#22c55e' },
  { name: 'Lime',   code: 'lime',   hex: '#84cc16' },
  { name: 'Red',    code: 'red',    hex: '#ef4444' },
  { name: 'Pink',   code: 'pink',   hex: '#ec4899' },
  { name: 'Orange', code: 'orange', hex: '#f97316' },
  { name: 'Amber',  code: 'amber',  hex: '#f59e0b' },
  { name: 'Violet', code: 'violet', hex: '#8b5cf6' },
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
