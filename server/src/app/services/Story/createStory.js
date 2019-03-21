import {
  Story
} from '~/src/app/models/Story/Model'

export default async ({
  data
}) => {
  return await Story.query().insert({
    ...data
  })
}
