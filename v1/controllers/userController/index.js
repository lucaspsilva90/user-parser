const { errorHandler, genericSuccess } = require('../../../common/utils/responseHandler');

const userControllerWrapper = ({
  adapters,
  config,
}) => {
  const parseUserToDb = async (request, reply) => adapters.parseUserToDb({
    config,
    onSuccess: (response) => reply.response(genericSuccess(response)).code(200),
    onError: (error) => reply.response(errorHandler(error)).code(error.statusCode || 500),
  });

  const userController = {
    parseUserToDb,
  };

  return userController;
};

module.exports = userControllerWrapper;
