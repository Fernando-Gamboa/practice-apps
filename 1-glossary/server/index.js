// THIS IS MY SERVER ---
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

// morgan, cors, and parser
const morgan = require('morgan');
const cors = require('cors');
// use this middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// database imports
const db = require('./db.js');

// REQUEST ----------------------------------------
// create express get request -----
app.get('/lists', (req, res) => {
  db.Glossary.find({}).then((response) => {
    res.send(response);
  }).catch((err) => {
    console.log(err);
  })
})

// create express post request -----
app.post('/lists', (req, res) => {
  // use mongoose create() to insert doc
  db.Glossary.create(req.body);
  res.status(200).json(req.body);
})

// create express delete request -----
app.delete('/lists', (req, res) => {
  // mongoose db request to delete data
  db.Glossary.deleteOne(req.body)
  // promise consumed
  .then((response) => {
    // res.send sends back the deleted data to client line 60
    res.send(req.body);
  })
  // catch errors
  .catch((err) => {
    console.log(err);
  })
})
// create express put request
app.put('/lists', (req, res) => {
  // use mongoose to find an obj and replace it
  db.Glossary.findOneAndUpdate(req.body.find, req.body.update)
  .then((response) => {
    res.status(200).json(req.body);
  })
  .catch((err) => {
    console.log(err);
  })
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
