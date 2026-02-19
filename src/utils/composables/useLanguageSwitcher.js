import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, setLocale } from '@/plugins/i18n'

export function useLanguageSwitcher() {
  const { locale } = useI18n()

  const locales = computed(() =>
    Object.values(SUPPORTED_LOCALES)
  )

  const currentLocale = computed(() =>
    SUPPORTED_LOCALES[locale.value] ?? null
  )

  function switchLocale(code) {
    setLocale(code)
  }

  function toggleLocale() {
    const keys = Object.keys(SUPPORTED_LOCALES)
    const nextIndex = (keys.indexOf(locale.value) + 1) % keys.length
    setLocale(keys[nextIndex])
  }

  return {
    locale,
    locales,
    currentLocale,
    switchLocale,
    toggleLocale
  }
}
