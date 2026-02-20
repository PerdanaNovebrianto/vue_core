import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

export function createPreset(color = 'zinc') {
  const saved = localStorage.getItem('theme-color') || color
  const primary = Object.fromEntries(SHADES.map(s => [s, `{${saved}.${s}}`]))
  const surface = { 0: '#ffffff', ...primary }

  return definePreset(Aura, {
    semantic: {
      primary,
      colorScheme: {
        light: { surface },
        dark: { surface }
      }
    }
  })
}
