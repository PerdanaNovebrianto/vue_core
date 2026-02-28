<script setup>
import UndrawSvg from '@/components/UndrawSvg.vue'
import NotFoundSvg from '@/assets/undraw/undraw_page-not-found.svg'

const { t } = useI18n()
</script>

<template>
  <div class="w-full max-w-lg text-center">
    <div class="w-full max-w-3xs mx-auto mb-10">
      <UndrawSvg :svg="NotFoundSvg" />
    </div>
    <p class="text-7xl font-extrabold text-surface-800 dark:text-surface-50 mb-2">
      404
    </p>
    <h1 class="text-2xl font-bold text-surface-800 dark:text-surface-50 mb-3">
      {{ t('error.404.title') }}
    </h1>
    <p class="text-surface-600 dark:text-surface-300 mb-8 max-w-md mx-auto">
      {{ t('error.404.description') }}
    </p>
    <router-link
      v-slot="{ navigate }"
      :to="{ name: 'Login' }"
      custom
    >
      <Button
        :label="t('error.go_home')"
        icon="fa-solid fa-arrow-left"
        @click="navigate"
      />
    </router-link>
  </div>
</template>
