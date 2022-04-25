const linkApiService = ({
  axios,
  config,
  CustomError,
  convert,
  mongo,
  repository,
  ObjectsToCsv,
  path,
}) => {
  const { baseUrl } = config.services.linkApi;
  const auth = {
    username: config.services.linkApi.user,
    password: config.services.linkApi.password,
  };
  return {
    async getUsers(limit, page) {
      try {
        const { data } = await axios.get(`${baseUrl}/users?limit=${limit}&page=${page}`, { auth });
        const json = convert.xml2json(data, { compact: true, spaces: 2 });
        const response = JSON.parse(json);
        return response;
      } catch (error) {
        throw new CustomError.CustomError({
          message: error.message,
          statusCode: error.response.status,
        });
      }
    },

    async getUserAdressesById(userId) {
      try {
        const { data } = await axios.get(`${baseUrl}/users/${userId}/address`, { auth });
        const json = convert.xml2json(data, { compact: true, spaces: 2 });
        const response = JSON.parse(json);
        return response;
      } catch (error) {
        throw new CustomError.CustomError({
          message: error.message,
          statusCode: error.response.status,
        });
      }
    },

    async getUserContactsById(userId) {
      try {
        const { data } = await axios.get(`${baseUrl}/users/${userId}/contacts`, { auth });
        const json = convert.xml2json(data, { compact: true, spaces: 2 });
        const response = JSON.parse(json);
        return response;
      } catch (error) {
        throw new CustomError.CustomError({
          message: error.message,
          statusCode: error.response.status,
        });
      }
    },

    async parseUsersFromDbToFile() {
      try {
        await mongo.connect(config.db.url, config.db.name);

        const users = await repository.User.find({});
        const csv = await new ObjectsToCsv(users);

        const fileName = `${Date.now()}-users.csv`;
        await csv.toDisk(`./files/${fileName}`);

        const filePath = `${__dirname}/../../files`;
        const resolvedFilePath = path.resolve(filePath, fileName);

        const response = {
          filename: fileName,
          path: resolvedFilePath,
        };

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

module.exports = linkApiService;
