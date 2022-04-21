const linkApi = require('./linkApi');
const goFile = require('./goFile');

module.exports = (dependencies) => ({
  linkApi: linkApi(dependencies),
  goFile: goFile(dependencies),
});
