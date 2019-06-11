import '@babel/polyfill/noConflict'
import server from '~/src/server'

const environment = process.env.NODE_ENV || 'development'

require('dotenv').config({
  path: __dirname + `/config/${environment}.env`
})

const port = process.env.PORT || '4000'
const host = process.env.HOST || '0.0.0.0'

console.log(`PORT ${process.env.PORT}`)

server.listen({
  port,
  host
}).then(({ url }) => {
  console.log(`🚀 Server is ready at ${url} NODE_ENV=${environment}`)
})
