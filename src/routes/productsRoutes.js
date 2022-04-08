const productsRoutes = require('express').Router()
const productsController = require('../controllers/productsController')

productsRoutes.get('/',productsController.getAllProducts)
productsRoutes.post('/',productsController.createProduct)
productsRoutes.get('/:id',productsController.getProductsId)
productsRoutes.put('/:id',productsController.updateProduct)
productsRoutes.delete('/:id',productsController.deleteProduct)

module.exports=productsRoutes;