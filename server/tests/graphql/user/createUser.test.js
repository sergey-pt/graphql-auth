import 'cross-fetch/polyfill'
import faker from 'faker'

import {
  knex
} from '~/src/db/index'

import {
  gql
} from 'apollo-boost'

import {
  decodeToken,
} from '~/src/app/auth/jwt'

import getClient from '~/tests/utils/getClient'

let client = getClient()
let email = faker.internet.email()
let username = faker.internet.userName()

describe('createUser', () => {
  afterAll(async () => {
    await knex.destroy()
  })
  test('Should create a new User and return a JWT token', async () => {
    const createUser = gql `
      mutation($data: CreateUserInput!) {
        createUser(
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
    const data = {
      email,
      username,
      password: email
    }

    const response = await client.mutate({
      mutation: createUser,
      variables: {
        data
      }
    })

    const decodedToken = await decodeToken(response.data.createUser.token)

    expect(decodedToken).toBeDefined()
    expect(decodedToken.email).toEqual(email)
    expect(response.data.createUser.user.email).toEqual(email)
    expect(response.data.createUser.user.username).toEqual(username)
  })

  test('Should not create user with invalid data', async () => {
    const createUser = gql `
      mutation($data: CreateUserInput!) {
        createUser(
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
    const data = {
      email: 'wrongemail',
      password: 'wrongpassword',
      username
    }

    try {
      await client.mutate({
        mutation: createUser,
        variables: {
          data
        }
      })
    } catch (error) {
      expect(error.graphQLErrors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            extensions: expect.objectContaining({
              code: 'VALIDATION_ERROR',
              exception: {
                data: expect.arrayContaining([
                  expect.objectContaining({
                    'key': 'email',
                    'keyword': 'invalid',
                    'message': 'Email should have a valid format'
                  }),
                  expect.objectContaining({
                    'key': 'password',
                    'keyword': 'uppercase',
                    'message': 'Password should have uppercase characters'
                  }),
                  expect.objectContaining({
                    'key': 'username',
                    'keyword': 'unique',
                    'message': 'Username have been already taken'
                  })
                ])
              }
            })
          })
        ])
      )
    }
  })

  test('Should not create user with the same email', async () => {
    const createUser = gql `
      mutation($data: CreateUserInput!) {
        createUser(
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
    const data = {
      email,
      password: email,
      username: faker.internet.userName()
    }

    try {
      await client.mutate({
        mutation: createUser,
        variables: {
          data
        }
      })
    } catch (error) {
      expect(error.graphQLErrors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            extensions: expect.objectContaining({
              code: 'VALIDATION_ERROR',
              exception: {
                data: expect.arrayContaining([
                  expect.objectContaining({
                    'key': 'email',
                    'keyword': 'unique',
                    'message': 'Email have been already taken'
                  })
                ])
              }
            })
          })
        ])
      )
    }
  })
})
