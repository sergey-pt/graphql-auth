const logger = require('pino')()

import glue from 'schemaglue'

import {
  ApolloServer
} from 'apollo-server'

const {
  schema,
  resolver
} = glue('./src/app/graphql')

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
  introspection: true,
  playground: true,
  context: params => () => {
    if (process.env.NODE_ENV === 'test') {
      return
    }
    logger.info(params.req.headers)
    logger.info(params.req.body.query)
    logger.info(params.req.body.variables)
  },
  formatResponse: (response) => {
    if (process.env.NODE_ENV === 'test') {
      return response
    }
    logger.info(response)
    return response
  },
  formatError: (error) => {
    if (process.env.NODE_ENV === 'test') {
      return error
    }
    logger.error(error)
    return error
  },
})

export {
  server as
  default
}
