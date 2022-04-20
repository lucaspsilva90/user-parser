const linkApi = require('./linkApi');

module.exports = (dependencies) => ({
  linkApi: linkApi(dependencies),
});
