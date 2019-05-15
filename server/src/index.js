import '@babel/polyfill/noConflict'
import server from '~/src/server'
import dotenv from 'dotenv'

const environment = process.env.NODE_ENV || 'development'
const port = process.env.PORT || '4000'
const host = process.env.HOST || '0.0.0.0'

dotenv.config({
  path: `~/config/${environment}.env`
})

server.listen({
  port,
  host
}).then(({ url }) => {
  console.log(`🚀 Server is ready at ${url} NODE_ENV=${environment}`)
})
