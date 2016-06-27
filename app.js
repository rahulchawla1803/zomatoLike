var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var request = require("request");
var fs = require('fs');
var cors=require('cors');


var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
/*
setInterval(apirider,10000);
setInterval(apimcd,10000);
setInterval(apikfc,10000);
setInterval(apidominos,10000);

function apirider()
{
  request("http://localhost:3000/api/rider");
}
function apimcd()
{
  request("http://localhost:3000/api/mcd");
}
function apikfc()
{
  request("http://localhost:3000/api/kfc")
}
function apidominos()
{
  request("http://localhost:3000/api/dominos")
}
*/
function mcd(req,response)
{
  response.writeHead(200, {"Content-Type":"text/html"});
  fs.createReadStream('views/mcd.html').pipe(response);
}
function kfc(req,response)
{
  response.writeHead(200, {"Content-Type":"text/html"});
  fs.createReadStream('views/kfc.html').pipe(response);
}
function dominos(req,response)
{
  response.writeHead(200, {"Content-Type":"text/html"});
  fs.createReadStream('views/dominos.html').pipe(response)
}
function rider(req,response)
{
  response.writeHead(200, {"Content-Type":"text/html"});
  fs.createReadStream('views/rider.html').pipe(response);
}

http.createServer(rider).listen(8886);
http.createServer(mcd).listen(8887);
http.createServer(kfc).listen(8888);
http.createServer(dominos).listen(8889);


module.exports = app;
//status-> pending, delivered, delivered, rejected