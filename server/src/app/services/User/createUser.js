import {
  User
} from '~/src/app/models/User/Model'

import {
  generateToken
} from '~/src/app/auth/jwt'

export default async ({
  data
}) => {
  const user = await User.query().insert({
    ...data
  })

  return {
    user,
    token: generateToken(user.id)
  }
}
