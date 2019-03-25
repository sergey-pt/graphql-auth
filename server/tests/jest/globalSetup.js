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
// const getPort = require('get-port')

dotenv.config({
  path: `~/config/${environment}.env`
})

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
