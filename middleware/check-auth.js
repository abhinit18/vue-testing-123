import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'

export default function ({ isServer, store, req }) {
  // If nuxt generate, pass this middleware
  if (isServer && !req) return
  if (store.state.auth.user && store.state.auth.user.token) return
  if (store.state.invalidToken) {
    store.commit('auth/SET_USER', {})
  } else {
    //const loggedUser = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
    // No Need to use local storage
    const loggedUser = isServer ? getUserFromCookie(req): undefined
    store.commit('auth/SET_USER', loggedUser)
  }
  return 
}
