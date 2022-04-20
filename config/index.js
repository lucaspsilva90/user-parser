require('dotenv').config();

module.exports = {
  service: {
    name: 'linkapi-test',
  },
  server: {
    port: process.env.PORT,
  },
  db: {
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
