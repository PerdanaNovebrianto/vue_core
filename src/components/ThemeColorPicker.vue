<script setup>
import { useThemeColor } from '@/utils/composables/useThemeColor'

const { currentColor, colors, setThemeColor } = useThemeColor()

const op = ref()

function toggle(event) {
  op.value.toggle(event)
}
</script>

<template>
  <Button
    text
    rounded
    severity="secondary"
    aria-label="Change theme color"
    class="w-8! h-8!"
    @click="toggle"
  >
    <template #icon>
      <span
        class="inline-block w-4 h-4 rounded-full ring-2 ring-surface-300 dark:ring-surface-600"
        :style="{ backgroundColor: colors.find(c => c.code === currentColor)?.hex }"
      />
    </template>
  </Button>

  <Popover ref="op">
    <div class="w-48">
      <div class="grid grid-cols-5 gap-4">
        <button
          v-for="color in colors"
          :key="color.code"
          class="w-6 h-6 rounded-full transition-transform hover:scale-110 cursor-pointer flex items-center justify-center"
          :style="{ backgroundColor: color.hex }"
          :title="color.name"
          @click="setThemeColor(color.code)"
        >
          <i
            v-if="currentColor === color.code"
            class="fa-solid fa-check text-xs text-white drop-shadow-sm"
          />
        </button>
      </div>
    </div>
  </Popover>
</template>
