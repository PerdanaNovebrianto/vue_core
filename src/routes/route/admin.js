const DashboardPage = () => import('@/pages/admin/dashboard/DashboardPage.vue')

export default [
    {
      path: '/admin/dashboard',
      name: 'Admin.Dashboard',
      component: DashboardPage,
      meta: {
        auth: true,
        layout: 'admin',
        title: 'Dashboard',
      }
    },
]
