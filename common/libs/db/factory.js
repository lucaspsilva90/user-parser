/* eslint-disable no-param-reassign */

const {
  MongoClient,
} = require('mongodb');
const { v1 } = require('uuid');

const factory = (state) => ({
  async connect(url, dbName) {
    if (!state.client) {
      state.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
      await state.client.connect();
      state.processId = v1();
    }

    state.db = state.client.db(dbName);
    return state.db;
  },

  disconnect() {
    if (state.client) {
      return state.client.close().then(() => {
        state.client = null;
        state.db = null;
      });
    }

    return null;
  },

  collection(collectionName) {
    if (state.db) return state.db.collection(collectionName);
    throw new Error('There is no connection to the database.');
  },

  db() {
    return state.db;
  },
});

module.exports = factory;
