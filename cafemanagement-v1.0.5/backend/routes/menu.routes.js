const express = require('express')
const router = express.Router();
const {addMenu, getMenu, getCatgorylist,searchMenu } = require('../controllers/menu.controllers')

router.route('/addMenu').post(addMenu)
router.route('/getMenu').post(getMenu)
router.route('/getCatgorylist').get(getCatgorylist)
router.route('/searchMenu').post(searchMenu)


module.exports = router