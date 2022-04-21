module.exports = ({
  parseUserToDb,
}) => [{
  path: '/v1/users',
  method: 'GET',
  handler: parseUserToDb,
}];
