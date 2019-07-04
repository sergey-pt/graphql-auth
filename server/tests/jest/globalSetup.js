require('@babel/register')
require('@babel/polyfill/noConflict')

const knexMigrate = require('knex-migrate')
const log = ({
  action,
  migration
}) => {
  console.log(`Doing ${action} on ${migration}`)
}

const environment = process.env.NODE_ENV || 'test'

const server = require('../../src/server').default
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

if (!process.env.CIRCLECI) {
  const envConfig = dotenv.parse(
    fs.readFileSync(
      path.resolve(__dirname, `../../src/config/${environment}.env`)
    )
  )

  for (let k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

module.exports = async () => {
  console.log('\n')
  await knexMigrate('up', {
    knexfile: 'src/db/config.js'
  }, log)

  const port = process.env.PORT
  global.apollo = await server.listen({
    port
  })
  console.log(`\n🚀 Server is ready at ${global.apollo.url} NODE_ENV=${environment}\n`)
}
