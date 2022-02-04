
const express = require('express');
const router = express.Router();

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') });

const Profile = require('../models/Profile');
const User = require('../models/User');
const Test = require('../models/Test');

// @desc: GET profile 
// @route: http://localhost:3001/api/routes/getProfile/userID
router.get('/getProfile/:userid', async (req,res) => {
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
router.post('/test/:userid', async (req,res) => {
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


// @desc: POST create or update profile
// @route: http://localhost:3001/api/profile/createProfile/userID
// test user: http://localhost:3001/api/profile/createProfile/61f0b6aac0cd2758d8ba6c0b
router.post('/createProfile/:userid', async (req,res) => {
try {
    let user = await User.findById(req.params.userid);

    if (user) {
      try {
        const {
          name,
          location,
          about,
        } = req.body;

        const profileFields = {
          name: req.body.name,
          location: req.body.location,
          about: req.body.about,
      };
  
        // Using upsert option (creates new doc if no match is found):
        const profile = await Profile.findOneAndUpdate(
          {userID: user.id},
          {$set: profileFields},
          {new: true, upsert: true, setDefaultsOnInsert: true}
        ); //.lean();
        
        user.profileID = profile.id;
        await user.save();

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

// @desc: POST update profile 
// @route: http://localhost:3001/api/routes/saveProfile
// currently used in create route which creates or updates
router.put('/saveProfile', async (req,res) => {
})

// @desc: POST delete profile 
// @route: http://localhost:3001/api/routes/deleteProfile
router.delete('/deleteProfile/:userid', async (req,res) => {
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