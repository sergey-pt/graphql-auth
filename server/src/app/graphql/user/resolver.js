import {
  User
} from '~/src/app/models/User/Model'

import createUser from '~/src/app/services/User/createUser'
import updateUser from '~/src/app/services/User/updateUser'

const resolver = {
  Query: {
    users: async () => {
      return await User.query().eager('stories')
    },
  },

  Mutation: {
    createUser: async (_, {
      data
    }) => {
      return await createUser({
        data
      })
    },

    updateUser: async (_, {
      data
    }) => {
      return await updateUser({
        data
      })
    }
  }
}

export {
  resolver
}
