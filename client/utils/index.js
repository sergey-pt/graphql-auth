import Cookie from 'js-cookie'

export const saveUserData = (signinUserData) => {
  localStorage.setItem('jwt', signinUserData.token)
  localStorage.setItem('userEmail', signinUserData.user.email)
  Cookie.set('jwt', signinUserData.token)
  Cookie.set('userEmail', signinUserData.user.email)
}

export const getUserFromCookie = req => {
  if (!req.headers.cookie) return

  const jwtCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('jwt='))
  const userEmailCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('userEmail='))

  if (!jwtCookie || !userEmailCookie) return

  const jwt = jwtCookie.split('=')[1]
  const userEmail = userEmailCookie.split('=')[1]

  return { jwt, userEmail }
}

export const getUserFromLocalStorage = () => {
  if (localStorage) {
    const jwt = localStorage.getItem('jwt')
    const userEmail = localStorage.getItem('userEmail')

    return { jwt, userEmail }
  }
}

export const clearUserData = () => {
  if (!process.server) {
    localStorage.removeItem('jwt')
    localStorage.removeItem('userEmail')
  }
  Cookie.remove('jwt')
  Cookie.remove('userEmail')
}
