const axios = require('axios');
const convert = require('xml-js');
const FormData = require('form-data');
const fs = require('fs');
const qs = require('qs');
const path = require('path');
const ObjectsToCsv = require('objects-to-csv');
const factory = require('./factory');
const config = require('../config');
const CustomError = require('../common/utils/customError');
const mongo = require('../common/libs/db');
const repository = require('../v1/repository');

const dependencies = {
  config,
  axios,
  CustomError,
  convert,
  FormData,
  fs,
  qs,
  mongo,
  repository,
  ObjectsToCsv,
  path,
};

module.exports = factory(dependencies);
