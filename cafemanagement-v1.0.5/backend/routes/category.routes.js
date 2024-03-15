const express = require('express')
const router = express.Router();
const { addCategory, deleteCategory,getCategory } = require( '../controllers/category.controllers.js')


router.route('/getCategory').get(getCategory)
router.route('/addCategory').post(addCategory)
router.route('/removeCategory').delete(deleteCategory)

module.exports = router