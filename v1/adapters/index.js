const userWrapper = require('./parseUser');

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
});
