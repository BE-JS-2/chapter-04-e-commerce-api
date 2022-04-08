const sellersRoutes = require('express').Router()
const sellersController = require('../controllers/sellersController')

sellersRoutes.get('/',sellersController.getAllSeller)

module.exports=sellersRoutes;