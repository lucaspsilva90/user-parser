const { v1 } = require('uuid');
const config = require('../../../config');
const logger = require('../logger');

const genericSuccessHandler = (successMessage) => {
  const { message, statusCode } = successMessage;

  const responseObject = {
    status: 'SUCCESS',
    info: {
      responseId: v1(),
      service: config.service.name,
      env: config.env,
      message,
      statusCode,
    },
  };
  logger.info(responseObject);
  return responseObject;
};

const genericErrorHandler = (responseError) => {
  const { message, error, statusCode } = responseError;

  const responseObject = {
    status: 'ERROR',
    errorInfo: {
      responseId: v1(),
      service: config.service.name,
      message: message || error.message,
      statusCode: statusCode || 500,
    },
  };
  logger.error(responseObject);
  return responseObject;
};

module.exports = {
  genericSuccess: (log) => genericSuccessHandler(log),
  errorHandler: (log) => genericErrorHandler(log),
};
