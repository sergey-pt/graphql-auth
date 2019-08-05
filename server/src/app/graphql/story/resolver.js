import {
  Story
} from '~/src/app/models/Story/Model'

import createStory from '~/src/app/services/Story/createStory'
import updateStory from '~/src/app/services/Story/updateStory'
import deleteStory from '~/src/app/services/Story/deleteStory'

const resolver = {
  Query: {
    getStories: async (_, { page }) => {
      const perPage = 5
      const currentPage = page - 1 || 0

      let stories = await Story.query()
        .orderBy('updated_at', 'desc')
        .eager('user')
        .page(currentPage, perPage)

      stories = {
        ...stories,
        currentPage: currentPage + 1,

        totalPages: Math.ceil(
          (stories.total / perPage)
        )
      }

      return {
        ...stories
      }
    }
  },

  Mutation: {
    createStory: async (_, { data }, ctx) => {
      return await createStory({
        data
      }, ctx)
    },

    updateStory: async (_, { data }, ctx) => {
      return await updateStory({
        data
      }, ctx)
    },

    deleteStory: async (_, { uuid }, ctx) => {
      return await deleteStory({
        uuid
      }, ctx)
    }
  }
}

export {
  resolver
}
