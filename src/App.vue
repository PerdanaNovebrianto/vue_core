<script setup>
import { useDarkMode } from '@/utils/composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
</script>

<template>
  <Button :label="isDark ? 'Light Mode' : 'Dark Mode'" @click="toggleDarkMode">
    <i class="fa-solid fa-sun" v-if="isDark"></i>
    <i class="fa-solid fa-moon" v-else></i>
  </Button>
</template>