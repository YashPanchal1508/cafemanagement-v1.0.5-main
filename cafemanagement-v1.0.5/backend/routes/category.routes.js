const express = require('express')
const router = express.Router();
const { addCategory, deleteCategory,getCategory,editCategory,searchCategory } = require( '../controllers/category.controllers.js')


router.route('/getCategory').get(getCategory)
router.route('/addCategory').post(addCategory)
router.route('/removeCategory').delete(deleteCategory)
router.route('/editCategory').put(editCategory)
router.route('/searchCategory').post(searchCategory)

module.exports = router