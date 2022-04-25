class CustomError extends Error {
  constructor({
    statusCode = null,
    message = null,
  }) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message || 'Something bad happened!';
  }
}

module.exports = {
  CustomError,
};
