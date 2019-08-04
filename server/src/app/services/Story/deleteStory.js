import {
  Story
} from '~/src/app/models/Story/Model'

import {
  StoryNotFoundError
} from '~/src/app/errors/models/StoryErrors'
import {
  AccessDeniedError
} from '../../errors/models/UserErrors'

export default async ({ uuid }, ctx) => {
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

  if (
    typeof ctx.currentUser === 'undefined' ||
    ctx.currentUser === null ||
    story.userId !== ctx.currentUser.id
  ) {
    throw new AccessDeniedError({
      data: {
        uuid
      }
    })
  }

  return await story.$query().delete().returning('*')
}
