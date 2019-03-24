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

describe('getUsers', () => {
  beforeAll(async () => {
    user = await userFactory.create('user')
    jwtToken = generateToken(user.id)
  })

  afterAll(async () => {
    await knex.destroy()
  })

  test('Should return users list', async () => {
    client = getClient(jwtToken)

    const getUsers = gql `
      query {
        getUsers {
          uuid
          email
          username
        }
      }
    `

    const response = await client.query({
      query: getUsers
    })

    expect(response.data.getUsers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uuid: user.uuid,
          email: user.email,
          username: user.username
        })
      ])
    )
  })

  test('Should not return users list without valid authentication', async () => {
    client = getClient()

    const getUsers = gql `
      query {
        getUsers {
          uuid
          email
          username
        }
      }
    `

    await expect(
      client.query({
        query: getUsers
      })
    ).rejects.toThrow('Authentication Required')
  })
})
