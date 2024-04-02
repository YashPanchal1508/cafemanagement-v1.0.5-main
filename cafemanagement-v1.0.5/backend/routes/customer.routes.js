const express = require('express')
const router = express.Router();
const {createCustomer,getCustomer} = require('../controllers/customer.controller')


router.route('/createCustomer').post(createCustomer)
router.route('/getCustomer').get(getCustomer)


module.exports = router