const dbConfig = require('./config')

const environment = process.env.NODE_ENV || 'development'
console.log(dbConfig[environment].connection)

let dbManager = require('knex-db-manager').databaseManagerFactory({
  knex: dbConfig[environment],
  dbManager: {
    // db manager related configuration
    superUser: 'postgres',
    superPassword: ''
  }
})

const createDb = async () => {
  try {
    await dbManager.createDb()
    console.log('Database has been successfully CREATED')
  } catch (error) {
    console.error(error.message)
  }
  dbManager.close().then(() => console.log('Connection closed'))
}

const truncateDb = async () => {
  try {
    await dbManager.truncateDb()
    console.log('Database has been successfully TRUNCATED')
  } catch (error) {
    console.error(error.message)
  }
  dbManager.close().then(() => console.log('Connection closed'))
}

const migrateDb = async () => {
  try {
    await dbManager.migrateDb()
    console.log('Database has been successfully MIGRATED')
  } catch (error) {
    console.error(error.message)
  }
  dbManager.close().then(() => console.log('Connection closed'))
}

const dropDb = async () => {
  try {
    await dbManager.dropDb()
    console.log('Database has been successfully DROPPED')
  } catch (error) {
    console.error(error.message)
  }
  dbManager.close().then(() => console.log('Connection closed'))
}

module.exports = {
  createDb,
  truncateDb,
  migrateDb,
  dropDb
}
