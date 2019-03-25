const environment = process.env.NODE_ENV || 'development'

const sourcePath = (['development', 'test'].includes(environment)) ?
  'src' : 'dist'

process.chdir(__dirname.replace(`${sourcePath}/db`, '')) // hack for wrong knex/bin/cli.js:61 behavior


import dotenv from 'dotenv'
dotenv.config({
  path: `./src/config/${environment}.env`
})

const pgConfig = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
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
