import 'cross-fetch/polyfill'
import faker from 'faker'

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

let user, client, jwtToken, updateData

const updateUser = gql `
  mutation($updateData: UpdateUserInput!) {
    updateUser(
      data: $updateData
    ){
      email
      username
    }
  }
`

describe('updateUser', () => {
  beforeAll(async () => {
    user = await userFactory.create('user')
    jwtToken = generateToken(user.id)
  })

  afterAll(async () => {
    await knex.destroy()
  })

  test('Should update current user', async () => {
    client = getClient(jwtToken)

    updateData = {
      email: faker.internet.email(),
      password: faker.internet.email(),
      username: faker.internet.userName()
    }

    let response = await client.mutate({
      mutation: updateUser,
      variables: {
        updateData
      }
    })

    expect(response.data.updateUser.email).toEqual(updateData.email)
    expect(response.data.updateUser.username).toEqual(updateData.username)

    const getCurrentUser = gql `
      query {
        getCurrentUser {
          email
          username
        }
      }
    `

    response = await client.query({
      query: getCurrentUser
    })

    expect(response.data.getCurrentUser.email).toEqual(updateData.email)
    expect(response.data.getCurrentUser.username).toEqual(updateData.username)
  })

  test('Should not update current user without valid authentication', async () => {
    client = getClient()

    updateData = {}

    await expect(
      client.mutate({
        mutation: updateUser,
        variables: {
          updateData
        }
      })
    ).rejects.toThrow('Authentication Required')
  })
})
