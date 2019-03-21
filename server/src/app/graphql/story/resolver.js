import { Story } from '~/src/app/models/Story'

const resolver = {
  Query: {
    stories: async() => {
      const stories = await Story.query().eager('user')
      return stories
    },
  },

  Mutation: {
    createStory: async(parent, { data }, context, info) => {
      const story = await Story.query().insert({ ...data })

      return story
    },

    updateStory: async(parent, { data }, context, info) => {
      const { id, ...updateParams } = data;

      const story = await Story
        .query()
        .where('id', id)
        .first()

      if (!story) {
        throw new StoryNotFoundError({
          data: { id }
        })
      }

      const updatedStory = story.$query().updateAndFetch({ ...updateParams })

      return updatedStory
    }
  }
};

export { resolver }
