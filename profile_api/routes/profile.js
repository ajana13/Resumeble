
const express = require('express');
const router = express.Router();

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') });

const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc: GET delete profile 
// @route: http://localhost:3001/api/profile/getProfile/userID
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


// @desc: POST create profile
// @route: http://localhost:3001/api/profile/createProfile/userID
// test user: http://localhost:3001/api/profile/createProfile/61f0b6aac0cd2758d8ba6c0b
router.post('/createProfile/:id', async (req,res) => {
  try {

    let profileFields = {
      name: req.body.name,
      location: req.body.location,
      about: req.body.about,
      // skills: Array.isArray(skills)
      //   ? skills
      //   : skills.length === 0 ? [] : skills.split(",").map((skill) => skill.trim()),
      // status:req.body.status,
    };

      // Using upsert option (creates new doc if no match is found):
      const profile = await Profile.findOneAndUpdate(
        {user: req.user.id},
        {$set: profileFields},
        {new: true, upsert: true, setDefaultsOnInsert: true}
      ).lean();

      res.json(profile);

      clearCache(`profile:${req.user.id}`);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    try {
    //populate user document with profile id
    if (profile) {
      let user = await User.findById(req.params.userid);
      
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