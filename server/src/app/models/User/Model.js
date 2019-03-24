import obau from 'objection-before-and-unique'
import bcrypt from 'bcrypt'

import {
  BaseModel
} from '~/src/app/models/BaseModel'
import {
  Story
} from '~/src/app/models/Story/Model'

import userValidate from '~/src/app/models/User/Validation'
import {
  UserValidationError
} from '~/src/app/errors/models/UserErrors'

const opts = {
  before: [
    async ({
      instance,
      old,
      operation
    }) => {
      const userErrors = await userValidate({
        instance,
        old,
        operation
      })

      if (userErrors.length) {
        throw new UserValidationError({
          data: userErrors
        })
      }

      const password = instance.password || old.password
      instance.password = await bcrypt.hash(password, 10)
    }
  ]
}

class User extends obau(opts)(BaseModel) {
  static tableName = 'users'

  stories() {
    return this.$relatedQuery('stories')
  }

  static relationMappings = () => ({
    stories: {
      relation: BaseModel.HasManyRelation,
      modelClass: Story,
      join: {
        from: 'users.id',
        to: 'stories.userId'
      }
    }
  })
}

export {
  User
}
