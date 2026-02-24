<script setup>
import { useThemeColor, THEME_COLORS } from '@/utils/composables/useThemeColor'

const { currentColor } = useThemeColor()

defineProps({
  svg: { type: Object, required: true }
})

const accentColor = computed(() =>
  THEME_COLORS.find(c => c.code === currentColor.value)?.hex ?? '#71717a'
)
</script>

<template>
  <component
    :is="svg"
    preserveAspectRatio="xMidYMid meet"
    class="block w-full h-auto overflow-visible"
    :style="{ color: accentColor }"
  />
</template>
