<script setup>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import ThemeColorPicker from '@/components/ThemeColorPicker.vue'
import DarkModeToggle from '@/components/DarkModeToggle.vue'
import UndrawSvg from '@/components/UndrawSvg.vue'
import LoginSvg from '@/assets/undraw/undraw_login.svg'
import { useThemeColor } from '@/utils/composables/useThemeColor'

const { currentColor, colors } = useThemeColor()

function hexToRgb(hex) {
  const normalized = hex.replace('#', '')
  const value = normalized.length === 3
    ? normalized.split('').map(ch => ch + ch).join('')
    : normalized

  const int = Number.parseInt(value, 16)
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255
  }
}

const leftPanelStyle = computed(() => {
  const hex = colors.find(c => c.code === currentColor.value)?.hex ?? '#71717a'
  const { r, g, b } = hexToRgb(hex)

  return {
    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`
  }
})
</script>

<template>
  <div class="min-h-dvh bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
    <div class="grid min-h-dvh lg:grid-cols-3">
      <!-- Left visual panel -->
      <div
        class="hidden lg:flex lg:col-span-2 items-center justify-center p-10 xl:p-14 transition-colors duration-300"
        :style="leftPanelStyle"
      >
        <div class="w-full max-w-xl text-center">
          <UndrawSvg
            :svg="LoginSvg"
            class="w-full max-w-lg mx-auto scale-x-[-1]"
          />
        </div>
      </div>

      <!-- Right form panel -->
      <div class="flex flex-col bg-surface-0 dark:bg-surface-900">
        <!-- Utilities -->
        <div class="flex items-center justify-end gap-2 p-4 lg:p-6">
          <LanguageSwitcher />
          <ThemeColorPicker />
          <DarkModeToggle />
        </div>

        <div class="flex-1 flex items-center justify-center px-4 pb-12 lg:px-10 lg:pb-16">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
