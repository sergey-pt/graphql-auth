const up = (knex, Promise) => {
  return knex.schema.createTable('users', (t) => {
    t.increments().primary().unique();
    t.string('email').notNull().unique();
    t.string('passwordDigest').notNull();
    t.timestamps();
  });
};

const down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};

export { up, down }
