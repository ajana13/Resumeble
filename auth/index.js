const http = require('http')
const server = http.createServer();
const path = require('path')
const port = 8080

const express = require('express')
var router = express.Router();
const app = express()

app.use(express.static('public'))

http.createServer(function (req, res) {
  res.write('Hello World!');
  res.end();
}).listen(port, () =>{
  console.log(`App listening on port ${port}`)
});
