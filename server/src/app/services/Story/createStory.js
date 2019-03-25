import {
  Story
} from '~/src/app/models/Story/Model'

export default async ({
  data
}, ctx) => {
  const userId = ctx.currentUser.id
  return await Story.query().insert({
    userId,
    ...data
  })
}
