import Cookie from 'js-cookie'

export const getUserFromCookie = (req) => {
  if (!req.headers.cookie) return
  const cookies = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='))
  if (!cookies) return
  const token = cookies.split('=')[1]
  return {token: token}

}

export const getUserFromLocalStorage = () => {
  const json = window.localStorage.token
  return json ? JSON.parse(json) : undefined
}

export const setToken = (user) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('token', JSON.stringify({token: user.token}))
  Cookie.set('token', user.token)
}
export const setUserName = (userName) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('userName', userName)
  Cookie.set('userName', userName)
}
export const setPassword = (password) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('password', password)
  Cookie.set('password', password)
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  Cookie.remove('token')
}
