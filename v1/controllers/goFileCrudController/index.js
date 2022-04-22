const { errorHandler, genericSuccess } = require('../../../common/utils/responseHandler');

const goFileCrudControllerWrapper = ({
  adapters,
  config,
}) => {
  const createFolder = async (request, reply) => {
    const { payload } = request;

    return adapters.createFolder({
      payload,
      config,
      onSuccess: (response) => reply.response(genericSuccess(response)).code(201),
      onError: (error) => reply.response(errorHandler(error)).code(error.statusCode),
    });
  };

  const uploadFile = async (request, reply) => {
    const { payload } = request;

    return adapters.uploadFile({
      config,
      payload,
      onSuccess: (response) => reply.response(genericSuccess(response)).code(200),
      onError: (error) => reply.response(errorHandler(error)).code(error.statusCode),
    });
  };
  const deleteContent = async (request, reply) => {
    const { payload } = request;

    return adapters.deleteContent({
      config,
      payload,
      onSuccess: (response) => reply.response(genericSuccess(response)).code(200),
      onError: (error) => reply.response(errorHandler(error)).code(error.statusCode),
    });
  };

  const goFileCrudController = {
    createFolder,
    uploadFile,
    deleteContent,
  };

  return goFileCrudController;
};

module.exports = goFileCrudControllerWrapper;
