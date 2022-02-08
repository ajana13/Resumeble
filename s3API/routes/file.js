
const express = require('express');
const router = express.Router();

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') });

// const Profile = require('../models/Profile');
// const User = require('../models/User');
// const Test = require('../models/Test');

// Read file
// Request: GET
// Route: http://localhost:3001/api/s3/routes/readfile
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

//test
router.post('/test/:fileid', async (req,res) => {
    try {
        let user = await User.findById(req.params.userid);

        const testFields = {
            name: "testname",
            location: "testloc",
            about: "testabout",
        };

        // Using upsert option (creates new doc if no match is found):
        const test = await Test.findOneAndUpdate(
          {userID: user.id},
          {$set: testFields},
          {new: true, upsert: true, setDefaultsOnInsert: true}
        );//.lean();
        
        //   clearCache(`profile:${req.user.id}`);
        res.status(200).json({
            status: 200,
            data: test,
        })
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
})


// Request: POST 
// Route: http://localhost:3001/api/s3/routes/upload
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
// Route: http://localhost:3001/api/s3/routes/upload
router.put('/saveProfile', async (req,res) => {
})

// Delete file
// Request: DELETE
// Route: http://localhost:3001/api/s3/routes/deletefile
router.delete('/deletefile/:fileid', async (req,res) => {
  try {
    let user = await User.findById(req.params.userid);
    if (user) {
      try {
        const profile = await Profile.findOneAndDelete(
          {userID: user.id}
        ); //.lean();
  
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

module.exports = router;