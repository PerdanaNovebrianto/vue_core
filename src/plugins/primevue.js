import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

function buildScale(color) {
  return Object.fromEntries(SHADES.map(s => [s, `{${color}.${s}}`]))
}

export function createPreset(color = 'zinc') {
  const saved = localStorage.getItem('theme-color') || color
  const primary = buildScale(saved)
  const neutralSurface = buildScale('zinc')
  const lightSurface = { 0: '#ffffff', ...neutralSurface }
  const darkSurface = { 0: '#000000', ...neutralSurface }

  return definePreset(Aura, {
    semantic: {
      primary,
      colorScheme: {
        light: { surface: lightSurface },
        dark: { surface: darkSurface }
      }
    }
  })
}
