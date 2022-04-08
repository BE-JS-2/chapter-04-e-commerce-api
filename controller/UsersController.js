require('dotenv').config()
const { Users, UserBiodata, Products, Transactions } = require('../models');
const { Api422Error, Api400Error, Api403Error, Api401Error, Api404Error } = require('../error/APIError');
const loginscm  = require('../validation/loginSchema');
const orderscm  = require('../validation/orderSchema');
const schema    = require('../validation/usersSchema');
const bcrypt    = require('bcrypt');
const crypto    = require('crypto');
const jwt       = require('jsonwebtoken');
const {
  JWT_SECRET_KEY, JWT_TIME_EXPIRED
} = process.env;

class UsersController {
  static async register(req, res, next) {
    try {
      const { error, value } = schema.validate(req.body);
      if (error) throw new Api422Error(error.message);

      await Users.create({
        username: value.username,
        password: value.password,
        biodata: {
          gender: value.gender,
          birthdate: value.birthdate,
          address: value.address,
        }
      }, {
        include: {
          model: UserBiodata,
          as: 'biodata'
        }
      })
      .then(() => {
        return res.status(201).json({
          success: true,
          message: "user successfully register"
        })
      })
      .catch(error => {
        console.log(error);
        throw new Api400Error(error.message)
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { error, value } = loginscm.validate(req.body);
      if (error) throw new Api422Error(error.message);

      const user = await Users.findOne({ where: { username: value.username } })
      if (!user) throw new Api401Error('invalid username');

      if (bcrypt.compareSync(value.password, user.password)) {
        jwt.sign({ id: user.id, username: user.username }, JWT_SECRET_KEY, { expiresIn: JWT_TIME_EXPIRED }, (err, token) => {
          if (err) throw new Api400Error(err.message)
          return res.json({
            success: true,
            message: 'user successfully login',
            token
          })
        });
      } else {
        throw new Api401Error('invalid password');
      }
    } catch (error) {
      next(error);
    }
  }

  static async addOrder(req, res, next) {
    try {
      const { error, value } = orderscm.validate(req.body);
      if (error) throw new Api422Error(error.message);

      const product = await Products.findOne({ where: { id: value.productId } });
      if (!product) throw new Api404Error('product not found');

      if (product.stock < value.amount) {
        throw new Api400Error('not enough stock')
      }

      await Transactions.create({
        userId: req.user.id,
        product_name: product.name,
        product_price: product.price * value.amount,
        amount: value.amount,
        productId: value.productId
      })
      .catch(error => {
        throw new Api400Error(error.message)
      });

      await Products.update({
        stock: product.stock - value.amount
      }, { where: { id: value.productId } })
      .catch(error => {
        throw new Api400Error(error.message)
      });

      return res.status(201).json({
        success: true,
        message: "order successfully added"
      })
    } catch (error) {
      next(error)
    }
  }

  static async getOrder(req, res, next) {
    try {
      await Transactions.findAll({
        where: { userId: req.user.id },
        attributes: ['product_name', 'product_price', 'amount']
      })
      .then(data => {
        return res.json({
          success: true,
          message: "data successfully retrieved",
          data
        })
      })
      .catch(error => {
        throw new Api400Error(error.message)
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UsersController;