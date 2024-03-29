const up = (knex) => {
  return knex.schema.createTable('users', (t) => {
    t.increments().primary().unique()
    t.string('uuid').notNull().unique()
    t.string('email').notNull().unique()
    t.string('username').notNull().unique()
    t.string('password').notNull()
    t.timestamps()
  })
}

const down = (knex) => {
  return knex.schema.dropTable('users')
}

export {
  up,
  down
}
