import obau from 'objection-before-and-unique'

import {
  BaseModel
} from '~/src/app/models/BaseModel'
import {
  User
} from '~/src/app/models/User/Model'

import storyValidate from '~/src/app/models/Story/Validation'
import {
  StoryValidationError
} from '~/src/app/errors/models/StoryErrors'

const opts = {
  schema: {
    type: 'object',

    properties: {
      id: {
        type: 'integer'
      },
      title: {
        type: 'string'
      },
      userId: {
        type: 'integer'
      }
    },
  },
  before: [
    async ({
      instance,
      old,
      operation
    }) => {
      const storyErrors = await storyValidate({
        instance,
        old,
        operation
      })

      if (storyErrors.length) {
        throw new StoryValidationError({
          data: storyErrors
        })
      }
    }
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
