const guid = require('objection-guid')({
  field: 'uuid'
})

import {
  Model
} from '~/src/db/index'

class BaseModel extends guid(Model) {
  async $beforeInsert(context) {
    await super.$beforeInsert(context)
    this.created_at = new Date().toISOString()
    this.updated_at = new Date().toISOString()
  }

  async $beforeUpdate(options, context) {
    await super.$beforeUpdate(options, context)
    this.updated_at = new Date().toISOString()
  }
}

export {
  BaseModel
}
