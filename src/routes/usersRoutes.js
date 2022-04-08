const usersRoutes = require('express').Router()
const usersController = require('../controllers/usersController')


usersRoutes.get('/',usersController.getAllUsers);
module.exports=usersRoutes;