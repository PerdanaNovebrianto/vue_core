<script setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const layout = computed(() => {
    return route.meta.layout + '-layout'
  })
</script>

<template>
  <component :is="layout">
    <router-view v-slot="{Component}">
      <component :is="Component"/>
    </router-view>
  </component>
</template>