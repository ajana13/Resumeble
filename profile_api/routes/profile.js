
const express = require('express');

const path = require('path');
const User = require('../../auth/models/User');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

const Profile = require('../models/Profile');



const router = express.Router();
// const User = require('../models/ContactInfo');

//get whole profile object

//get name only
router.get('/getProfile', (req,res) => {
    res.json({message: "Here is the profile!!"});
})

router.post('/saveProfile', (req,res) => {
    User.findOneAndDelete({})
})
// router.get('/test', (req, res) => {
//     res.json({message: "Hello!"});
// })

module.exports = router;