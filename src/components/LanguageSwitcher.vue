<script setup>
const { locale, locales, switchLocale } = useLanguageSwitcher()
const op = ref()

const currentCode = computed(() => locale.value.toUpperCase())

function toggle(event) {
  op.value.toggle(event)
}
</script>

<template>
  <Button
    text
    rounded
    severity="secondary"
    class="h-8! px-3! py-1! gap-2! border-primary-200 dark:border-primary-700"
    aria-label="Switch language"
    @click="toggle"
  >
    <i class="fa-solid fa-language text-sm text-primary-500" />
    <div class="min-w-[20px]">
      <span class="text-xs text-surface-800 dark:text-surface-100 font-semibold tracking-wide">{{ currentCode }}</span>
    </div>
  </Button>

  <Popover
    ref="op"
    :pt="{content: 'p-2'}"
  >
    <div class="w-48">
      <div class="flex flex-col gap-2">
        <Button
          v-for="item in locales"
          :key="item.code"
          type="button"
          class="w-full cursor-pointer flex items-center justify-between gap-3 rounded-lg p-2 text-sm text-left transition-colors border-none bg-transparent hover:bg-primary-100 dark:hover:bg-primary-900/20"
          @click="switchLocale(item.code)"
        >
          <span class="flex items-center gap-2 text-surface-800 dark:text-surface-100">
            <span>{{ item.flag }}</span>
            <span>{{ item.name }}</span>
          </span>
          <i
            v-if="locale === item.code"
            class="fa-solid fa-check text-xs text-primary-500"
          />
        </Button>
      </div>
    </div>
  </Popover>
</template>
