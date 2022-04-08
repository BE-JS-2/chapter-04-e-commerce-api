const categoriesRoutes = require('express').Router()
const categoriesController = require('../controllers/categoriesController')

categoriesRoutes.get('/',categoriesController.getAllCategories)

module.exports=categoriesRoutes;