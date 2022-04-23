const goFileCrudSchema = require('./goFileCrudSchema');

module.exports = (dependencies) => ({
  goFileCrudSchema: goFileCrudSchema(dependencies),
});
