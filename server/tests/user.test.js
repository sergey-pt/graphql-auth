import 'cross-fetch/polyfill'

import {
  knex
} from '~/src/db/index'

import ApolloBoost, {
  gql
} from 'apollo-boost'

import {
  User
} from '~/src/app/models/User/Model'

const client = new ApolloBoost({
  uri: 'http://localhost:5000'
})

describe('Users', () => {
  afterAll(async () => {
    await knex.destroy()
  })
  test('Should create a new User', async () => {
    const createUser = gql `
      mutation {
        createUser(
          data: {
            email: "email1@gmail.com"
            username: "username"
            password: "Email1@gmail.com"
          }
        ){
          id
          email
          username
        }
      }
    `
    const response = await client.mutate({
      mutation: createUser
    })

    const user = await User
      .query()
      .where('id', response.data.createUser.id)
      .first()

    expect(user).toBeDefined()
    expect(user.email).toEqual('email1@gmail.com')
  })
})
