import faker from 'faker'
import bcrypt from 'bcrypt'
import uuidv4 from 'uuid/v4'

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  for (var index = 0; index < 3; index++) {
    let email = faker.internet.email()
    await knex('users').insert([{
      uuid: uuidv4(),
      email,
      password: await bcrypt.hash(email, 10),
      username: faker.internet.userName(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
  }
}

export {
  seed
}
