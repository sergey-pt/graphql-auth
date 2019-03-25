import 'cross-fetch/polyfill'

import {
  knex
} from '~/src/db/index'

import {
  gql
} from 'apollo-boost'

import userFactory from '~/tests/factories/UserFactory'
import storyFactory from '~/tests/factories/StoryFactory'
import getClient from '~/tests/utils/getClient'

let client, users, stories

const getStories = gql `
  query {
    getStories {
      uuid
      title
      user {
        uuid
        username
      }
    }
  }
`

describe('getStories', () => {
  beforeAll(async () => {
    users = await userFactory.createMany('user', 2)
    stories = await storyFactory.createMany('story', 2, [{
      userId: users[0].id
    }, {
      userId: users[1].id
    }])
  })

  afterAll(async () => {
    await knex.destroy()
  })

  test('Should return stories list', async () => {
    client = getClient()

    const response = await client.query({
      query: getStories
    })

    expect(response.data.getStories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user: expect.objectContaining({
            username: users[0].username,
          }),
          title: stories[0].title
        })
      ])
    )
  })
})
