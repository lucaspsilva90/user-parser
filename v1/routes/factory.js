const userRoute = require('./userRoute.routes');

// eslint-disable-next-line max-len
module.exports = (dependencies) => [
  userRoute(dependencies),
].flatMap((routes) => routes);
