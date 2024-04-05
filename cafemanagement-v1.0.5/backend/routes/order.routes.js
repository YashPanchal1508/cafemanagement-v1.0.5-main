const express = require('express')
const router = express.Router();
const {makeOrder,getOrder,updateOrderStatus} = require('../controllers/order.controllers')

router.route('/makeOrder').post(makeOrder)
router.route('/getOrder').get(getOrder)
router.route('/updateOrderStatus/:orderId').put(updateOrderStatus)

module.exports = router