export class NotFoundError extends Error {
  code = 404;
  message = this.message || 'Record not found'
}
