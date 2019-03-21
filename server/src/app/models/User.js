import obau from 'objection-before-and-unique'
import bcrypt from 'bcrypt'

import {
  BaseModel
} from '~/src/app/models/BaseModel'
import {
  Story
} from '~/src/app/models/Story'

import userValidate from '~/src/app/models/UserValidation'
import {
  UserValidationError
} from '~/src/app/errors/models/UserErrors'

const opts = {
  schema: {
    type: 'object',
    required: ['email', 'password'],

    properties: {
      id: {
        type: 'integer'
      },
      email: {
        type: 'string'
      },
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    }
  },
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
