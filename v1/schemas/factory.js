const goFileCrudSchema = require('./goFileCrudSchema');
const parseUsersSchema = require('./parseUsersSchema');

module.exports = (dependencies) => ({
  goFileCrudSchema: goFileCrudSchema(dependencies),
  parseUsersSchema: parseUsersSchema(dependencies),
});
