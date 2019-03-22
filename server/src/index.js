import '@babel/polyfill/noConflict'
import server from '~/src/server'
import dotenv from 'dotenv'

const environment = process.env.NODE_ENV || 'development'
const port = process.env.APOLLO_SERVER_PORT || '4000'

dotenv.config({
  path: `~/config/${environment}.env`
})

server.listen({
  port
}).then(({
  url
}) => {
  console.log(`🚀 Server is ready at ${url} NODE_ENV=${environment}`)
})
