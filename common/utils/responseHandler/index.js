const { v1 } = require('uuid');
const config = require('../../../config');

const genericSuccessHandler = (successMessage) => {
  const { message, statusCode } = successMessage;

  const responseObject = {
    responseId: v1(),
    service: config.service.name,
    env: config.env,
    message,
    statusCode,
  };
  return responseObject;
};

const genericErrorHandler = (responseError) => {
  const { message, error, statusCode } = responseError;

  const responseObject = {
    status: 'ERROR',
    errorInfo: {
      responseId: v1(),
      service: config.service.name,
      env: config.service.env,
      message: message || error.message,
      statusCode: statusCode || 500,
    },
  };
  return responseObject;
};

module.exports = {
  genericSuccess: (log) => genericSuccessHandler(log),
  errorHandler: (log) => genericErrorHandler(log),
};
