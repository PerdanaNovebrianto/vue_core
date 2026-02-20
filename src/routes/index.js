import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './route/auth'
import adminRoutes from './route/admin'
import errorRoutes from './route/error'
import constants from '@/utils/constants'

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

  // Global navigation guards
routes.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - ${constants.app_name}` : constants.app_name

  next()
})
  
export default routes
