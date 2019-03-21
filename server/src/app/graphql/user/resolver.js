import { User } from '~/src/app/models/User'
import { UserNotFoundError } from '~/src/app/errors/models/UserErrors'

const resolver = {
  Query: {
    users: async() => {
      const users = await User.query().eager('stories')
      return users
    },
  },

  Mutation: {
    createUser: async(parent, { data }, context, info) => {

      const user = await User.query().insert({
        email: data.email,
        password: data.password,
        username: data.username
      })

      return user
    },

    updateUser: async(parent, { data }, context, info) => {
      const user = await User
        .query()
        .where('id', data.id)
        .first()

      if (!user) {
        throw new UserNotFoundError({
          data: { id: data.id }
        })
      }

      const updatedUser = user.$query().updateAndFetch({
        email: data.email,
        password: data.password
      })

      return updatedUser
    }
  }
};

export { resolver }
