import {
  User
} from '~/src/app/models/User/Model'

import {
  generateToken
} from '~/src/app/auth/jwt'

export default async ({ data }, ctx) => {
  const user = await User.query().insert({
    ...data
  })

  ctx.currentUser = user

  return {
    user,
    token: generateToken(user.id)
  }
}
