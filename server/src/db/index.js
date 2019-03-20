import Knex from 'knex'
import knexConfig from '~/knexfile.js'
import { Model } from 'objection'

const environment = process.env.NODE_ENV || 'development';
const knex = Knex(knexConfig[environment]);

Model.knex(knex);

// const knorm = require('@knorm/knorm');
// const knormTimestamps = require('@knorm/timestamps');
// const knormPostgres = require('@knorm/postgres');
// const knormRelations = require('@knorm/relations');

// module.exports = knorm()
//   .use(knormPostgres({ connection: process.env.PG_DEVELOPMENT_CONNECTION_STRING }))
//   .use(knormRelations())
//   .use(knormTimestamps());

export { Model }
