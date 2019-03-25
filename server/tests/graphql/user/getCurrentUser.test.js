import 'cross-fetch/polyfill'

import {
  knex
} from '~/src/db/index'

import {
  gql
} from 'apollo-boost'

import {
  generateToken
} from '~/src/app/auth/jwt'

import userFactory from '~/tests/factories/UserFactory'
import getClient from '~/tests/utils/getClient'

let client, user, jwtToken
const getCurrentUser = gql `
  query {
    getCurrentUser {
      uuid
      email
      username
    }
  }
`

describe('getUsers', () => {
  beforeAll(async () => {
    user = await userFactory.create('user')
    jwtToken = generateToken(user.id)
  })

  afterAll(async () => {
    await knex.destroy()
  })

  test('Should return current user', async () => {
    client = getClient(jwtToken)

    const response = await client.query({
      query: getCurrentUser
    })

    expect(response.data.getCurrentUser.uuid).toEqual(user.uuid)
    expect(response.data.getCurrentUser.email).toEqual(user.email)
    expect(response.data.getCurrentUser.username).toEqual(user.username)
  })

  test('Should not return current user without valid authentication', async () => {
    client = getClient()

    await expect(
      client.query({
        query: getCurrentUser
      })
    ).rejects.toThrow('Authentication Required')
  })
})
