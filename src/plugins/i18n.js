import { createI18n } from 'vue-i18n'

// Import language files
import en from '@/locales/en.json'
import id from '@/locales/id.json'

// Define available locales
export const SUPPORTED_LOCALES = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    code: 'en'
  },
  id: {
    name: 'Bahasa Indonesia', 
    flag: '🇮🇩',
    code: 'id'
  }
}

// Messages object
const messages = {
  en,
  id
}

function getDefaultLocale() {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && Object.keys(SUPPORTED_LOCALES).includes(savedLocale)) {
    return savedLocale
  }

  const browserLocale = navigator.language?.split('-')[0]
  return browserLocale === 'id' ? 'id' : 'en'
}

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages,
  globalInjection: true,
  silentTranslationWarn: true,
  silentFallbackWarn: true
})

// Export locale utilities
export function setLocale(locale) {
  if (Object.keys(SUPPORTED_LOCALES).includes(locale)) {
    i18n.global.locale.value = locale
    localStorage.setItem('locale', locale)
    document.documentElement.setAttribute('lang', locale)
  }
}

export function getCurrentLocale() {
  return i18n.global.locale.value
}

export function getSupportedLocales() {
  return Object.keys(SUPPORTED_LOCALES)
}

export function getLocaleInfo(locale) {
  return SUPPORTED_LOCALES[locale] || null
}

export default i18n
