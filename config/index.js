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
      folders: process.env.GOFILE_FOLDERS_COLLECTION,
      files: process.env.GOFILE_FILES_COLLECTION,
    },
  },
  services: {
    linkApi: {
      baseUrl: 'https://linkapi-desafio-tech.gateway.linkapi.solutions/v1',
      user: process.env.LINKAPI_USER,
      password: process.env.LINKAPI_PASSWORD,
    },
    goFile: {
      baseUrl: 'https://api.gofile.io',
      token: process.env.GOFILE_API_TOKEN,
      parentFolderId: process.env.GOFILE_PARENT_FOLDER_ID,
    },
  },
};
