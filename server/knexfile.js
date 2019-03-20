// import environment variables
import dotenv from 'dotenv'
dotenv.config({
  path: './variables.env'
})

module.exports = {
  test: {
    client: 'postgresql',
    connection: process.env.PG_TEST_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/db/migrations'
    }
  },

  development: {
    client: 'postgresql',
    connection: process.env.PG_DEVELOPMENT_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/db/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.PG_PRODUCTION_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/db/migrations'
    }
  }
};
