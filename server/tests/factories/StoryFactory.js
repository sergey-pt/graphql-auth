import faker from 'faker'
import {
  factory
} from 'factory-girl'
import ObjectionAdapter from 'factory-girl-objection-adapter'

import {
  Story
} from '~/src/app/models/Story/Model'

factory.setAdapter(new ObjectionAdapter())

factory.define('story', Story, {
  title: factory.sequence('Story.title', () => faker.lorem.sentence()),
  userId: factory.sequence('Story.userId', (n) => n),
})

export default factory
