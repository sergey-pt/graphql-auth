import {
  Story
} from '~/src/app/models/Story/Model'

import {
  StoryNotFoundError
} from '~/src/app/errors/models/StoryErrors'
import {
  AccessDeniedError
} from '../../errors/models/UserErrors'

export default async ({
  data
}, ctx) => {
  const {
    uuid,
    ...updateParams
  } = data

  const story = await Story.query()
    .where('uuid', uuid)
    .first()

  if (!story) {
    throw new StoryNotFoundError({
      data: {
        uuid
      }
    })
  }

  if (story.userId !== ctx.currentUser.id) {
    throw new AccessDeniedError({
      data: {
        uuid
      }
    })
  }

  return await story.$query().updateAndFetch({
    ...updateParams
  })
}
