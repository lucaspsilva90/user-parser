module.exports = ({
  controller: {
    parseUserToDb,
  },
  schemas: {
    parseUsersSchema,
  },
}) => [{
  path: '/v1/users',
  method: 'GET',
  handler: parseUserToDb,
  options: {
    description: 'Run the process that parses users',
    notes: 'Force the run of the process that parses users from LinkApi and inserts at DB',
    tags: ['api'],
    response: {
      schema: parseUsersSchema.genericResponse,
    },
  },
}];
