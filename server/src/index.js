import '@babel/polyfill/noConflict'
import server from '~/src/server'

const environment = process.env.NODE_ENV || 'development'

require('dotenv').config({
  path: __dirname + `/config/${environment}.env`
})

const port = process.env.PORT || '4000'
const host = process.env.HOST || '0.0.0.0'

server.listen({
  port,
  host
}).then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url} NODE_ENV=${environment}`)
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl} NODE_ENV=${environment}`)
})
