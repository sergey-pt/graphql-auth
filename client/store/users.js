import 'cross-fetch/polyfill'

import ApolloClient from 'apollo-boost'
import { SIGNIN_USER } from '~/queries/users'

import { saveUserData, clearUserData } from '~/utils'

const client = new ApolloClient({
  uri: process.env.apiUrl
})

export const state = () => {
  return {
    token: '',
    userEmail: '',
    authError: null
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

  resetError(state) {
    state.authError = null
  },

  clearToken: state => (state.token = ''),
  clearUserEmail: state => (state.userEmail = null)
}

export const actions = {
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
    clearUserData()
  }
}

export const getters = {
  isAuthenticated: state => !!state.token,
  authError: state => state.authError,
  userEmail: state => state.userEmail
}
