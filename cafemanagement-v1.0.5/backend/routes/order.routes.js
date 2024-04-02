const express = require('express')
const router = express.Router();
const {makeOrder} = require('../controllers/order.controllers')

router.route('/makeOrder').post(makeOrder)

module.exports = router