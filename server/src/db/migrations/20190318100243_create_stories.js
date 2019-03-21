const up = (knex) => {
  return knex.schema.createTable('stories', (t) => {
    t.increments().primary().unique()
    t.string('title').notNull()
    t.integer('userId').unsigned().references('users.id').notNull()
    t.timestamps()
  })
}

const down = (knex) => {
  return knex.schema.dropTable('stories')
}

export {
  up,
  down
}
