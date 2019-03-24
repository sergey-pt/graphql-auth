import {
  rule
} from 'graphql-shield'

import {
  AuthenticationRequiredError
} from '~/src/app/errors/models/UserErrors'

const isAuthenticated = rule()(async (parent, args, ctx) => {
  if (ctx.currentUser) {
    return true
  } else {
    return new AuthenticationRequiredError({})
  }
})

export {
  isAuthenticated
}
