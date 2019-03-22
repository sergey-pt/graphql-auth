import Knex from 'knex'
import dbConfig from '~/src/db/config.js'
import {
  Model
} from 'objection'

const environment = process.env.NODE_ENV || 'development'
const knex = Knex(dbConfig[environment])

Model.knex(knex)

export {
  knex,
  Model
}
