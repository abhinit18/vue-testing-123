export default function ({ store, redirect, route }) {
  if (store.state.auth.user && store.state.auth.user.token) {
    //return redirect('/')
    return redirect (store.getters['locale/getFinalUrl']('/'))

  }
}
