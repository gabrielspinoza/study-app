var express = require('express');
var router = express.Router();
var pool = require('../db');

const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

// ROUTERS FOR INSERT QUERIES

// add new deck to db
router.post('/newdeck', function(req, res) {
  var d_name = req.body.d_name;
  var d_total_cards = 0;
  console.log(d_name, d_total_cards);

  pool.query(
    `INSERT INTO decks (d_name, d_total_cards) VALUES('${d_name}', '${d_total_cards}')`,
    (err, res) => {
      // res.status(201).send(`${d_name} was added successfully!`)
      console.log(err, res);
      //res.json(); // so request is actually use and it doesnt stay as pending
      //res.end() // end the request so in the front end it does stay as pending
      //pool.end();
    }
  );
  // res.status(201).send(`${d_name} was added successfully!`)
  //res.end();
  res.redirect('/');
});

// add new card to db
router.post('/newcard', function(req, res) {
  var did = req.body.did;
  var img_path = req.body.img_path;
  var question = req.body.question;
  var answer = req.body.answer;
  // var d_total_cards = 0;
  // console.log(d_name, d_total_cards);

  pool.query(
    `INSERT INTO cards (did, img_path, question, answer) VALUES('${did}', '${img_path}', '${question}', '${answer}')`,
    (err, res) => {
      console.log(err, res);
      // pool.end();
    }
  );
  res.redirect('/');
});

// increment number of cards
router.get('/incrementdeck/:id', function(req, res) {
  pool.query(`Update decks Set d_total_cards = d_total_cards + 1 Where did = ${req.params.id}`, (err, rows) => {
    console.log(err, res);
  });
});

// decrement number of cards
router.get('/decrementdeck/:id', function(req, res) {
  pool.query(`Update decks Set d_total_cards = d_total_cards - 1 Where did = ${req.params.id}`, (err, rows) => {
    console.log(err, res);
  });
});

// delete a single card
router.get('/deletecard/:id', function(req, res) {
  pool.query(`DELETE FROM cards WHERE cid = ${req.params.id}`, (err, rows) => {
    console.log(err, res);
  });
});

// delete all cards from given deck
router.get('/deletecards/:id', function(req, res) {
  pool.query(`DELETE FROM cards WHERE did = ${req.params.id}`, (err, rows) => {
    console.log(err, res);
  });
});

// delete deck
router.get('/deletedeck/:id', function(req, res) {
  pool.query(`DELETE FROM decks WHERE did = ${req.params.id}`, (err, rows) => {
    console.log(err, res);
  });
});

router.post('/upload', upload.single('photo'), (req, res) => {
  if(req.file) {
      res.json(req.file);
  }
  else throw 'error';
});

// ROUTERS FOR SELECT QUERIES
router.get('/getdeckid/:id', function(req, res) {
  pool.query(`SELECT did FROM decks where d_name = '${req.params.id}'`, (err, rows) => {
    if (err) {
      res.json({
        msg: 'error'
      });
    } else {
      res.json({
        msg: 'success',
        decks: rows
      });
    }
  });
  
  // res.redirect('/users');
});

router.get('/getdecks/:id', function(req, res) {
  pool.query(`SELECT * FROM ${req.params.id}`, (err, rows) => {
    if (err) {
      res.json({
        msg: 'error'
      });
    } else {
      res.json({
        msg: 'success',
        decks: rows
      });
    }
  });
  
  // res.redirect('/users');
});

router.get('/getdeckcards/:id', function(req, res) {
  pool.query(`select * from cards where did = (select did from decks where d_name = '${req.params.id}');`, (err, rows) => {
    if (err) {
      res.json({
        msg: 'error'
      });
    } else {
      res.json({
        msg: 'success',
        cards: rows
      });
    }
  });
});

router.get('/getcardid/:did/:q/:a', function(req, res) {
      // format strings
      var q =  req.params.q.replaceAll("-"," ").replaceAll("_","?");
      var a = req.params.a.replaceAll("-"," ").replaceAll("_","?");

  pool.query(`SELECT cid FROM cards where did = ${req.params.did} AND question = '${q}' AND answer = '${a}'`, (err, rows) => {
    if (err) {
      res.json({
        msg: 'error'
      });
    } else {
      res.json({
        msg: 'success',
        cards: rows
      });
    }
  });
  
  // res.redirect('/users');
});

// router.post('/actor', async (req, res) => {
//   const {first_name, last_name, gender, date_of_birth} = req.body;

//   pool.query('INSERT INTO actors (first_name, last_name, gender, date_of_birth) VALUES ($1, $2, $3, $4)', [first_name, last_name, gender, date_of_birth], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`User added with ID: ${result.insertId}`)
//     res.redirect('/users');
//   })
// })


module.exports = router;
