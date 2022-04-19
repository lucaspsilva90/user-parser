const factory = require('./factory');

const state = {
  processId: null,
  db: null,
  client: null,
};

const wrapper = factory(state);

module.exports = wrapper;
