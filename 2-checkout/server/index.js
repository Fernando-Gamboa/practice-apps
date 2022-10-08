require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

// declaring PORT
let PORT = process.env.PORT || 3000;

//YOU NEED THESE THREE - MORGAN, CORS, EXPRESS.JSON() -----
// bring in morgan, cors and express.json to create chunks of data
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

/****
 *
 *
 * Other routes here....
 *
 *
 */

// IM DOING MY REQUEST USING CALLBACKS NOT PROMISES ------------------
// TO USE PROMISES: db.queryAsync().then().catch()
// don't use 127.0.0.1:3000 just use /account
app.get('/account', (req, res) => {
  let query = `SELECT * FROM responses`;
  db.query(query, [], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
      res.status(200).json(response);
    }
  })
})

app.post('/account', (req, res) => {
  let query = `SELECT id FROM responses WHERE cookie = "${req.session_id}"`;
  db.query(query, [], (err, response) => {
    if (err) {
      res.sendStatus(500);
    } else if (response.length === 0) {
      req.body['cookie'] = req.session_id;
      query = `INSERT INTO responses (user, password, address, state, zip, card, security, cookie) VALUES ("${req.body.user}", "${req.body.password}", "${req.body.address}", "${req.body.state}", "${req.body.zip}", "${req.body.card}", "${req.body.security}", "${req.session_id}")`;

      // CB in (err, response) section
      db.query(query, [], (err, response) => {
        if (err) {
          console.log(err);
          // handles server errors
          res.sendStatus(500);
        } else {
          res.status(200).json(req.body);
        }
      })
    } else {
      res.status(200).json('RESPONSE EXIST IN THIS SESSION!');
    }
  })
})


app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
