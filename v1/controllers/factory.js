const userController = require('./userController');
const goFileCrudController = require('./goFileCrudController');

module.exports = (adapters) => ({
  parseUserToDb: userController(adapters).parseUserToDb,
  createFolder: goFileCrudController(adapters).createFolder,
  uploadFile: goFileCrudController(adapters).uploadFile,
  deleteContent: goFileCrudController(adapters).deleteContent,
});
