import _ from 'lodash'

import {
  User
} from '~/src/app/models/User/Model'

import {
  UserNotFoundError
} from '~/src/app/errors/models/UserErrors'

export default async ({
  data,
  ctx
}) => {
  const user = await User
    .query()
    .skipUndefined()
    .where('id', _.get(ctx, 'currentUser.id', undefined))
    .first()

  if (!user) {
    throw new UserNotFoundError({})
  }

  return await user.$query().updateAndFetch({
    ...data
  })
}
