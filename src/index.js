
const http = require('http')
const server = http.createServer();
const path = require('path')
const port = 8080

const express = require('express')
var router = express.Router();
const app = express()




app.get('/', function (req, res) {
  console.log("Got a GET request for the homepage");
  res.send('Hello GET');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
  console.log("Got a POST request for the homepage");
  res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
  console.log("Got a DELETE request for /del_user");
  res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
  console.log("Got a GET request for /list_user");
  res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
  console.log("Got a GET request for /ab*cd");
  res.send('Page Pattern Match');
})


http.createServer(function (req, res) {
  res.write('Hello World!');
  res.end();
}).listen(port, () =>{
  console.log(`App listening on port ${port}`)
});