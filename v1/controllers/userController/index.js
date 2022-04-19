const { errorHandler } = require('../../../common/utils/responseHandler');

const userControllerWrapper = ({
  adapters,
  config,
}) => {

  const parseUserToDb = async (request, reply) => adapters.parseUserToDb({
    config,
    onSuccess: (response) => reply.response(response).code(200),
    onError: (error) => reply.response(errorHandler(error)).code(error.statusCode),
  });

  const userController = {
    parseUserToDb,
  };

  return userController;
};

module.exports = userControllerWrapper;
