/**
 * Toast composable for easy toast notifications
 * Supports:
 * - showToast(type, icon, title, body)
 * - showToast(icon, title, body) // defaults to info
 */

// Global toast instance reference
let globalToastInstance = null

// Function to register the global toast instance
export function registerToast(toastInstance) {
  globalToastInstance = toastInstance
}

export function useToast() {
  // Supports both new and legacy signatures.
  const showToast = (...args) => {
    if (globalToastInstance) {
      const toastTypes = ['success', 'error', 'warning', 'info']
      const [firstArg] = args

      if (toastTypes.includes(firstArg)) {
        const [type, icon, title, body] = args
        globalToastInstance.show(type, icon, title, body)
        return
      }

      const [icon, title, body] = args
      globalToastInstance.show('info', icon, title, body)
    }
  }
  
  return {
    showToast
  }
}