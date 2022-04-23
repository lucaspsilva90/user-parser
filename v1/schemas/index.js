const joi = require('joi');

const dependencies = {
  joi,
};

const factory = require('./factory');

module.exports = factory(dependencies);
