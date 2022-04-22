const userWrapper = require('./parseUser');
const goFileCrudWrapper = require('./goFileCrud');

module.exports = (dependencies) => ({
  parseUserToDb: userWrapper({
    config: dependencies.config,
    mongo: dependencies.mongo,
    repository: dependencies.repository,
    CustomError: dependencies.CustomError,
    services: dependencies.services,
    RateLimiter: dependencies.RateLimiter,
    PromisePool: dependencies.PromisePool,
  }).parseUserToDb,
  createFolder: goFileCrudWrapper({
    config: dependencies.config,
    mongo: dependencies.mongo,
    repository: dependencies.repository,
    CustomError: dependencies.CustomError,
    services: dependencies.services,
  }).createFolder,
  uploadFile: goFileCrudWrapper({
    config: dependencies.config,
    mongo: dependencies.mongo,
    repository: dependencies.repository,
    CustomError: dependencies.CustomError,
    services: dependencies.services,
  }).uploadFile,
  deleteContent: goFileCrudWrapper({
    config: dependencies.config,
    mongo: dependencies.mongo,
    repository: dependencies.repository,
    CustomError: dependencies.CustomError,
    services: dependencies.services,
  }).deleteContent,
});
