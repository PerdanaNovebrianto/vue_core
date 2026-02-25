<script setup>
import UndrawSvg from '@/components/UndrawSvg.vue'
import ServerErrorSvg from '@/assets/undraw/undraw_server-error.svg'

const { t } = useI18n()
</script>

<template>
  <div class="w-full max-w-lg text-center">
    <div class="w-full max-w-3xs mx-auto mb-10">
      <UndrawSvg :svg="ServerErrorSvg" />
    </div>
    <p class="text-7xl font-extrabold text-surface-800 dark:text-surface-0 mb-2">500</p>
    <h1 class="text-2xl font-bold text-surface-800 dark:text-surface-0 mb-3">
      {{ t('error.500.title') }}
    </h1>
    <p class="text-surface-600 dark:text-surface-300 mb-8 max-w-md mx-auto">
      {{ t('error.500.description') }}
    </p>
    <router-link :to="{ name: 'Login' }" custom v-slot="{ navigate }">
      <Button :label="t('error.go_home')" @click="navigate" icon="fa-solid fa-arrow-left" />
    </router-link>
  </div>
</template>
