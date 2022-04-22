const factory = require('./factory');
const db = require('../../common/libs/db');
const config = require('../../config');

module.exports = {
  User: factory({
    db,
    collectionName: config.db.collections.user,
  }),
  Folders: factory({
    db,
    collectionName: config.db.collections.folders,
  }),
  Files: factory({
    db,
    collectionName: config.db.collections.files,
  }),
};
