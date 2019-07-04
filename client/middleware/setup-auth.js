import jwtDecode from 'jwt-decode'

import { getUserFromCookie, getUserFromLocalStorage } from '~/utils'

export default function({ store, req }) {
  if (process.server && !req) return

  const userData = process.server
    ? getUserFromCookie(req)
    : getUserFromLocalStorage()

  if (!userData) {

  } else if (!userData.jwt) {
    store.commit('users/clearToken')
    store.commit('users/clearUserEmail')
  } else if ((new Date).getTime() > (new Date(0)).setUTCSeconds(jwtDecode(userData.jwt).exp)) {
    // logout user if token expired
    store.commit('users/clearToken')
    store.commit('users/clearUserEmail')
  } else {
    store.commit('users/setToken', userData.jwt)
    store.commit('users/setUserEmail', userData.userEmail)
  }
}
