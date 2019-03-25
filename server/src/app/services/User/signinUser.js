import bcrypt from 'bcrypt'

import {
  User
} from '~/src/app/models/User/Model'

import {
  generateToken
} from '~/src/app/auth/jwt'

import {
  InvalidAuthCredentialsError
} from '~/src/app/errors/models/UserErrors'

function credentialsError(data) {
  throw new InvalidAuthCredentialsError({
    data: {
      email: data.email,
      password: data.password
    }
  })
}

export default async ({
  data
}, ctx) => {
  const user = await User
    .query()
    .where('email', data.email)
    .first()

  if (!user) {
    credentialsError(data)
  }

  const passwordMatch = await bcrypt.compare(data.password, user.password)

  if (!passwordMatch) {
    credentialsError(data)
  }

  ctx.currentUser = user

  return {
    user,
    token: generateToken(user.id)
  }
}
