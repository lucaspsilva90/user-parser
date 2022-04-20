const linkApiService = ({
  axios,
  config,
  CustomError,
  convert,
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

  };
};

module.exports = linkApiService;
