import faker from 'faker'
import {
  factory
} from 'factory-girl'
import ObjectionAdapter from 'factory-girl-objection-adapter'

import {
  User
} from '~/src/app/models/User/Model'

factory.setAdapter(new ObjectionAdapter())

const email = faker.internet.email()

factory.define('user', User, {
  email,
  password: email,
  username: faker.internet.userName()
})

export default factory
