import ApplicationError from '~/src/app/errors/ApplicationError'

class UserNotFoundError extends ApplicationError {
  constructor({ message, code, data }) {
    const errorMessage = message || 'User not found'
    const errorCode = code || 'USER_NOT_FOUND_ERROR'
    const errorData = data || {}

    super({
      message: errorMessage,
      code: errorCode,
      data: errorData
     })
  }
}

class UserValidationError extends ApplicationError {
  constructor({ message, code, data }) {
    const errorMessage = message || 'Invalid User Data'
    const errorCode = code || 'VALIDATION_ERROR'
    const errorData = data || {}

    super({
      message: errorMessage,
      code: errorCode,
      data: errorData
     })
  }
}

export { UserNotFoundError, UserValidationError }
