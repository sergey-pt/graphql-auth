const environment = process.env.NODE_ENV || 'development'

const sourcePath = (['development', 'test'].includes(environment)) ?
  'src' : 'dist'

process.chdir(__dirname.replace(`${sourcePath}/db`, '')) // hack for wrong knex/bin/cli.js:61 behavior

const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.resolve(__dirname, `../config/${environment}.env`)
})

const host = process.env.DATABASE_HOST || 'localhost'
const port = process.env.DATABASE_PORT || '5432'
const database = process.env.DATABASE_NAME || 'graphql-auth-development'
const user = process.env.DATABASE_USER || 'postgres'
const password = process.env.DATABASE_PASSWORD || ''

const pgConfig = {
  client: 'postgres',
  connection: {
    host,
    port,
    database,
    user,
    password
  },
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 500
  },
  migrations: {
    directory: `./${sourcePath}/db/migrations`
  },
  seeds: {
    directory: `./${sourcePath}/db/seeds`
  }
}

module.exports = {
  test: pgConfig,
  development: pgConfig,
  production: pgConfig
}
