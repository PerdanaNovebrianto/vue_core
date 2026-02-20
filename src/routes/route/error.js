const Error403Page = () => import('@/pages/error/Error403Page.vue')
const Error404Page = () => import('@/pages/error/Error404Page.vue')
const Error500Page = () => import('@/pages/error/Error500Page.vue')

export default [
    {
      path : '/error/403',
      name : 'Error.403',
      component : Error403Page,
      meta: {
        auth: false,
        layout: 'error',
        title: 'Error 403',
      }
    },
    {
      path : '/error/500',
      name : 'Error.500',
      component : Error500Page,
      meta: {
        auth: false,
        layout: 'error',
        title: 'Error 500',
      }
    },
    {
      path : '/:pathMatch(.*)*',
      name : 'Error.404',
      component : Error404Page,
      meta: {
        auth: false,
        layout: 'error',
        title: 'Error 404',
      }
    },
]
