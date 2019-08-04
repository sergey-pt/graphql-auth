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
import storyFactory from '~/tests/factories/StoryFactory'
import getClient from '~/tests/utils/getClient'

let user, anotherUser, story, anotherStory, client, jwtToken

const deleteStory = gql `
  mutation($uuid: ID!) {
    deleteStory(
      uuid: $uuid
    ){
      uuid
      title
    }
  }
`

describe('deleteStory', () => {
  beforeAll(async () => {
    user = await userFactory.create('user')
    anotherUser = await userFactory.create('user')
    jwtToken = generateToken(user.id)

    story = await storyFactory.create('story', {
      userId: user.id
    })

    anotherStory = await storyFactory.create('story', {
      userId: anotherUser.id
    })
  })

  afterAll(async () => {
    await knex.destroy()
  })

  test('Should not update story without valid authentication', async () => {
    client = getClient()

    await expect(
      client.mutate({
        mutation: deleteStory,
        variables: {
          uuid: story.uuid
        }
      })
    ).rejects.toThrow('Authentication Required')
  })

  test('Should not update another user\'s story', async () => {
    client = getClient(jwtToken)

    await expect(
      client.mutate({
        mutation: deleteStory,
        variables: {
          uuid: anotherStory.uuid
        }
      })
    ).rejects.toThrow('Access Denied')
  })

  test('Should delete story', async () => {
    client = getClient(jwtToken)

    const response = await client.mutate({
      mutation: deleteStory,
      variables: {
        uuid: story.uuid
      }
    })

    expect(response.data.deleteStory.uuid).toEqual(story.uuid)
  })
})
