import _ from 'lodash'

import {
  rule
} from 'graphql-shield'

import {
  AccessDeniedError
} from '~/src/app/errors/models/UserErrors'

const isAuthenticated = rule()(async (parent, args, ctx) => {
  if (ctx.currentUser) {
    return true
  } else {
    return false
  }
})

const isCurrentUser = rule()(async (parent, args, ctx) => {
  if (_.get(ctx, 'currentUser.id', undefined) === parent.id) {
    return true
  } else {
    return new AccessDeniedError({})
  }
})


export {
  isAuthenticated,
  isCurrentUser
}
