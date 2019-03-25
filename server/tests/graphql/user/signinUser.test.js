import 'cross-fetch/polyfill'

import {
  knex
} from '~/src/db/index'

import {
  gql
} from 'apollo-boost'

import {
  decodeToken,
} from '~/src/app/auth/jwt'

import userFactory from '~/tests/factories/UserFactory'
import getClient from '~/tests/utils/getClient'

let client = getClient()
let user

const signinUser = gql `
  mutation($data: SignInUserInput!) {
    signinUser(
      data: $data
    ){
      user {
        uuid
        email
        username
      }
      token
    }
  }
`

describe('signinUser', () => {
  beforeAll(async () => {
    user = await userFactory.create('user')
  })

  afterAll(async () => {
    await knex.destroy()
  })

  test('Should signin an existing User and return JWT token', async () => {
    const data = {
      email: user.email,
      password: user.email
    }

    const response = await client.mutate({
      mutation: signinUser,
      variables: {
        data
      }
    })

    const decodedToken = await decodeToken(response.data.signinUser.token)

    expect(decodedToken).toBeDefined()
    expect(decodedToken.email).toEqual(user.email)
    expect(response.data.signinUser.user.uuid).toEqual(user.uuid)
    expect(response.data.signinUser.user.email).toEqual(user.email)
    expect(response.data.signinUser.user.username).toEqual(user.username)
  })

  test('Should not sign in with invalid credentials', async () => {
    const data = {
      email: 'wrong@email.com',
      password: 'wrong@email.com'
    }

    await expect(
      client.mutate({
        mutation: signinUser,
        variables: {
          data
        }
      })
    ).rejects.toThrow('Invalid Auth Credentials')
  })
})
