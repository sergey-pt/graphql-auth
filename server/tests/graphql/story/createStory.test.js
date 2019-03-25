import 'cross-fetch/polyfill'
import faker from 'faker'

import {
  knex
} from '~/src/db/index'

import {
  gql
} from 'apollo-boost'

import {
  generateToken,
} from '~/src/app/auth/jwt'

import userFactory from '~/tests/factories/UserFactory'
import getClient from '~/tests/utils/getClient'

let client, user, jwtToken, newStoryTitle = faker.lorem.sentence()

describe('createStory', () => {
  beforeAll(async () => {
    user = await userFactory.create('user')
    jwtToken = generateToken(user.id)
  })

  afterAll(async () => {
    await knex.destroy()
  })

  test('Should create a new user Story', async () => {
    client = getClient(jwtToken)

    const createStory = gql `
      mutation($data: CreateStoryInput!) {
        createStory(
          data: $data
        ){
          uuid
          title
          user {
            email
          }
        }
      }
    `
    const data = {
      title: newStoryTitle
    }

    const response = await client.mutate({
      mutation: createStory,
      variables: {
        data
      }
    })

    expect(response.data.createStory.title).toEqual(newStoryTitle)
    expect(response.data.createStory.user.email).toEqual(user.email)
  })

  test('Should not create story without valid authentication', async () => {
    client = getClient()

    const createStory = gql `
      mutation($data: CreateStoryInput!) {
        createStory(
          data: $data
        ){
          uuid
          title
          user {
            email
          }
        }
      }
    `
    const data = {
      title: newStoryTitle
    }

    await expect(
      client.mutate({
        mutation: createStory,
        variables: {
          data
        }
      })
    ).rejects.toThrow('Authentication Required')
  })
})
