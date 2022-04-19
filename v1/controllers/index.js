const uuid = require('uuid');
const factory = require('./factory');
const config = require('../../config');
const logger = require('../../common/utils/logger');
const mongo = require('../../common/libs/db');
const repository = require('../repository');
const { CustomError } = require('../../common/utils/customError/index');
const services = require('../../services');

const adapters = require('../adapters')({
  config,
  logger,
  mongo,
  repository,
  CustomError,
  services,
  uuid,
});

module.exports = factory({
  adapters,
});
