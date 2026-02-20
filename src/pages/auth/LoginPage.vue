<script setup>
import { useRouter } from 'vue-router'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import ThemeColorPicker from '@/components/ThemeColorPicker.vue'
import DarkModeToggle from '@/components/DarkModeToggle.vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)

const { t } = useI18n()

async function handleLogin() {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push({ name: 'Dashboard' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
    <!-- Top bar -->
    <div class="flex items-center justify-end gap-2 p-4">
      <LanguageSwitcher />
      <ThemeColorPicker />
      <DarkModeToggle />
    </div>

    <!-- Centered login card -->
    <div class="flex-1 flex items-center justify-center px-4 pb-16">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-900 dark:bg-surface-0 mb-5">
            <i class="fa-solid fa-lock text-xl text-surface-0 dark:text-surface-900" />
          </div>
          <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
            {{ t('login.title') }}
          </h1>
          <p class="mt-2 text-surface-500 dark:text-surface-400">
            {{ t('login.subtitle') }}
          </p>
        </div>

        <!-- Card -->
        <div class="bg-surface-0 dark:bg-surface-900 rounded-2xl shadow-sm border border-surface-200 dark:border-surface-700 p-8">
          <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
            <!-- Email -->
            <div class="flex flex-col gap-2">
              <label for="email" class="text-sm font-medium text-surface-700 dark:text-surface-200">
                {{ t('login.email') }}
              </label>
              <InputText
                id="email"
                v-model="email"
                type="email"
                :placeholder="t('login.email_placeholder')"
                fluid
              />
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-2">
              <label for="password" class="text-sm font-medium text-surface-700 dark:text-surface-200">
                {{ t('login.password') }}
              </label>
              <Password
                id="password"
                v-model="password"
                :placeholder="t('login.password_placeholder')"
                :feedback="false"
                toggleMask
                fluid
              />
            </div>

            <!-- Remember me & Forgot password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Checkbox v-model="rememberMe" inputId="remember" :binary="true" />
                <label for="remember" class="text-sm text-surface-600 dark:text-surface-300 cursor-pointer select-none">
                  {{ t('login.remember_me') }}
                </label>
              </div>
              <a href="#" class="text-sm font-medium text-surface-900 dark:text-surface-100 hover:underline">
                {{ t('login.forgot_password') }}
              </a>
            </div>

            <!-- Submit -->
            <Button
              type="submit"
              :label="t('login.sign_in')"
              :loading="loading"
              class="w-full"
            />
          </form>
        </div>

        <!-- Sign up link -->
        <p class="text-center mt-6 text-sm text-surface-500 dark:text-surface-400">
          {{ t('login.no_account') }}
          <a href="#" class="font-medium text-surface-900 dark:text-surface-100 hover:underline">
            {{ t('login.sign_up') }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
