import { ApolloError } from 'apollo-server'

class ApplicationError extends ApolloError {
  constructor({ message, code, data }) {
    const errorMessage = message || 'Something went wrong. Please try again.'
    const errorCode = code || 'INTERNAL_SERVER_ERROR'
    const errorData = { data } || {}

    super(errorMessage, errorCode, errorData);
  }
}

export default ApplicationError
