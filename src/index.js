
const http = require('http')
const server = http.createServer();
const path = require('path')

const express = require('express')
const app = express()
app.use(express.static('public'))

app.listen(3000,() => {
  console.log("Appp listening on port 3000")
})
