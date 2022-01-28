
const express = require('express');
const router = express.Router();

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') });

const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc: GET delete profile 
// @route: http://localhost:3001/api/profile/getProfile/userID
router.get('/getProfile/:id', async (req,res) => {
  try {
    let user = await User.findById(req.params.id);
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


// @desc: POST create profile
// @route: http://localhost:3001/api/profile/createProfile/userID
// test user: 61f0b6aac0cd2758d8ba6c0b
router.post('/createProfile/:id', async (req,res) => {
  try {
      let profile = await Profile.insertOne(req.body);
    if (profile) {
      res.status(200).json({
        status: 200,
        data: profile,
      });
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
// @route: http://localhost:3001/api/profile/saveProfile
router.put('/saveProfile', async (req,res) => {
  try {
      // let user = await Profile.findById('61f0b6aac0cd2758d8ba6c0b')
      let user = await User.findOne({
        email: "quynhthoa1972@gmail.com"
      });
    if (user) {
      res.status(200).json({
        status: 200,
        data: user,
      });
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

// @desc: POST delete profile 
// @route: http://localhost:3001/api/profile/deleteProfile
router.delete('/deleteProfile/:id', async (req,res) => {
  try {
      // let user = await Profile.findById('61f0b6aac0cd2758d8ba6c0b')
      let user = await User.findByID(req.params.id);
    if (user) {
      res.status(200).json({
        status: 200,
        data: user,
      });
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
// router.get('/test', (req, res) => {
//     res.json({message: "Hello!"});
// })

module.exports = router;