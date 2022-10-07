// THIS IS MY DATABASE ---
const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB AND CREATE DATABASE
mongoose.connect('mongodb://localhost/glossary');
// 2. Set up any schema and models needed by the app
let dbSchema = mongoose.Schema({
  word: {type: String, unique: true},
  definition: String
});
// 3. Export the models - HERE WE ARE NAMING OUR COLLECTION (s is auto added)
let Glossary = mongoose.model('list', dbSchema);
// 4. Import the models into any modules that need them
module.exports.Glossary = Glossary;
