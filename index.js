const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')
const ProductController = require('./controllers/product.controller');
const UserController = require('./controllers/user.controller.js');
const errorHandler = require('./errorHandler');
const { body, validationResult } = require('express-validator');
const { Category } = require('./models');


app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/product', ProductController.list)
app.get('/product/:id', ProductController.getById)
app.post(
  '/product',
   // middleware validasi input
   [
      body('categoryId')
        .notEmpty()
        .withMessage('Category ID should not be empty')
        .custom(value => {
          return Category.findOne({
            where: {
              id: value,
            }
          }).then(category => {
            if (!category) {
              return Promise.reject('Category does not exist');
            }
          });
        })
        ,
      body('sellerId')
        .notEmpty(),
      body('name')
        .notEmpty(),
      body('price')
        .notEmpty(),
      body('stock')
        .notEmpty()
   ],
   (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({
        status: 400,
        message: errors.array()
      })
    } else {
      next()
    }
   },
  ProductController.create
)
app.put('/product/:id',
[
  body('categoryId')
    .optional()
    .notEmpty()
    .withMessage('Category ID should not be empty')
    .bail()
    .custom(value => {
      return Category.findOne({
        where: {
          id: value,
        }
      }).then(category => {
        if (!category) {
          return Promise.reject('Category does not exist');
        }
      });
    })
    ,
  body('sellerId')
    .optional()
    .notEmpty(),
  body('name')
    .optional()
    .notEmpty(),
  body('price')
    .optional()
    .notEmpty(),
  body('stock')
    .optional()
    .notEmpty()
],
(req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
  next({
    status: 400,
    message: errors.array()
  })
} else {
  next()
}
},
ProductController.edit)
app.delete('/product/:id', ProductController.delete)

app.post('/register-user',
[
  body('name')
    .notEmpty()
    .withMessage('Name should not be empty')
    ,
  body('password')
    .notEmpty(),
  body('birthdate')
    .notEmpty(),
  body('gender')
    .notEmpty(),
  body('address')
    .notEmpty()
],
(req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
  next({
    status: 400,
    message: errors.array()
  })
} else {
  next()
}
},
UserController.register);

app.post('/login', UserController.login)

app.post('/order',
(req, res, next) => {
  if (req.headers.authorization) {
    const decodedToken = jwt.decode(req.headers.authorization)
    req.user = decodedToken;
    next();
  } else {
    throw {
      status: 401,
      message: 'Unauthorized'
    }
  }
},
UserController.order)

app.get('/order',
(req, res, next) => {
  if (req.headers.authorization) {
    const decodedToken = jwt.decode(req.headers.authorization)
    req.user = decodedToken;
    next();
  } else {
    throw {
      status: 401,
      message: 'Unauthorized'
    }
  }
},
UserController.getOrder)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})