const userWrapper = require('./parseUser');

module.exports = (dependencies) => ({
  parseUserToDb: userWrapper({
    config: dependencies.config,
    mongo: dependencies.mongo,
    repository: dependencies.repository,
    CustomError: dependencies.CustomError,
  }).parseUserToDb,
});
