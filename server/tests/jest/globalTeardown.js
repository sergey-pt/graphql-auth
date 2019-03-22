const knexMigrate = require('knex-migrate')

const log = ({
  action,
  migration
}) => {
  console.log('Doing ' + action + ' on ' + migration)
}

module.exports = async () => {
  console.log('\n')
  await knexMigrate('down', {
    to: 0,
    knexfile: 'src/db/config.js'
  }, log)

  await global.apollo.server.close()
}
