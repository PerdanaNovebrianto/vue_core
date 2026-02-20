<script setup>
const { locale, locales, switchLocale } = useLanguageSwitcher()

defineProps({
  compact: { type: Boolean, default: false }
})
</script>

<template>
  <!-- Full dropdown -->
  <Select
    v-if="!compact"
    :modelValue="locale"
    @update:modelValue="switchLocale($event)"
    :options="locales"
    optionLabel="name"
    optionValue="code"
    class="w-44"
  >
    <template #value="{ value }">
      <span class="flex items-center gap-2 text-sm">
        <span>{{ locales.find(l => l.code === value)?.flag }}</span>
        <span>{{ locales.find(l => l.code === value)?.name }}</span>
      </span>
    </template>
    <template #option="{ option }">
      <span class="flex items-center gap-2 text-sm">
        <span>{{ option.flag }}</span>
        <span>{{ option.name }}</span>
      </span>
    </template>
  </Select>

  <!-- Compact flag-only toggle -->
  <Button
    v-else
    @click="switchLocale(locale === 'en' ? 'id' : 'en')"
    text
    rounded
    severity="secondary"
    class="w-10! h-10!"
    aria-label="Switch language"
  >
    <template #icon>
      <span class="text-base">{{ locales.find(l => l.code === locale)?.flag }}</span>
    </template>
  </Button>
</template>
