import faker from 'faker'
import bcrypt from 'bcrypt'
import uuidv4 from 'uuid/v4'

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('stories').del()
  await knex('users').del()

  for (var index = 0; index < 3; index++) {
    let email = faker.internet.email()
    let userId = await knex('users').insert([{
      uuid: uuidv4(),
      email,
      password: await bcrypt.hash(email, 10),
      username: faker.internet.userName(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }]).returning('id')

    for (var i = 0; i < 3; i++) {
      await knex('stories').insert([{
        uuid: uuidv4(),
        title: faker.lorem.words(),
        userId: userId[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
    }
  }
}

export {
  seed
}
