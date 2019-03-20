import validator from 'validator'
import obau from 'objection-before-and-unique';

import { Model } from '~/src/db/index'
import { Story } from '~/src/app/models/Story'
import { ValidationError } from 'ajv'

const opts = {
  schema: {
    type: 'object',
    required: ['email', 'passwordDigest'],

    properties: {
      id: { type: 'integer' },
      email: { type: 'string', minLength: 4, maxLength: 255 },
      passwordDigest: { type: 'string' }
    }
  },
  unique: [
    { key: 'email' }
  ],
  before: [
    ({ instance }) => {
      if (!validator.isEmail(instance.email)) {
        throw new ValidationError({
          code: 422,
          message: 'invalid email',
          type: 'ValidationError',
          data: { email: instance.email }
        })
      }
    }
  ]
}

class User extends obau(opts)(Model) {
  async $beforeInsert(context) {
    await super.$beforeInsert(context);
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  async $beforeUpdate(options, context) {
    await super.$beforeUpdate(options, context);
    this.updated_at = new Date().toISOString();
  }

  static tableName = 'users'

  stories() {
    return this.$relatedQuery('stories');
  }

  static relationMappings = () => ({
    stories: {
      relation: Model.HasManyRelation,
      modelClass: Story,
      join: {
        from: 'users.id',
        to: 'stories.userId'
      }
    }
  })
}

export { User }
