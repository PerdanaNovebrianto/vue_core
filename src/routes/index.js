import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './route/auth'
import adminRoutes from './route/admin'
import errorRoutes from './route/error'
import constants from '@/utils/constants'
import crypto from 'crypto-js'

// Get stored user from localStorage
const getStoredUser = () => {
  const encryptedUser = localStorage.getItem('user')
  if (!encryptedUser) return null

  try {
    const decryptedUser = crypto.AES.decrypt(encryptedUser, constants.crypto_key).toString(crypto.enc.Utf8)

    return decryptedUser ? JSON.parse(decryptedUser) : null
  } catch {
    return null
  }
}

// Create router instance
const routes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...adminRoutes, ...errorRoutes],
  scrollBehavior(to, from, savedPosition) {
    // Return saved position if available (browser back/forward)
    if (savedPosition) {
      return savedPosition
    }
    
    // Scroll to anchor if hash exists
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    
    // Scroll to top for new routes
    return { top: 0 }
  }
})

routes.beforeEach((to, from, next) => {
  const isAuthenticated = getStoredUser()

  document.title = to.meta.title ? `${to.meta.title} - ${constants.app_name}` : constants.app_name

  // Check authentication requirement
  if(['Login'].includes(to.name) && isAuthenticated){
    // Redirect to admin dashboard if authenticated
    next('/admin/dashboard')
  }
  else if(to.meta.auth && !isAuthenticated){
    // Redirect to login page if not authenticated and required authentication
    next('/')
  }
  else{
    // Continue navigation if authenticated and required authentication
    next()
  }
})
  
export default routes
