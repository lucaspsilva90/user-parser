const goFileService = ({
  axios,
  config,
  CustomError,
}) => {
  const { baseUrl } = config.services.goFile;
  return {

    async getServer() {
      try {
        const { data: { server } } = await axios.get(`${baseUrl}/getServer`);
        return server;
      } catch (error) {
        throw new CustomError.CustomError({
          message: error.message,
          statusCode: error.response.status,
        });
      }
    },

    async uploadFile({ folderId, file }) {
      try {
        const server = this.getServer();
        const response = await axios.post(`https://${server}.gofile.io/uploadFile}`, {
          folderId,
          file,
          token: config.services.goFile.token,
        });
        return response;
      } catch (error) {
        throw new CustomError.CustomError({
          message: error.message,
          statusCode: error.response.status,
        });
      }
    },
    async createFolder(folderName) {
      try {
        const response = await axios.put(`${baseUrl}createFolder`, {
          parentFolderId: config.services.goFile.parentFolderId,
          token: config.services.goFile.token,
          folderName,
        });
        return response;
      } catch (error) {
        throw new CustomError.CustomError({
          message: error.message,
          statusCode: error.response.status,
        });
      }
    },
    async deleFile(fileIds) {
      try {
        const response = await axios.delete({
          contentsId: fileIds,
          token: config.services.goFile.token,
        });
        return response;
      } catch (error) {
        throw new CustomError.CustomError({
          message: error.message,
          statusCode: error.response.status,
        });
      }
    },
  };
};

module.exports = goFileService;
