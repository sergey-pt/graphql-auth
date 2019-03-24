import {
  shield,
} from 'graphql-shield'

import {
  usersPermissions
} from '~/src/app/graphql/user/permissions'

const permissions = shield({
  Query: {
    ...usersPermissions.Query
  },
  Mutation: {
    ...usersPermissions.Mutation
  }
})

export {
  permissions
}
