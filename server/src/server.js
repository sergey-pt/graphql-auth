import glue from 'schemaglue'
import {
  ApolloServer
} from 'apollo-server'

const {
  schema,
  resolver
} = glue('./src/app/graphql')

const logger = require('pino')({
  enabled: !(process.env.LOG_ENABLED === 'false')
})

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
  introspection: true,
  playground: true,
  context: params => () => {
    logger.info(params.req.headers)
    logger.info(params.req.body.query)
    logger.info(params.req.body.variables)
  },
  formatResponse: (response) => {
    logger.info(response)
    return response
  },
  formatError: (error) => {
    logger.error(error)
    return error
  },
})

export {
  server as
  default
}
