import 'cross-fetch/polyfill'
import ApolloBoost, {
  gql
} from 'apollo-boost'

import {
  User
} from '~/src/app/models/User/Model'

const client = new ApolloBoost({
  uri: 'http://localhost:5000'
})

test('Should create a new User', async () => {
  const createUser = gql `
    mutation {
      createUser(
        data: {
          email: "pearce89@gmail.com"
          username: "pearce89"
          password: "Pearce89@gmail.com"
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
})
