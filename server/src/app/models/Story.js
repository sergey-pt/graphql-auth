import obau from 'objection-before-and-unique'

import {
  BaseModel
} from '~/src/app/models/BaseModel'
import {
  User
} from '~/src/app/models/User'
import {
  UserNotFoundError
} from '~/src/app/errors/models/UserErrors'

const opts = {
  schema: {
    type: 'object',
    required: ['title', 'userId'],

    properties: {
      id: {
        type: 'integer'
      },
      title: {
        type: 'string',
        minLength: 4,
        maxLength: 120
      },
      userId: {
        type: 'integer'
      }
    },
  },
  before: [
    async ({
      instance
    }) => {
      const user = await User.query().where('id', instance.userId).first()
      if (!user) {
        throw new UserNotFoundError()
      }
    },
  ]
}

class Story extends obau(opts)(BaseModel) {
  static tableName = 'stories'

  user() {
    return this.$relatedQuery('user')
  }

  static relationMappings = () => ({
    user: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'stories.userId',
        to: 'users.id'
      }
    }
  })
}

export {
  Story
}
