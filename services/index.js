const factory = require('./factory');
const config = require('../config');
const axios = require('axios')
const convert = require('xml-js');
const CustomError = require('../common/utils/customError');

const dependencies = {
  config,
  axios,
  CustomError,
  convert,
};

module.exports = factory(dependencies);
