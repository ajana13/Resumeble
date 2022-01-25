const express = require('express');

const router = express.Router();

const mongodb = app.curentUser.mongo
//get whole profile object
const ContactInfo = require('../models/Profile');
//get name only
router.get('/getProfile', (req,res) => {
    ContactInfo.findOne
})
// router.get('/test', (req, res) => {
//     res.json({message: "Hello!"});
// })

module.exports = router;