const axios = require('axios');
const convert = require('xml-js');
const FormData = require('form-data');
const fs = require('fs');
const qs = require('qs');
const factory = require('./factory');
const config = require('../config');
const CustomError = require('../common/utils/customError');

const dependencies = {
  config,
  axios,
  CustomError,
  convert,
  FormData,
  fs,
  qs,
};

module.exports = factory(dependencies);
