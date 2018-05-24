const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID
const assert = require('assert');

const uri = 'mongodb+srv://eddi:Banani123@tment-website-t3ivj.mongodb.net/test?retryWrites=true';
const dbName = 'tmentdb';

// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   db.collection('inserts').insertOne({a:"ewq"}, function(err, r) {
//     assert.equal(null, err);
//     assert.equal(1, r.insertedCount);
//
//     // Insert multiple documents
//     db.collection('inserts').insertMany([{a:2}, {a:3}], function(err, r) {
//       assert.equal(null, err);
//       assert.equal(2, r.insertedCount);
//
//       client.close();
//     });
//   });
// });

// async function getLastNews () {
//   MongoClient.connect(uri, {useNewUrlParser: true}, function(err, client) {
//     assert.equal(null, err);
//     console.log("Successfully connected to mongo");
//     const db = client.db(dbName);
//     db.collection('news').find().sort({ "_id": -1 }).limit(1).toArray(function(err, result) {
//       if (err) return err
//       console.log(result);
//       return result;
//     });
//   })
// };
//
//
//
//
// module.exports = {
//   getLastNews
// }
