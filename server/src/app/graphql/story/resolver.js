import {
  Story
} from '~/src/app/models/Story'
import {
  StoryNotFoundError
} from '~/src/app/errors/models/StoryErrors'

import {
  GraphQLScalarType
} from 'graphql'

const resolver = {
  Query: {
    stories: async () => {
      const stories = await Story.query().eager('user')
      return stories
    },
  },

  Mutation: {
    createStory: async (parent, {
      data
    }) => {
      const story = await Story.query().insert({
        ...data
      })

      return story
    },

    updateStory: async (parent, {
      data
    }) => {
      const {
        id,
        ...updateParams
      } = data

      const story = await Story
        .query()
        .where('id', id)
        .first()

      if (!story) {
        throw new StoryNotFoundError({
          data: {
            id
          }
        })
      }

      const updatedStory = story.$query().updateAndFetch({
        ...updateParams
      })

      return updatedStory
    }
  }
}

export {
  resolver
}
