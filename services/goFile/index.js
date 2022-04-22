const goFileService = ({
  axios,
  config,
  CustomError,
  FormData,
  fs,
  qs,
}) => {
  const { baseUrl } = config.services.goFile;

  return {

    async getServer() {
      try {
        const { data: { data: server } } = await axios.get(`${baseUrl}/getServer`);
        return server.server;
      } catch (error) {
        throw new CustomError.CustomError({
          message: error.message,
          statusCode: error.response.status,
        });
      }
    },

    async uploadFile({ folderId, file }) {
      try {
        const formData = new FormData();

        const fileStream = fs.createReadStream(file.path);

        formData.append('folderId', folderId);
        formData.append('token', config.services.goFile.token);
        formData.append('file', fileStream, { filename: file.filename });

        const server = await this.getServer();
        const response = await axios.post(`https://${server}.gofile.io/uploadFile`, formData, { headers: formData.getHeaders() });
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
        const response = await axios.put(`${baseUrl}/createFolder`, {
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
    async deleteContent(fileId) {
      try {
        const requestBody = {
          contentsId: fileId,
          token: config.services.goFile.token,
        };

        const options = {
          method: 'DELETE',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(requestBody),
          url: `${baseUrl}/deleteContent`,
        };

        const response = await axios(options);
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
