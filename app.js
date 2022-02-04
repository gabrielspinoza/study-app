var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');

var routes = require('./routes/routes');
// var usersRouter = require('./routes/users');
// var actorRouter = require('./routes/actor');

// added
var bodyParser = require('body-parser');  

// database
// const cors = require('cors');
// var pool = require('./db');

var app = express();

// test db
// pool.query('SELECT * FROM movies', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// no view engine
app.use(express.static(__dirname + '/views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', usersRouter);
// app.use('/actor', actorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// app.post('/add-actor', urlencodedParser, function (req, res) {  
//   // Prepare output in JSON format  
//   response = {  
//       first_name:req.body.first_name,  
//       last_name:req.body.last_name  
//   };  
//   console.log(response);  
//   res.end(JSON.stringify(response));  
// })  

// var server = app.listen(3000, function () {  
//   var host = server.address().address 
//   var port = server.address().port
//   console.log("Example app listening at http://%s:%s", host, port)  
// })  

// app.post('/store-new-user', async (req, res) => {
//   const {email, user_info} = req.body;

//   pool.query('INSERT INTO users (email,user_info) VALUES ($1, $2)', [email, user_info], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`User added with ID: ${result.insertId}`)
//   })
// })


module.exports = app;
