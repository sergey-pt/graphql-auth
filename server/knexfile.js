// import environment variables
import dotenv from 'dotenv'
const environment = process.env.NODE_ENV || 'development'
dotenv.config({
  path: `./config/${environment}.env`
})

const pgConfig = {
  client: 'postgresql',
  connection: process.env.PG_CONNECTION_STRING,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './src/db/migrations'
  }
}

module.exports = {
  test: pgConfig,
  development: pgConfig,
  production: pgConfig
}
