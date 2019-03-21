import {
  User
} from '~/src/app/models/User'

const storyValidate = async ({
  instance
}) => {
  let errors = []

  const user = await User
    .query()
    .skipUndefined()
    .where('id', instance.userId)
    .first()

  if (!user) {
    errors.push({
      key: 'userId',
      keyword: 'notFound',
      message: 'Story should belongs to existing user'
    })
  }

  return errors
}

export default storyValidate
