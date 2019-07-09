import 'cross-fetch/polyfill'

import ApolloClient from 'apollo-boost'
import { SIGNIN_USER, CREATE_USER } from '~/queries/users'

import { saveUserData, clearUserData } from '~/utils'

const client = new ApolloClient({
  uri: process.env.apiUrl
})

export const state = () => {
  return {
    token: '',
    userEmail: '',
    authError: null,
    userErrors: []
  }
}

export const mutations = {
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

  async createUser({ commit }, userPayload) {
    try {
      const { data } = await client.mutate({
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
      const { data } = await client.mutate({
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
    commit('clearUserErrors')
    commit('clearAuthError')
    clearUserData()
  }
}

export const getters = {
  isAuthenticated: state => !!state.token,
  authError: state => state.authError,
  userErrors: state => state.userErrors,
  userEmail: state => state.userEmail
}
