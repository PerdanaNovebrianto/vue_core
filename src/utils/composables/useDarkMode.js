const DARK_CLASS = 'prime-vue-dark'
const STORAGE_KEY = 'dark-mode'

const isDark = ref(
  localStorage.getItem(STORAGE_KEY) === 'true' ||
  (!localStorage.getItem(STORAGE_KEY) && window.matchMedia('(prefers-color-scheme: dark)').matches)
)

function apply() {
  document.documentElement.classList.toggle(DARK_CLASS, isDark.value)
  localStorage.setItem(STORAGE_KEY, isDark.value)
}

apply()

export function useDarkMode() {
  function toggleDarkMode() {
    isDark.value = !isDark.value
    apply()
  }

  function setDarkMode(value) {
    isDark.value = value
    apply()
  }

  return {
    isDark: readonly(isDark),
    toggleDarkMode,
    setDarkMode
  }
}
