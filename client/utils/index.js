import Cookie from 'js-cookie'

export const saveUserData = (signinUserData) => {
  localStorage.setItem('jwt', signinUserData.token)
  localStorage.setItem('userEmail', signinUserData.user.email)
  localStorage.setItem('userUuid', signinUserData.user.uuid)
  Cookie.set('jwt', signinUserData.token)
  Cookie.set('userEmail', signinUserData.user.email)
  Cookie.set('userUuid', signinUserData.user.uuid)
}

export const getUserFromCookie = req => {
  if (!req.headers.cookie) return

  const jwtCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('jwt='))
  const userEmailCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('userEmail='))
  const userUuidCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('userUuid='))

  if (!jwtCookie || !userEmailCookie || !userUuidCookie) return

  const jwt = jwtCookie.split('=')[1]
  const userEmail = userEmailCookie.split('=')[1]
  const userUuid = userUuidCookie.split('=')[1]

  return { jwt, userEmail, userUuid }
}

export const getUserFromLocalStorage = () => {
  if (localStorage) {
    const jwt = localStorage.getItem('jwt')
    const userEmail = localStorage.getItem('userEmail')
    const userUuid = localStorage.getItem('userUuid')

    return { jwt, userEmail, userUuid }
  }
}

export const clearUserData = () => {
  if (!process.server) {
    localStorage.removeItem('jwt')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userUuid')
  }
  Cookie.remove('jwt')
  Cookie.remove('userEmail')
  Cookie.remove('userUuid')
}
