<script setup>
import UndrawSvg from '@/components/UndrawSvg.vue'
import WarningSvg from '@/assets/undraw/undraw_warning.svg'

const { t } = useI18n()
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
    <div class="flex-1 flex items-center justify-center px-4">
      <div class="w-full max-w-lg text-center">
        <UndrawSvg :svg="WarningSvg" class="w-full max-w-sm mx-auto mb-10" />

        <p class="text-7xl font-extrabold text-surface-900 dark:text-surface-0 mb-2">403</p>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-3">
          {{ t('error.403.title') }}
        </h1>
        <p class="text-surface-500 dark:text-surface-400 mb-8 max-w-md mx-auto">
          {{ t('error.403.description') }}
        </p>

        <router-link :to="{ name: 'Login' }" custom v-slot="{ navigate }">
          <Button :label="t('error.go_home')" @click="navigate" icon="fa-solid fa-arrow-left" />
        </router-link>
      </div>
    </div>
  </div>
</template>
