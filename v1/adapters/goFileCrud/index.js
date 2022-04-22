const goFileCrudWrapper = ({
  config,
  repository,
  mongo,
  services,
}) => {
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

      await repository.Folders.insert(folder);

      const response = {
        message: 'Folder created successfully!',
        statusCode: 201,
      };
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

  const uploadFile = async ({
    payload,
    onSuccess,
    onError,
  }) => {
    try {
      const { file, folderName } = payload;
      await mongo.connect(config.db.url, config.db.name);

      const folder = await repository.Folders.findOne({ name: folderName });
      if (!folder) return onError({ message: 'This folder does not exists.', statusCode: 404 });

      const { _id: folderId } = folder;

      const goFileUploadResponse = await services.goFile.uploadFile({
        file,
        folderId,
      });

      const { data: { data: { fileId, fileName, parentFolder } } } = goFileUploadResponse;

      const fileToBeSaved = {
        _id: fileId,
        name: fileName,
        folderId: parentFolder,
      };

      await repository.Files.insert(fileToBeSaved);

      const response = {
        statusCode: 200,
        message: 'File uploaded successfully!',
      };

      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

  const deleteContent = async ({
    onSuccess,
    onError,
    payload,
  }) => {
    try {
      const { folderName, fileName } = payload;

      await mongo.connect(config.db.url, config.db.name);

      const folder = await repository.Folders.findOne({ name: folderName });
      if (!folder) return onError({ message: 'This folder does not exists.', statusCode: 404 });

      const file = await repository.Files.findOne({ name: fileName });
      if (!file) return onError({ message: 'This file does not exists.', statusCode: 404 });

      const { _id: fileId } = file;

      const { data: { data: goFileDeleteResponse } } = await services.goFile.deleteContent(fileId);

      if (goFileDeleteResponse[fileId] === 'ok') await repository.Files.destroy({ _id: fileId });

      const response = {
        statusCode: 200,
        message: 'File deleted successfully!',
      };

      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

  return {
    createFolder,
    uploadFile,
    deleteContent,
  };
};

module.exports = goFileCrudWrapper;
