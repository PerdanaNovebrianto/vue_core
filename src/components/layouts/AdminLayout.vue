<script setup>
import constants from '@/utils/constants'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import ThemeColorPicker from '@/components/ThemeColorPicker.vue'
import DarkModeToggle from '@/components/DarkModeToggle.vue'

const { t } = useI18n()

const sidebarOpen = ref(false)
const avatarMenu = ref()
const isHeaderScrolled = ref(false)
const currentYear = new Date().getFullYear()

const navItems = computed(() => [
  { label: t('dashboard.nav.dashboard'), icon: 'fa-solid fa-house', active: true },
  { label: t('dashboard.nav.projects'), icon: 'fa-solid fa-folder' },
  { label: t('dashboard.nav.team'), icon: 'fa-solid fa-users' },
  { label: t('dashboard.nav.reports'), icon: 'fa-solid fa-chart-bar' },
  { label: t('dashboard.nav.settings'), icon: 'fa-solid fa-gear' },
])

function toggleAvatarMenu(event) {
  avatarMenu.value.toggle(event)
}

function handleScroll() {
  isHeaderScrolled.value = window.scrollY > 8
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="min-h-dvh flex bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
    <!-- Mobile sidebar overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/40 z-40 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed lg:sticky top-0 left-0 z-50 h-dvh w-64 flex flex-col',
        'bg-surface-0 dark:bg-surface-900 border-r border-surface-200 dark:border-surface-600',
        'transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >

      <!-- Logo -->
      <div class="flex items-center gap-3 px-3 h-16 border-b border-surface-200 dark:border-surface-600 shrink-0">
        <div class="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
          <i class="fa-solid fa-cube text-sm text-surface-50" />
        </div>
        <span class="font-semibold text-surface-800 dark:text-surface-50 truncate">{{ constants.app_name }}</span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 py-4 px-3 overflow-y-auto">
        <ul class="flex flex-col gap-1">
          <li v-for="item in navItems" :key="item.label">
            <a
              v-ripple
              href="#"
              :class="[
                'p-ripple flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                item.active
                  ? 'bg-primary-500 text-surface-50'
                  : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
              ]"
            >
              <i :class="item.icon" class="w-5 text-center" />
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Sidebar footer -->
      <div class="p-3 border-t border-surface-200 dark:border-surface-600 shrink-0">
        <p class="text-sm text-surface-600 dark:text-surface-300">
          &copy; {{ currentYear }} {{ constants.app_name }}
        </p>
      </div>
    </aside>

    <!-- Main area -->
    <div class="flex-1 flex flex-col min-w-0">
      
      <!-- Top bar -->
      <header
        :class="[
          'sticky top-0 z-30 h-16 flex items-center gap-3 px-4 lg:px-6 border-b border-surface-200 dark:border-surface-700 shrink-0 transition-all duration-300',
          isHeaderScrolled
            ? 'bg-surface-0/40 dark:bg-surface-900/40 backdrop-blur-md'
            : 'bg-surface-0 dark:bg-surface-900'
        ]"
      >
        <!-- Mobile menu button -->
        <Button
          @click="sidebarOpen = true"
          text
          rounded
          severity="secondary"
          class="lg:hidden w-10! h-10!"
          aria-label="Open menu"
        >
          <template #icon>
            <i class="fa-solid fa-bars text-base" />
          </template>
        </Button>

        <!-- Right controls -->
        <div class="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeColorPicker />
          <DarkModeToggle />

          <!-- Avatar -->
          <button
            type="button"
            @click="toggleAvatarMenu"
            class="w-9 h-9 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center ml-1 cursor-pointer transition-colors hover:bg-surface-300 dark:hover:bg-surface-600"
            aria-label="Open profile menu"
          >
            <i class="fa-solid fa-user text-sm text-surface-600 dark:text-surface-300" />
          </button>
          <Popover ref="avatarMenu" :pt="{content: 'p-2'}">
            <button
              type="button"
              class="w-full cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-left text-surface-700 dark:text-surface-100 transition-colors hover:bg-surface-100 dark:hover:bg-surface-800"
            >
              <i class="fa-solid fa-right-from-bracket w-4 text-center" />
              {{ t('dashboard.logout') }}
            </button>
          </Popover>
        </div>
      </header>

      <!-- Page content -->
      <slot />
    </div>
  </div>
</template>
