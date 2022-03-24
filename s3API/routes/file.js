
const express = require('express');
const router = express.Router();

const path = require('path');
const AWS = require("aws-sdk");
const config = require("config");


const accessKeyId = config.get('AWSAccessKeyId');
const secretAccessKey = config.get('AWSSecretAccessKey');
const bucketName = config.get('S3_BUCKET_NAME');


const s3 = new AWS.S3({
  accessKeyId: config.get("AWSAccessKeyId"),
  secretAccessKey: config.get("AWSSecretAccessKey")
});

require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') });

// const Profile = require('../models/Profile');
// const User = require('../models/User');
// const Test = require('../models/Test');

// Read file
// Request: GET
// Route: http://localhost:3002/api/s3/routes/readfile
router.get('/readfile/:fileid', async (req,res) => {
  try {
    let user = await User.findById(req.params.userid);
    let profileID = user.profileID;

    let profile = await Profile.findById(profileID);
    if (profile) {
      res.status(200).json({
        status: 200,
        data: profile,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No profile found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
})

// Request: POST 
// Route: http://localhost:3002/api/s3/routes/upload
router.post('/upload/:fileid', async (req,res) => {
try {
    let user = await User.findById(req.params.userid);
    if (user) {
      try {
        // Using upsert option (creates new doc if no match is found):
        const profile = await Profile.findOneAndUpdate(
          {userID: user.id},
          {$set: req.body},
          {new: true, upsert: true, setDefaultsOnInsert: true}
        ); //.lean();
        
        user.profileID = profile.id;
        await user.save();
        profile.name = user.name;
        await profile.save();

        if (profile) {
          res.status(200).json({
            status: 200,
            data: profile,
          });
        }
        res.status(400).json({
          status: 400,
          message: "No profile found",
        });
      } catch (err) {
        res.status(400).json({
          status: 400,
          message: err.message,
        });
      }
    }
    res.status(400).json({
      status: 400,
      message: "No user found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }

})

// Upload file
// Request: POST
// Route: http://localhost:3002/api/s3/routes/upload
router.put('/saveProfile', async (req,res) => {
})

// Delete file
// Request: DELETE
// Route: http://localhost:3002/api/s3/routes/deletefile
router.delete('/deletefile/:fileid', async (req,res) => {
    try {
      const filename = req.query.filename;
      console.log(filename);
      await deleteFile(filename);
      res.status(200).json({msg: "success"});
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
})

const deleteFile = async (filename) => {

  const params = {
    Bucket: bucketName,
    Key: filename
  };

  try {
    await s3.deleteObject(params).promise();

    console.log(`File deleted successfully`);

  } catch (s3Err) {
    console.log(s3Err.message);
  }
};

// list all buckets
// Request: GET
// Route: http://localhost:3002/api/s3/routes/listBuckets
router.get('/listBuckets', async (req,res) => {
  s3.listBuckets(function(err, data) {
    if (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    } else {
      res.status(200).json({
        status: 200,
        data: data.Buckets,
      });
    }
  });
})
module.exports = router;