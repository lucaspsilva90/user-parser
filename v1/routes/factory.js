const userRoute = require('./userRoute.routes');
const goFileRoute = require('./goFileRoute.routes');

// eslint-disable-next-line max-len
module.exports = (dependencies) => [
  userRoute(dependencies),
  goFileRoute(dependencies),
].flatMap((routes) => routes);
