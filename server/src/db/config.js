const resolve = require('path').resolve
const environment = process.env.NODE_ENV || 'development'

if ((['development', 'test'].includes(environment))) {
  process.chdir(__dirname.replace('src/db', '')) // hack for wrong knex/bin/cli.js:61 behavior
}

import dotenv from 'dotenv'
dotenv.config({
  path: resolve(`./src/config/${environment}.env`)
})

const pgConfig = {
  client: 'postgresql',
  connection: process.env.PG_CONNECTION_STRING,
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 500
  },
  migrations: {
    directory: resolve('./src/db/migrations')
  },
  seeds: {
    directory: resolve('./src/db/seeds')
  }
}

module.exports = {
  test: pgConfig,
  development: pgConfig,
  production: pgConfig
}
