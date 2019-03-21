import ApplicationError from '~/src/app/errors/ApplicationError'

class StoryNotFoundError extends ApplicationError {
  constructor({ message, code, data }) {
    const errorMessage = message || 'Story not found'
    const errorCode = code || 'STORY_NOT_FOUND_ERROR'
    const errorData = data || {}

    super({
      message: errorMessage,
      code: errorCode,
      data: errorData
     })
  }
}

export default StoryNotFoundError
