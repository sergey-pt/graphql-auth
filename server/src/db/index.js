import Knex from 'knex'
import knexConfig from '~/knexfile.js'
import {
  Model
} from 'objection'

const environment = process.env.NODE_ENV || 'development'
const knex = Knex(knexConfig[environment])

Model.knex(knex)

export {
  Model
}
