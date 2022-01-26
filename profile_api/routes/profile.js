
const express = require('express');
const router = express.Router();

const path = require('path');
const User = require('../../auth/models/User');
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') });

const Profile = require('../models/Profile');



// const User = require('../models/ContactInfo');

//get whole profile object
//GET Route: http://localhost:3001/api/profile/getProfile
router.get('/getProfile', (req,res) => {
    const user = User.findById('61f0b6aac0cd2758d8ba6c0b')
    res.send(user.name)
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