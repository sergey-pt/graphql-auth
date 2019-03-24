import {
  isAuthenticated
} from '~/src/app/auth/rules'

const usersPermissions = {
  Query: {
    getUsers: isAuthenticated,
    getCurrentUser: isAuthenticated
  },
  Mutation: {
    updateUser: isAuthenticated
  }
}

export {
  usersPermissions
}
