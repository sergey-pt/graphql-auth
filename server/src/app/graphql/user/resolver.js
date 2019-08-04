import {
  User
} from '~/src/app/models/User/Model'

import createUser from '~/src/app/services/User/createUser'
import signinUser from '~/src/app/services/User/signinUser'
import updateUser from '~/src/app/services/User/updateUser'

const resolver = {
  Query: {
    getCurrentUser: async (_, { storiesPage }, ctx) => {
      const currentPage = storiesPage || 0
      const user = ctx.currentUser

      let stories = await user.$relatedQuery('stories').page(currentPage, 10)
      // currentPage starts from 0. But total pages starts from 1
      // fix to make it similar
      stories.total -= 1

      stories = {
        ...stories,
        currentPage
      }

      return {
        ...user,
        stories
      }
    },

    getUsers: async () => {
      return await User.query().eager('stories')
    },
  },

  Mutation: {
    createUser: async (_, { data }, ctx) => {
      return await createUser({
        data
      }, ctx)
    },

    signinUser: async (_, { data }, ctx) => {
      return await signinUser({
        data
      }, ctx)
    },

    updateUser: async (_, { data }, ctx) => {
      return await updateUser({
        data,
        ctx
      })
    }
  }
}

export {
  resolver
}
