const { v4 } = require('uuid');

module.exports = ({
  db,
  collectionName,
}) => ({
  insert: (message) => db.collection(collectionName)
    .insertOne({ _id: v4(), ...message })
    .then((result) => db.collection(collectionName).findOne({ _id: result.insertedId })),
  insertMany: (messages) => db.collection(collectionName)
    .insertMany(messages, {
      ordered: false,
    })
    .then((result) => result.ops[0]),
  aggregate: (query, options = {}) => db.collection(collectionName).aggregate(query, options)
    .toArray()
    .then((result) => result),
  createOrUpdateWithWhere: (filter, data) => db.collection(collectionName)
    .findOneAndUpdate(filter, data, {
      upsert: true,
      returnOriginal: false,
    })
    .then((result) => result.value),
  save: (filter, data) => db.collection(collectionName)
    .findOneAndUpdate(filter, data),
  findOne: (filter, projection) => db.collection(collectionName)
    .findOne(filter, projection),
  find: (filter, projection) => db.collection(collectionName)
    .find(filter, projection).toArray().then((result) => result),
  count: (message) => db.collection(collectionName)
    .find(message).count(),
  findMany: (filter) => db.collection(collectionName)
    .find(filter)
    .toArray()
    .then((result) => result),
  destroy: (filter) => db.collection(collectionName).deleteOne(filter),
});
