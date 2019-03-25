import {
  shield,
} from 'graphql-shield'

import {
  AuthenticationRequiredError
} from '~/src/app/errors/models/UserErrors'

import {
  usersPermissions
} from '~/src/app/graphql/user/permissions'

import {
  storiesPermissions
} from '~/src/app/graphql/story/permissions'

const permissions = shield({
  Query: {
    ...usersPermissions.Query,
    ...storiesPermissions.Query
  },
  Mutation: {
    ...usersPermissions.Mutation,
    ...storiesPermissions.Mutation
  },
  User: {
    ...usersPermissions.User,
  }
}, {
  fallbackError: new AuthenticationRequiredError({})
})

export {
  permissions
}
