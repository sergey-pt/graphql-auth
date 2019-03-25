import 'cross-fetch/polyfill'

import {
  knex
} from '~/src/db/index'

import {
  gql
} from 'apollo-boost'

import userFactory from '~/tests/factories/UserFactory'
import getClient from '~/tests/utils/getClient'

let client, users, jwtToken

describe('getUsers', () => {
  beforeAll(async () => {
    users = await userFactory.createMany('user', 2)
  })

  afterAll(async () => {
    await knex.destroy()
  })

  test('Should return users list', async () => {
    client = getClient()

    const getUsers = gql `
      query {
        getUsers {
          uuid
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
          uuid: users[0].uuid,
          username: users[0].username
        })
      ])
    )
  })

  test('Should not return with sensitive emails of other users', async () => {
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

    try {
      await client.query({
        query: getUsers
      })
    } catch (error) {
      expect(error.graphQLErrors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            extensions: expect.objectContaining({
              code: 'ACCESS_DENIED_ERROR',
            }),
            path: expect.arrayContaining([
              'email'
            ])
          })
        ])
      )
    }
  })
})
