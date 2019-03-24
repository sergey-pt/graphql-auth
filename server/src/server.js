import pino from 'pino'
import glue from 'schemaglue'
import _ from 'lodash'

import {
  ApolloServer
} from 'apollo-server'

import {
  makeExecutableSchema
} from 'graphql-tools'

import {
  applyMiddleware
} from 'graphql-middleware'

import {
  permissions
} from '~/src/app/auth/permissions'

import {
  decodeToken,
} from '~/src/app/auth/jwt'

const logger = pino({
  enabled: !(process.env.LOG_ENABLED === 'false')
})
const environment = process.env.NODE_ENV || 'development'
const graphqlSchemaPath = (['development', 'test'].includes(environment)) ?
  './src/app/graphql' : './dist/app/graphql'

const {
  schema,
  resolver
} = glue(graphqlSchemaPath)

let graphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver,
})

graphQLSchema = applyMiddleware(graphQLSchema, permissions)

const server = new ApolloServer({
  schema: graphQLSchema,
  introspection: true,
  playground: true,
  context: async ({
    req
  }) => {
    logger.info(req.headers, '[HEADERS]')
    logger.info(req.body.query, '[QUERY]')
    logger.info(req.body.variables, '[VARIABLES]')

    return {
      ...req,
      currentUser: await decodeToken(_.get(req, 'headers.authorization', null)),
    }
  },
  formatResponse: (response) => {
    logger.info(response, '[RESPONSE]')
    return response
  },
  formatError: (error) => {
    logger.error(error, '[ERROR]')
    return error
  },
})

export {
  server as
  default
}
