import {
  Story
} from '~/src/app/models/Story/Model'

import createStory from '~/src/app/services/Story/createStory'
import updateStory from '~/src/app/services/Story/updateStory'
import deleteStory from '~/src/app/services/Story/deleteStory'

const resolver = {
  Query: {
    getStories: async () => {
      return await Story.query().eager('user')
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
