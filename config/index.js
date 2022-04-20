require('dotenv').config();

module.exports = {
  service: {
    name: 'linkapi-test',
  },
  server: {
    port: process.env.PORT,
  },
  db: {
    url: process.env.DB_URL,
    name: process.env.DB_NAME,
    collections: {
      user: process.env.USER_COLLECTION,
    },
  },
  services: {
    linkApi: {
      baseUrl: 'https://linkapi-desafio-tech.gateway.linkapi.solutions/v1',
      user: process.env.LINKAPI_USER,
      password: process.env.LINKAPI_PASSWORD,
    },
  },
};
