const { errorHandler, genericSuccess } = require('../../../common/utils/responseHandler');

const goFileCrudControllerWrapper = ({
  adapters,
  config,
  schemas: {
    goFileCrudSchema,
  },
}) => {
  const createFolder = async (request, reply) => {
    const { payload } = request;

    const errors = goFileCrudSchema.createFolder.validate(payload);

    return adapters.createFolder({
      payload,
      errors,
      config,
      onSuccess: (response) => reply.response(genericSuccess(response)).code(201),
      onError: (error) => reply.response(errorHandler(error)).code(error.statusCode),
    });
  };

  const uploadFile = async (request, reply) => {
    const { payload } = request;

    const errors = goFileCrudSchema.uploadFile.validate(payload);

    return adapters.uploadFile({
      config,
      payload,
      errors,
      onSuccess: (response) => reply.response(genericSuccess(response)).code(200),
      onError: (error) => reply.response(errorHandler(error)).code(error.statusCode),
    });
  };
  const deleteContent = async (request, reply) => {
    const { payload } = request;

    const errors = goFileCrudSchema.deleteFile.validate(payload);

    return adapters.deleteContent({
      config,
      payload,
      errors,
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
