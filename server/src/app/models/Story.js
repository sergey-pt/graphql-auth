import validator from 'validator'
import obau from 'objection-before-and-unique';

import { Model } from '~/src/db/index'
import { User } from '~/src/app/models/User'
import { ValidationError } from 'ajv'

const opts = {
  schema: {
    type: 'object',
    required: ['title', 'userId'],

    properties: {
      id: { type: 'integer' },
      title: { type: 'string', minLength: 4, maxLength: 120 },
      userId: { type: 'integer' }
    },
  },
  before: [
    async ({ instance }) => {
      await User.query().where('id', instance.userId).throwIfNotFound().first()
    },
  ]
}

class Story extends obau(opts)(Model) {
  async $beforeInsert(context) {
    await super.$beforeInsert(context);
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  async $beforeUpdate(options, context) {
    await super.$beforeUpdate(options, context);
    this.updated_at = new Date().toISOString();
  }

  static tableName = 'stories'

  user() {
    return this.$relatedQuery('user');
  }

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'stories.userId',
        to: 'users.id'
      }
    }
  })
}

export { Story }
