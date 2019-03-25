import faker from 'faker'
import {
  factory
} from 'factory-girl'
import ObjectionAdapter from 'factory-girl-objection-adapter'

import {
  User
} from '~/src/app/models/User/Model'

factory.setAdapter(new ObjectionAdapter())

let email

factory.define('user', User, {
  email: factory.sequence('User.email', () => {
    email = faker.internet.email()
    return email
  }),
  password: factory.sequence('User.password', () => email),
  username: factory.sequence('User.username', () => faker.internet.userName())
})

export default factory
