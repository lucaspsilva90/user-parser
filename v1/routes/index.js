const factory = require('./factory');
const schemas = require('../schemas');

const controller = require('../controllers');

module.exports = factory({ controller, schemas });
