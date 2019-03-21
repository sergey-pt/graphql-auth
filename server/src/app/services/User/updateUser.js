import {
  User
} from '~/src/app/models/User/Model'

import {
  UserNotFoundError
} from '~/src/app/errors/models/UserErrors'

export default async ({
  data
}) => {
  const user = await User
    .query()
    .where('id', data.id)
    .first()

  if (!user) {
    throw new UserNotFoundError({
      data: {
        id: data.id
      }
    })
  }

  return await user.$query().updateAndFetch({
    email: data.email,
    password: data.password
  })
}
