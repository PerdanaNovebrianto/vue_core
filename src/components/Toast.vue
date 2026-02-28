<script setup>
const isVisible = ref(false)
const timeoutId = ref(null)
const toastData = ref({
  type: '',
  icon: '',
  title: '',
  body: ''
})

const typeBackgroundClass = {
  success: 'bg-green-400',
  error: 'bg-red-400',
  warning: 'bg-yellow-400',
  info: 'bg-blue-400'
}

const typeIconClass = {
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400'
}

const getToastBgClass = (type) => {
  return typeBackgroundClass[type] || typeBackgroundClass.info
}

const getToastIconClass = (type) => {
  return typeIconClass[type] || typeIconClass.info
}

// Show custom toast with icon, title, body, and optional type
const show = (type = 'info', icon, title, body) => {
  // Clear any existing timeout
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
  }
  
  toastData.value = { icon, title, body, type }
  isVisible.value = true
  
  // Auto hide after 4 seconds
  timeoutId.value = setTimeout(() => {
    isVisible.value = false
    timeoutId.value = null
  }, 4000)
}

const hide = () => {
  // Clear timeout when manually closed
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
    timeoutId.value = null
  }
  isVisible.value = false
}

// Expose the show method for parent components
defineExpose({
  show,
  hide
})
</script>

<template>
  <!-- Custom Toast without PrimeVue dependency -->
  <Transition
    enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <div 
      v-if="isVisible"
      class="fixed top-2 right-2 z-10000 w-full max-w-sm"
    >
      <div
        :class="getToastBgClass(toastData.type)"
        class="w-full p-2 rounded-2xl font-medium shadow-xl"
      >
        <div class="flex justify-between">
          <div class="flex space-x-4">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center bg-surface-50"
            >
              <i
                :class="[toastData.icon, getToastIconClass(toastData.type)]"
                class="text-2xl"
              />                
            </div>
            <div class="text-left flex-1">
              <div class="text-sm font-medium text-surface-50">
                {{ toastData.title }}
              </div>
              <div class="text-surface-50 text-xs">
                {{ toastData.body }}
              </div>
            </div>
          </div>
          <button 
            class="w-8 h-8 flex items-center justify-center ml-2"
            @click="hide"
          >
            <i class="fa-solid fa-times text-surface-50 hover:text-surface-200 text-sm cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>