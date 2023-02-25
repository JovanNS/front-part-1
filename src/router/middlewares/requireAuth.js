import { useAuth } from '@/stores/useAuth'

export const requireAuth = async (to, from, next) => {
  const auth = useAuth()

  if(!auth.isAuthenticated && auth.token) {
    await auth.checkAuthentication();
  }

  if (!auth.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
}
