import {
  Story
} from '~/src/app/models/Story/Model'

import createStory from '~/src/app/services/Story/createStory'
import updateStory from '~/src/app/services/Story/updateStory'

const resolver = {
  Query: {
    stories: async () => {
      return await Story.query().eager('user')
    }
  },

  Mutation: {
    createStory: async (_, {
      data
    }) => {
      return await createStory({
        data
      })
    },

    updateStory: async (_, {
      data
    }) => {
      return await updateStory({
        data
      })
    }
  }
}

export {
  resolver
}
