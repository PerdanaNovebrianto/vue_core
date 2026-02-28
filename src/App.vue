<script setup>
import Toast from '@/components/Toast.vue'
import { useRoute } from 'vue-router'
import { registerToast } from '@/utils/composables/useToast'

const route = useRoute()
const appToast = ref(null)

const layout = computed(() => {
  return route.meta.layout + '-layout'
})

onMounted(() => {
  registerToast(appToast.value)
})
</script>

<template>
  <component :is="layout">
    <router-view v-slot="{Component}">
      <component :is="Component" />
    </router-view>
  </component>
  <Toast ref="appToast" />
</template>