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
      onSuccess: (response) => reply.response(response).code(200),
      onError: (error) => reply.response(errorHandler(error)).code(error.statusCode),
    });
  };
  const deleteFile = async (request, reply) => {
    const { params } = request;

    return adapters.deleteFile({
      config,
      params,
      onSuccess: (response) => reply.response(response).code(200),
      onError: (error) => reply.response(errorHandler(error)).code(error.statusCode),
    });
  };

  const goFileCrudController = {
    createFolder,
    uploadFile,
    deleteFile,
  };

  return goFileCrudController;
};

module.exports = goFileCrudControllerWrapper;
