exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([{
    id: 1,
    email: 'nigel@email.com',
    password: 'Dorwssap23123',
    username: 'nigel',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    email: 'nakaz@email.com',
    password: 'Pasd12assword1',
    username: 'nakaz',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    email: 'jaywon@email.com',
    password: 'pakASDLsasd114',
    username: 'jaywon',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  ])
}
