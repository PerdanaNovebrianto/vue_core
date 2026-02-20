const LoginPage = () => import('@/pages/auth/LoginPage.vue')

export default [
    {
      path: '/',
      name: 'Login',
      component: LoginPage,
      meta: {
        auth: false,
        layout: 'auth',
        title: 'Login',
      }
    },
]
