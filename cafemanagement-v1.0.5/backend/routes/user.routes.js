const express = require('express')
const router = express.Router();
const {createUser,loginUser} = require('../controllers/user.controllers.js')


router.route('/createUser').post(createUser)
router.route('/loginUser').post(loginUser)

module.exports = router