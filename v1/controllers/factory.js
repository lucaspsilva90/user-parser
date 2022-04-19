const userController = require('./userController');

module.exports = (adapters) => ({
  parseUserToDb: userController(adapters).parseUserToDb,
});
