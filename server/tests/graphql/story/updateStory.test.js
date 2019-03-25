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
import storyFactory from '~/tests/factories/StoryFactory'
import getClient from '~/tests/utils/getClient'

let user, anotherUser, story, anotherStory, client, jwtToken, updateData

const updateStory = gql `
  mutation($updateData: UpdateStoryInput!) {
    updateStory(
      data: $updateData
    ){
      uuid
      title
      user {
        email
      }
    }
  }
`

describe('updateStory', () => {
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

  test('Should update story', async () => {
    client = getClient(jwtToken)

    updateData = {
      uuid: story.uuid,
      title: faker.lorem.sentence()
    }

    const response = await client.mutate({
      mutation: updateStory,
      variables: {
        updateData
      }
    })

    expect(response.data.updateStory.title).toEqual(updateData.title)
  })

  test('Should not update story without valid authentication', async () => {
    client = getClient()

    updateData = {
      uuid: story.uuid,
      title: faker.lorem.sentence()
    }

    await expect(
      client.mutate({
        mutation: updateStory,
        variables: {
          updateData
        }
      })
    ).rejects.toThrow('Authentication Required')
  })

  test('Should not update another user\'s story', async () => {
    client = getClient(jwtToken)

    updateData = {
      uuid: anotherStory.uuid,
      title: faker.lorem.sentence()
    }

    await expect(
      client.mutate({
        mutation: updateStory,
        variables: {
          updateData
        }
      })
    ).rejects.toThrow('Access Denied')
  })
})
