var express = require('express');
var router = express.Router();
var pool = require('../db');

const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});

router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

// add user to db
router.post('/newdeck', function(req, res, next) {
  var d_name = req.body.d_name;
  var d_total_cards = 0;
  console.log(d_name, d_total_cards);

  pool.query(
    `INSERT INTO decks (d_name, d_total_cards) VALUES('${d_name}', '${d_total_cards}')`,
    (err, res) => {
      console.log(err, res);
      pool.end();
    }
  );
  // res.redirect('/users');
});

// 
router.get('/getdecks/:id', function(req, res) {
  // res.render('test', {output: req.params.id});
  
  pool.query(`SELECT * FROM ${req.params.id}`, (err, rows) => {
    // console.log(err, res);
    // pool.end();
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

router.post('/upload', upload.single('photo'), (req, res) => {
  if(req.file) {
      res.json(req.file);
  }
  else throw 'error';
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
