const express = require('express')
const router = express.Router();
const User = require('../../models/users');
const bcrypt = require('bcrypt');

//Controllers
const {signup,signin, requireSignin} = require('../../controller/admin/auth');

router.post('/signin',signin);

router.post('/signup',signup);

router.post('/profile',requireSignin,(req,res) => {
    res.status(200).json({user : "Profile"});
})


module.exports = router;