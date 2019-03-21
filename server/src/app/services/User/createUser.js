import {
  User
} from '~/src/app/models/User/Model'

export default async ({
  data
}) => {
  return await User.query().insert({
    ...data
  })
}
