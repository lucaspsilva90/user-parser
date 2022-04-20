const uuid = require('uuid');
const factory = require('./factory');
const config = require('../../config');
const logger = require('../../common/utils/logger');
const mongo = require('../../common/libs/db');
const repository = require('../repository');
const { CustomError } = require('../../common/utils/customError/index');
const services = require('../../services');
const { RateLimiter } = require('limiter');
const { PromisePool } = require('@supercharge/promise-pool')

const adapters = require('../adapters')({
  config,
  logger,
  mongo,
  repository,
  CustomError,
  services,
  uuid,
  RateLimiter,
  PromisePool
});

module.exports = factory({
  adapters,
});
