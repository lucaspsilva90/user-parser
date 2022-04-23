const hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Joi = require('joi');
const config = require('./config');
const routes = require('./v1/routes');
const swaggerOptions = require('./v1/swagger.json');

const { port } = config.server;

module.exports = (async () => {
  const server = hapi.server({ port });
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  server.validator(Joi);
  server.route(routes);
  return server;
})();
