import axios from 'axios'
import constants from '@/utils/constants'
import crypto from 'crypto-js'
import routes from '@/routes'
import i18n from '@/plugins/i18n'
import { useAuth } from '@/stores/auth'
import { useToast } from '@/utils/composables/useToast'

const { t } = i18n.global
const { showToast } = useToast()

const api = axios.create({
  baseURL: constants.base_api,
  timeout: 30000,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

let refreshPromise = null
let isRefreshing = false
let failedQueue = []

const processQueue = (error) => {
  failedQueue.forEach(promise => {
    error ? promise.reject(error) : promise.resolve()
  })

  failedQueue = []
}

const setEncryptedStorage = (key, value) => {
  try {
    const encrypted = crypto.AES.encrypt(value, constants.crypto_key).toString()
    localStorage.setItem(key, encrypted)
  } catch (error) {
    console.error(`❌ Error encrypting storage for key "${key}":`, error)
    throw error
  }
}

const getEncryptedStorage = (key) => {
  try {
    const encrypted = localStorage.getItem(key)
    if (!encrypted) return null

    const decrypted = crypto.AES.decrypt(encrypted, constants.crypto_key).toString(crypto.enc.Utf8)
    return decrypted || null

  } catch (error) {
    console.error(`❌ Error decrypting storage for key "${key}":`, error)
    return null
  }
}

const getValidationErrorMessage = (errors) => {
  if (!errors || typeof errors !== 'object') return null

  const firstFieldErrors = Object.values(errors)[0]
  if (Array.isArray(firstFieldErrors) && firstFieldErrors.length > 0) {
    return firstFieldErrors[0]
  }

  return null
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const access_token = getEncryptedStorage('access_token')
    const refresh_token = getEncryptedStorage('refresh_token')

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`
    }

    if (['/logout', '/refresh-token'].includes(config.url) && refresh_token) {
      config.headers['X-Refresh-Token'] = refresh_token
    }
    
    return config
  },
  (error) => {
    showToast('error','fa-solid fa-circle-exclamation', t('error.request_error'), error.message || t('error.request_error_message'))
    console.error('❌ Request Error:', error.message)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const originalConfig = error.config

    // Bypass all error handling for logout requests
    if (originalConfig && originalConfig.url === '/logout') {
      return Promise.reject(error)
    }

    if (error.response) {
      const { status, data } = error.response
      
      // Handle 401 Unauthorized
      if (status === 401 && originalConfig) {
        // If refresh-token request itself fails, handle logout/account removal directly
        if (originalConfig.url === '/refresh-token') {
          const auth = useAuth()
          
          showToast('error','fa-solid fa-lock', data.message, data.errors)
          console.error('❌ Refresh token failed:', data)

          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('user')

          auth.resetUser()

          routes.push({ name: 'Login' })

          return Promise.reject(error)
        }
        
        // For other requests, attempt token refresh
        if (!originalConfig._retry) {
          originalConfig._retry = true
          
          // Queue this request to retry after token refresh
          const requestPromise = new Promise((resolve, reject) => {
            failedQueue.push({ 
              resolve: () => {
                resolve(api(originalConfig))
              }, 
              reject 
            })
          })

          // If already refreshing, wait for existing refresh
          if (isRefreshing && refreshPromise) {
            return refreshPromise.then(() => requestPromise).catch(err => Promise.reject(err))
          }

          // Start token refresh
          if (!isRefreshing) {
            isRefreshing = true
            
            refreshPromise = new Promise((resolve, reject) => {
              queueMicrotask(() => {
                api.post('/refresh-token', {}).then((response) => {
                  const { access_token, refresh_token } = response.data.data

                  setEncryptedStorage('access_token', access_token)
                  setEncryptedStorage('refresh_token', refresh_token)
                  
                  processQueue(null)
                  resolve(response)
                }).catch((err) => {
                  processQueue(err)
                  reject(err)
                }).finally(() => {
                  isRefreshing = false
                  refreshPromise = null
                })
              })
            })
          }

          return requestPromise
        }
      } else if (status === 403) {
        showToast('error','fa-solid fa-ban', data.message, data.errors)
        console.error('❌ Access Denied:', data)
      } else if (status === 404) {
        showToast('error','fa-solid fa-search', data.message, data.errors)
        console.error('❌ Not Found:', data)
      } else if (status === 422) {
        showToast('error', 'fa-solid fa-exclamation-circle', data.message, getValidationErrorMessage(data.errors))
        console.error('❌ Validation Error:', data)
      } else {
        showToast('error','fa-solid fa-times-circle', data.message, data.errors)
        console.error(`❌ HTTP Error ${status}:`, data)
      }
    } else if (error.request) {
      showToast('error','fa-solid fa-wifi', t('error.network_error'), t('error.network_error_message'))
      console.error('🌐 Network Error:', error.message)
    } else {
      showToast('error','fa-solid fa-times-circle', t('error.server_error'), t('error.server_error_message'))
      console.error('❌ Request Setup Error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default api