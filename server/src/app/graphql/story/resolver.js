import {
  Story
} from '~/src/app/models/Story/Model'

import createStory from '~/src/app/services/Story/createStory'
import updateStory from '~/src/app/services/Story/updateStory'

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
    }
  }
}

export {
  resolver
}
