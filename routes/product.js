const router = require('express').Router()

const controller = require('../controller/ProductController');

// Route GET
router.get('/', controller.getAll);
router.get('/:id', controller.getDetail);

// Route POST
router.post('/', controller.addProduct);

// Route PUT
router.put('/:id', controller.updateProduct);

// Route DELETE
router.delete('/:id', controller.deleteProduct);

module.exports = router;