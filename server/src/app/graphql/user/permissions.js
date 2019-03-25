import {
  isAuthenticated,
  isCurrentUser
} from '~/src/app/auth/rules'

const usersPermissions = {
  Query: {
    getCurrentUser: isAuthenticated
  },
  Mutation: {
    updateUser: isAuthenticated
  },
  User: {
    email: isCurrentUser
  }
}

export {
  usersPermissions
}
