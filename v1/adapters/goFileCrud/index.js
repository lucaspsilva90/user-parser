const goFileCrudWrapper = ({
  config,
  repository,
  mongo,
  services,
}) => {
  // const get = async ({
  //   onSuccess,
  //   onError,
  // }) => {
  //   try {
  //     await mongo.connect(config.db.url, config.db.name);
  //     const response = await repository.User.find({}, { projection: { password: 0 } });
  //     return onSuccess(response);
  //   } catch (error) {
  //     return onError(error);
  //   }
  // };
  const createFolder = async ({
    payload,
    onSuccess,
    onError,
  }) => {
    try {
      const {
        folderName,
      } = payload;

      const goFileResponse = await services.goFile.createFolder(folderName);

      const { data: { data: folderInfo } } = goFileResponse;

      const folder = {
        _id: folderInfo.id,
        name: folderInfo.name,
      };

      await mongo.connect(config.db.url, config.db.name);

      const dbResponse = await repository.GoFile.insert(folder);

      const response = {
        status: 'OK!',
        statusCode: 201,
        dbResponse,
      };
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

  const uploadFile = async ({
    payload,
    params,
    onSuccess,
    onError,
  }) => {
    try {
      const { id } = params;

      await mongo.connect(config.db.url, config.db.name);
      const response = await repository.User
        .createOrUpdateWithWhere({ _id: id }, { $set: payload });
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

  const deleteFile = async ({
    params,
    onSuccess,
    onError,
  }) => {
    try {
      return onSuccess();
    } catch (error) {
      return onError(error);
    }
  };

  return {
    createFolder,
    uploadFile,
    deleteFile,
  };
};

module.exports = goFileCrudWrapper;
