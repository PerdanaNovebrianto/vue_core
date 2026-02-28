<script setup>
const { isDark, toggleDarkMode } = useDarkMode()
</script>

<template>
  <Button
    text
    rounded
    severity="secondary"
    aria-label="Toggle dark mode"
    class="w-8! h-8!"
    @click="toggleDarkMode"
  >
    <template #icon>
      <i
        :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"
        class="text-base"
      />
    </template>
  </Button>
</template>
