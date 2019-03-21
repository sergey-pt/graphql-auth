import {
  Story
} from '~/src/app/models/Story/Model'

import {
  StoryNotFoundError
} from '~/src/app/errors/models/StoryErrors'

export default async ({
  data
}) => {
  const {
    id,
    ...updateParams
  } = data

  const story = await Story.query()
    .where('id', id)
    .first()

  if (!story) {
    throw new StoryNotFoundError({
      data: {
        id
      }
    })
  }

  return await story.$query().updateAndFetch({
    ...updateParams
  })
}
