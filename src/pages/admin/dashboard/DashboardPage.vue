<script setup>
import constants from '@/utils/constants'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import ThemeColorPicker from '@/components/ThemeColorPicker.vue'
import DarkModeToggle from '@/components/DarkModeToggle.vue'

const { t } = useI18n()

const sidebarOpen = ref(false)

const navItems = computed(() => [
  { label: t('dashboard.nav.dashboard'), icon: 'fa-solid fa-house', active: true },
  { label: t('dashboard.nav.projects'), icon: 'fa-solid fa-folder' },
  { label: t('dashboard.nav.team'), icon: 'fa-solid fa-users' },
  { label: t('dashboard.nav.reports'), icon: 'fa-solid fa-chart-bar' },
  { label: t('dashboard.nav.settings'), icon: 'fa-solid fa-gear' },
])

const stats = computed(() => [
  { label: t('dashboard.stats.total_revenue'), value: '$45,231', change: '+20.1%', up: true, icon: 'fa-solid fa-dollar-sign' },
  { label: t('dashboard.stats.new_users'), value: '2,350', change: '+18.2%', up: true, icon: 'fa-solid fa-user-plus' },
  { label: t('dashboard.stats.active_projects'), value: '12', change: '-2', up: false, icon: 'fa-solid fa-briefcase' },
  { label: t('dashboard.stats.completion_rate'), value: '78%', change: '+5.4%', up: true, icon: 'fa-solid fa-circle-check' },
])

const activities = ref([
  { name: 'Website Redesign', status: 'completed', date: '2026-02-20', amount: '$12,500' },
  { name: 'Mobile App v2', status: 'in_progress', date: '2026-02-19', amount: '$8,200' },
  { name: 'API Integration', status: 'pending', date: '2026-02-18', amount: '$3,700' },
  { name: 'Cloud Migration', status: 'in_progress', date: '2026-02-17', amount: '$15,000' },
  { name: 'Legacy Cleanup', status: 'cancelled', date: '2026-02-16', amount: '$2,100' },
])

const quickActions = computed(() => [
  { label: t('dashboard.actions.new_project'), icon: 'fa-solid fa-plus', severity: 'primary' },
  { label: t('dashboard.actions.invite_member'), icon: 'fa-solid fa-user-plus', severity: 'secondary' },
  { label: t('dashboard.actions.generate_report'), icon: 'fa-solid fa-file-export', severity: 'secondary' },
  { label: t('dashboard.actions.view_analytics'), icon: 'fa-solid fa-chart-line', severity: 'secondary' },
])

function statusSeverity(status) {
  const map = { completed: 'success', in_progress: 'info', pending: 'warn', cancelled: 'danger' }
  return map[status] || 'secondary'
}
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
        'bg-surface-0 dark:bg-surface-900 border-r border-surface-200 dark:border-surface-700',
        'transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3 px-5 h-16 border-b border-surface-200 dark:border-surface-700 shrink-0">
        <div class="w-8 h-8 rounded-lg bg-surface-900 dark:bg-surface-0 flex items-center justify-center">
          <i class="fa-solid fa-cube text-sm text-surface-0 dark:text-surface-900" />
        </div>
        <span class="font-semibold text-surface-900 dark:text-surface-0 truncate">{{ constants.app_name }}</span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 py-4 px-3 overflow-y-auto">
        <ul class="flex flex-col gap-1">
          <li v-for="item in navItems" :key="item.label">
            <a
              href="#"
              :class="[
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                item.active
                  ? 'bg-surface-900 dark:bg-surface-0 text-surface-0 dark:text-surface-900'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
              ]"
            >
              <i :class="item.icon" class="w-5 text-center" />
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Sidebar footer -->
      <div class="px-3 py-4 border-t border-surface-200 dark:border-surface-700 shrink-0">
        <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
          <i class="fa-solid fa-right-from-bracket w-5 text-center" />
          {{ t('dashboard.logout') }}
        </a>
      </div>
    </aside>

    <!-- Main area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top bar -->
      <header class="sticky top-0 z-30 h-16 flex items-center gap-3 px-4 lg:px-6 bg-surface-0/80 dark:bg-surface-900/80 backdrop-blur-lg border-b border-surface-200 dark:border-surface-700 shrink-0">
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

        <!-- Search -->
        <div class="flex-1 max-w-md hidden sm:block">
          <IconField>
            <InputIcon class="fa-solid fa-magnifying-glass" />
            <InputText :placeholder="t('dashboard.search_placeholder')" fluid class="bg-surface-50! dark:bg-surface-800!" />
          </IconField>
        </div>

        <div class="flex-1 sm:hidden" />

        <!-- Right controls -->
        <div class="flex items-center gap-2">
          <LanguageSwitcher class="hidden sm:flex" />
          <LanguageSwitcher compact class="sm:hidden" />
          <ThemeColorPicker />
          <DarkModeToggle />

          <!-- Avatar -->
          <div class="w-9 h-9 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center ml-1">
            <i class="fa-solid fa-user text-sm text-surface-500 dark:text-surface-400" />
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-4 lg:p-6 overflow-y-auto">
        <!-- Welcome -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
            {{ t('dashboard.welcome') }} 👋
          </h1>
          <p class="mt-1 text-surface-500 dark:text-surface-400">
            {{ t('dashboard.welcome_sub') }}
          </p>
        </div>

        <!-- Stats grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-surface-0 dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-700 p-5"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm text-surface-500 dark:text-surface-400">{{ stat.label }}</span>
              <div class="w-9 h-9 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                <i :class="stat.icon" class="text-sm text-surface-600 dark:text-surface-300" />
              </div>
            </div>
            <div class="text-2xl font-bold text-surface-900 dark:text-surface-0">{{ stat.value }}</div>
            <div class="mt-1 text-xs">
              <span :class="stat.up ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'">
                {{ stat.change }}
              </span>
              <span class="text-surface-400 dark:text-surface-500 ml-1">{{ t('dashboard.stats.vs_last_month') }}</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <!-- Recent activity table -->
          <div class="xl:col-span-2 bg-surface-0 dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden">
            <div class="px-5 py-4 border-b border-surface-200 dark:border-surface-700">
              <h2 class="font-semibold text-surface-900 dark:text-surface-0">
                {{ t('dashboard.recent_activity') }}
              </h2>
            </div>
            <DataTable :value="activities" stripedRows class="border-0!">
              <Column :header="t('dashboard.table.name')" field="name">
                <template #body="{ data }">
                  <span class="font-medium text-surface-900 dark:text-surface-0">{{ data.name }}</span>
                </template>
              </Column>
              <Column :header="t('dashboard.table.status')" field="status">
                <template #body="{ data }">
                  <Tag :value="t('dashboard.status.' + data.status)" :severity="statusSeverity(data.status)" rounded />
                </template>
              </Column>
              <Column :header="t('dashboard.table.date')" field="date" class="hidden sm:table-cell" />
              <Column :header="t('dashboard.table.amount')" field="amount">
                <template #body="{ data }">
                  <span class="font-medium text-surface-900 dark:text-surface-0">{{ data.amount }}</span>
                </template>
              </Column>
            </DataTable>
          </div>

          <!-- Quick actions -->
          <div class="bg-surface-0 dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-700 p-5">
            <h2 class="font-semibold text-surface-900 dark:text-surface-0 mb-4">
              {{ t('dashboard.quick_actions') }}
            </h2>
            <div class="flex flex-col gap-2">
              <Button
                v-for="action in quickActions"
                :key="action.label"
                :label="action.label"
                :severity="action.severity"
                outlined
                class="justify-start!"
              >
                <template #icon>
                  <i :class="action.icon" class="text-sm" />
                </template>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
