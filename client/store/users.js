import 'cross-fetch/polyfill'

import ApolloClient from 'apollo-boost'
import { SIGNIN_USER } from '~/queries/users'

const client = new ApolloClient({
  uri: process.env.apiUrl
})

export const state = {
  token: ''
}

export const mutations = {
  setToken(state, token) {
    state.token = token
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
      console.error(err)
    }
  }
}

export const getters = {
  isAuthenticated: state => !!state.token
}
