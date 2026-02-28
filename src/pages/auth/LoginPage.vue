<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email } from '@vuelidate/validators'
import { useToast } from '@/utils/composables/useToast'

const { t } = useI18n()
const router = useRouter()
const auth = useAuth()
const { showToast } = useToast()

const rememberMe = ref(false)
const isLoading = ref(false)

const forms = reactive({
  email: null,
  password: null
})

const rules = {
  email:{
    required: helpers.withMessage(t('validation.required_fill'), required),
    email: helpers.withMessage(t('validation.format_email'), email)
  },
  password:{
    required: helpers.withMessage(t('validation.required_fill'), required)
  }
}

const v$ = useVuelidate(rules, forms)

const handleLogin = () => {
  v$.value.$touch()

  if (v$.value.$invalid) {
    showToast('error','fa-solid fa-exclamation-circle', t('validation.error'), t('validation.error_message'))
    return
  }

  isLoading.value = true
    
  auth.login(forms).then(() => {
    if(auth.user){
      router.push({ name: 'Admin.Dashboard' })
    }
  }).finally(() => {
    isLoading.value = false
  })
}
</script>

<template>
  <div class="w-full max-w-md">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-primary-500">
        {{ t('login.title') }}
      </h1>
      <p class="mt-2 text-surface-600 dark:text-surface-300">
        {{ t('login.subtitle') }}
      </p>
    </div>

    <!-- Card -->
    <div class="bg-surface-0 dark:bg-surface-900 rounded-2xl shadow-sm border border-primary-500 p-8">
      <form
        class="flex flex-col gap-4"
        @submit.prevent="handleLogin"
      >
        <!-- Email -->
        <div class="flex flex-col">
          <label
            class="text-sm font-medium text-surface-800 dark:text-surface-50 mb-2"
          >
            {{ t('login.email') }}
          </label>
          <InputText
            v-model="forms.email"
            type="email"
            class="text-surface-800 dark:text-surface-50 placeholder:text-surface-600 dark:placeholder:text-surface-300"
            :placeholder="t('login.email_placeholder')"
            :invalid="v$.email.$error"
            fluid
            @blur="v$.email.$touch"
          />
          <div
            class="text-xs text-red-400 mt-1 min-h-4 leading-4"
            :class="v$.email.$error ? 'visible' : 'invisible'"
          >
            {{ v$.email.$errors[0]?.$message || ' ' }}
          </div>
        </div>

        <!-- Password -->
        <div class="flex flex-col">
          <label
            class="text-sm font-medium text-surface-800 dark:text-surface-50 mb-2"
          >
            {{ t('login.password') }}
          </label>
          <Password
            v-model="forms.password"
            input-class="text-surface-800 dark:text-surface-50 placeholder:text-surface-600 dark:placeholder:text-surface-300"
            :placeholder="t('login.password_placeholder')"
            :feedback="false"
            :invalid="v$.password.$error"
            toggle-mask
            fluid
            @blur="v$.password.$touch"
          />
          <div
            class="text-xs text-red-400 mt-1 min-h-4 leading-4"
            :class="v$.password.$error ? 'visible' : 'invisible'"
          >
            {{ v$.password.$errors[0]?.$message || ' ' }}
          </div>
        </div>

        <!-- Remember me & Forgot password -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Checkbox
              v-model="rememberMe"
              input-id="remember"
              :binary="true"
            />
            <label
              for="remember"
              class="text-sm text-surface-600 dark:text-surface-300 cursor-pointer select-none"
            >
              {{ t('login.remember_me') }}
            </label>
          </div>
          <a
            href="#"
            class="text-sm font-medium text-primary-500 hover:underline"
          >
            {{ t('login.forgot_password') }}
          </a>
        </div>

        <!-- Submit -->
        <Button
          type="submit"
          :label="t('login.sign_in')"
          :loading="isLoading"
          class="w-full"
        />
      </form>
    </div>

    <!-- Sign up link -->
    <p class="text-center mt-6 text-sm text-surface-600 dark:text-surface-300">
      {{ t('login.no_account') }}
      <a
        href="#"
        class="font-medium text-primary-500 hover:underline"
      >
        {{ t('login.sign_up') }}
      </a>
    </p>
  </div>
</template>
