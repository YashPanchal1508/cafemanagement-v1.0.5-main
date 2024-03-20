const express = require('express')
const router = express.Router();
const {addMenu, getMenu, getCatgorylist,searchMenu,filterProducts } = require('../controllers/menu.controllers')

router.route('/addMenu').post(addMenu)
router.route('/getMenu').post(getMenu)
router.route('/getCatgorylist').get(getCatgorylist)
router.route('/searchMenu').post(searchMenu)
router.route('/filterProducts').post(filterProducts)


module.exports = router