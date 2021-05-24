require('dotenv').config()
const express = require('express')
const path = require('path')
const Router = require('./src/routes')
const bodyParser = require('body-parser');


const app = express();

const fs = require('fs');
// const https = require('https');
const http = require('http');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(Router);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});    
app.disable('x-powered-by');

//  https.createServer(options, app).listen(5002, function () {
//   console.log('Server is running 5002');
//  })


http.createServer(app).listen(process.env.HTTPPORT, function () {
  console.log('Server is running '+ process.env.HTTPPORT);
 })