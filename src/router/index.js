import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth } from './middlewares/requireAuth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Authentication/LoginView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/users',
      name: 'users.index',
      component: () => import('../views/Users/UsersIndex.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/users/:id',
      name: 'users.show',
      component: () => import('../views/Users/UserShow.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/users/create',
      name: 'users.create',
      component: () => import('../views/Users/UserShow.vue'),
      meta: { requiresAuth: true }
    },
    { path: '/:pathMatch(.*)*', component: () => import('../views/NotFound.vue') }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    requireAuth(to, from, next)
  } else {
    next()
  }
})
export default router
