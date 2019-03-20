const logger = require('pino')();

import dotenv from 'dotenv'
import glue from 'schemaglue'

import { ApolloServer } from 'apollo-server'

dotenv.config({
  path: '~/variables.env'
})

const { schema, resolver } = glue('./src/app/graphql')

async function main () {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolver,
    introspection: true,
    playground: true,
    context: params => () => {
      logger.info(params.req.headers);
      logger.info(params.req.body.query);
      logger.info(params.req.body.variables);
    },
    formatResponse: (response) => {
      logger.info(response);
      return response;
    },
    formatError: (error) => {
      logger.error(error);
      return error;
    },
  });

  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
}

main()
