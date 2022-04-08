const router = require('express').Router();

// Controller
const controller = require('../controller/UsersController');

// Midleware
const authorize = require('../middleware/authorize');

// Route GET
router.get('/order', authorize, controller.getOrder);

// Route POST
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/order', authorize, controller.addOrder);

module.exports = router;
