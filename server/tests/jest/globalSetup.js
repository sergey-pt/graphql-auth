require('@babel/register')
require('@babel/polyfill/noConflict')

const server = require('../../src/server').default
const dotenv = require('dotenv')
// const getPort = require('get-port')

const environment = process.env.NODE_ENV || 'test'
dotenv.config({
  path: `~/config/${environment}.env`
})

module.exports = async () => {
  const port = process.env.APOLLO_SERVER_PORT
  global.apollo = await server.listen({
    port
  })
  console.log(`\n\n🚀 Server ready at ${global.apollo.url} NODE_ENV=${environment}\n\n`)
}
