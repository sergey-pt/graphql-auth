import ApplicationError from '~/src/app/errors/ApplicationError'

class UserNotFoundError extends ApplicationError {
  constructor({
    message,
    code,
    data
  }) {
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
  constructor({
    message,
    code,
    data
  }) {
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

class InvalidAuthCredentialsError extends ApplicationError {
  constructor({
    message,
    code,
    data
  }) {
    const errorMessage = message || 'Invalid auth credentials'
    const errorCode = code || 'INVALID_AUTH_CREDENTIALS_ERROR'
    const errorData = data || {}

    super({
      message: errorMessage,
      code: errorCode,
      data: errorData
    })
  }
}

class AuthenticationRequiredError extends ApplicationError {
  constructor({
    message,
    code,
    data
  }) {
    const errorMessage = message || 'Authentication Required'
    const errorCode = code || 'AUTHENTICATION_REQUIRED_ERROR'
    const errorData = data || {}

    super({
      message: errorMessage,
      code: errorCode,
      data: errorData
    })
  }
}

class AccessDeniedError extends ApplicationError {
  constructor({
    message,
    code,
    data
  }) {
    const errorMessage = message || 'Access Denied'
    const errorCode = code || 'ACCESS_DENIED_ERROR'
    const errorData = data || {}

    super({
      message: errorMessage,
      code: errorCode,
      data: errorData
    })
  }
}

export {
  UserNotFoundError,
  UserValidationError,
  InvalidAuthCredentialsError,
  AuthenticationRequiredError,
  AccessDeniedError
}
