const userRoute = require('./userRoute.routes');
const goFileRoute = require('./goFileRoute.routes');

module.exports = (dependencies) => [
  userRoute(dependencies),
  goFileRoute(dependencies),
].flatMap((routes) => routes);
