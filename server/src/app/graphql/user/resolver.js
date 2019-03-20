import { User } from '~/src/app/models/User'
import bcrypt from 'bcrypt'

const resolver = {
  Query: {
    users: async() => {
      const users = await User.query().eager('stories')
      return users
    },
  },

  Mutation: {
    createUser: async(parent, { data }, context, info) => {
      const passwordDigest = await bcrypt.hash(data.password, 10);

      const user = await User.query().insert({ email: data.email, passwordDigest })

      return user
    },

    updateUser: async(parent, { data }, context, info) => {
      const passwordDigest = await bcrypt.hash(data.password, 10);

      const user = await User
        .query()
        .first()
        .where('id', data.id)
        .throwIfNotFound()
        .then((u) => u.$query().updateAndFetch({ email: data.email, passwordDigest }))

      return user
    }
  }
};

export { resolver }
