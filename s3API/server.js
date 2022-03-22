const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// const AWS = require("aws-sdk");
// const config = require("config");


// const accessKeyId = config.get('AWSAccessKeyId');
// const secretAccessKey = config.get('AWSSecretAccessKey');
// const bucketName = config.get('S3_BUCKET_NAME');


// const s3 = new AWS.S3({
//   accessKeyId: config.get("AWSAccessKeyId"),
//   secretAccessKey: config.get("AWSSecretAccessKey")
// });

// Call S3 to list the buckets
// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//   }
// });

// var creds = new AWS.Credentials({
//   accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, sessionToken: 'session'
// });

require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

const PORT = process.env.PORT || 3002;
const app = express();

// DB Config
const mongoURI = process.env.NODE_ENV
    ? process.env.MONGO_URI
    : process.env.DEV_MONGO_URI;

console.log(mongoURI)
// Connect to MongoDB
mongoose
.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
// eslint-disable-next-line no-console
.then(() => console.log('MongoDB successfully connected'))
// eslint-disable-next-line no-console
.catch((err) => console.log(err));

// Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
const routes = require('./routes');
app.use('/api/s3/routes', routes);
app.use(express.static('client/build'));

app.listen(PORT, () => {
  console.log(`Profile API Server is listening on ${PORT}`);
});