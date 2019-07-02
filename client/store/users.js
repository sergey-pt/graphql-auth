import 'cross-fetch/polyfill'

import ApolloClient from 'apollo-boost'
import { SIGNIN_USER } from '~/queries/users'

const client = new ApolloClient({
  uri: process.env.API_URL
})

export const state = () => {
  return {
    token: '',
    authError: null
  }
}

export const mutations = {
  setToken(state, token) {
    state.token = token
  },

  setError(state, payload) {
    state.authError = payload
  },

  resetError(state) {
    state.authError = null
  }
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

      commit('setToken', data.signinUser.token)

      console.log(data)
    } catch (err) {
      commit('setError', err.graphQLErrors[0])
    }
  }
}

export const getters = {
  isAuthenticated: state => !!state.token,
  authError: state => state.authError
}
