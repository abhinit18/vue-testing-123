export default function ({ store, redirect, route }) {
  let query = route.query
  if (store.state.invalidToken) {
//    return redirect('/kk/login', query)
return redirect (store.getters['locale/getFinalUrl']('/login'), query)

  } else if (!store.state.auth.user || !store.state.auth.user.token) {
    return redirect (store.getters['locale/getFinalUrl']('/marketing'), query)
//    console.log('inside auth', store.state);
//    return redirect((store.state.selectedLocale ? ('/'+store.state.selectedLocale) : '/kk')+'/marketing', query)
  } else if (!store.state.initialData.onboarding && route.name!=='onboarding' && route.name!=='lang-onboarding') {
    return redirect (store.getters['locale/getFinalUrl']('/onboarding'), query)
  }
}
