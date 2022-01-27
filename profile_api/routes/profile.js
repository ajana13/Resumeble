
const express = require('express');
const router = express.Router();

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') });

const Profile = require('../models/Profile');
const User = require('../models/User');

// const User = require('../models/ContactInfo');

//get whole profile object
//GET Route: http://localhost:3001/api/profile/getProfile
router.get('/getProfile', async (req,res) => {
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


    // const user =  await Profile.findById('61f0b6aac0cd2758d8ba6c0b', (error, err) => {
    //     console.log(error, err)
    // })
    //  res.json({message: user.name})

    // User.findOne({ id: '61f0b6aac0cd2758d8ba6c0b' }).then((user) => {
    //     // Check if user exists
    //     return res.send(user.id)
    // })

    // res.send({profile:profile})

})

//POST Route: http://localhost:3001/api/profile/saveProfile
router.post('/saveProfile', (req,res) => {
    res.json({message: "Saving the profile!!"});
    // User.findOneAndDelete({})
})
// router.get('/test', (req, res) => {
//     res.json({message: "Hello!"});
// })

module.exports = router;