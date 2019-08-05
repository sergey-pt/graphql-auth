import 'cross-fetch/polyfill'
import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { SIGNIN_USER, CREATE_USER, UPDATE_USER } from '~/queries/users'
import { saveUserData, clearUserData } from '~/utils'

export const state = () => {
  return {
    token: '',
    userEmail: '',
    userUuid: '',
    authError: null,
    userErrors: []
  }
}

export const mutations = {
  setUserUuid(state, userUuid) {
    state.userUuid = userUuid
  },

  setUserEmail(state, userEmail) {
    state.userEmail = userEmail
  },

  setToken(state, token) {
    state.token = token
  },

  setError(state, payload) {
    state.authError = payload
  },

  setUserErrors(state, payload) {
    state.userErrors = payload
  },

  resetUserError(state, payload) {
    state.userErrors = state.userErrors.filter((error) => {
      return error.key !== payload
    })
  },

  resetError(state) {
    state.authError = null
  },

  clearToken: state => (state.token = ''),
  clearUserEmail: state => (state.userEmail = null),
  clearUserUuid: state => (state.userUuid = null),
  clearUserErrors: state => (state.userErrors = []),
  clearAuthError: state => (state.authError = null)
}

export const actions = {
  clearUserErrors({ commit }) {
    commit('clearUserErrors')
  },

  resetUserError({ commit }, userErrorKey) {
    commit('resetUserError', userErrorKey)
  },

  async updateUser({ commit }, userPayload) {
    try {
      const { data } = await this.app.apolloProvider.defaultClient.mutate({
        mutation: UPDATE_USER,
        variables: {
          data: {
            username: userPayload.username,
            email: userPayload.email,
            password: userPayload.password
          }
        }
      })

      commit('setUserEmail', data.updateUser.email)
      commit('clearUserErrors')
      localStorage.setItem('userEmail', data.updateUser.email)
      Cookie.set('userEmail', data.updateUser.email)
    } catch (err) {
      const errorDetails = err.graphQLErrors.map(function(serverError) {
        return serverError.extensions.exception.data.map(function(serverErrorDetail) {
          return {
            code: serverError.extensions.code,
            key: serverErrorDetail.key,
            keyword: serverErrorDetail.keyword,
            message: serverErrorDetail.message
          }
        })
      }).flat()
      commit('setUserErrors', errorDetails)
    }
  },

  async createUser({ commit }, userPayload) {
    try {
      const { data } = await this.app.apolloProvider.defaultClient.mutate({
        mutation: CREATE_USER,
        variables: {
          data: {
            username: userPayload.username,
            email: userPayload.email,
            password: userPayload.password
          }
        }
      })

      commit('setUserEmail', data.createUser.user.email)
      commit('setToken', data.createUser.token)
      saveUserData(data.createUser)
    } catch (err) {
      const errorDetails = err.graphQLErrors.map(function(serverError) {
        return serverError.extensions.exception.data.map(function(serverErrorDetail) {
          return {
            code: serverError.extensions.code,
            key: serverErrorDetail.key,
            keyword: serverErrorDetail.keyword,
            message: serverErrorDetail.message
          }
        })
      }).flat()
      commit('setUserErrors', errorDetails)
    }
  },

  async authenticateUser({ commit }, userPayload) {
    try {
      const { data } = await this.app.apolloProvider.defaultClient.mutate({
        mutation: SIGNIN_USER,
        variables: {
          data: {
            email: userPayload.email,
            password: userPayload.password
          }
        }
      })

      commit('setUserEmail', data.signinUser.user.email)
      commit('setToken', data.signinUser.token)
      saveUserData(data.signinUser)
    } catch (err) {
      commit('setError', err.graphQLErrors[0])
    }
  },

  logoutUser({ commit }) {
    commit('clearToken')
    commit('clearUserEmail')
    commit('clearUserUuid')
    commit('clearUserErrors')
    commit('clearAuthError')
    clearUserData()
  }
}

export const getters = {
  isAuthenticated: (state) => {
    if (state.token) {
      try {
        const tokenExpire = new Date(jwtDecode(state.token).exp * 1000)
        if (new Date() < tokenExpire) {
          return true
        } else {
          return false
        }
      } catch (error) {
        return false
      }
    } else {
      return false
    }
  },
  authError: state => state.authError,
  userErrors: state => state.userErrors,
  userEmail: state => state.userEmail,
  userUuid: state => state.userUuid
}
