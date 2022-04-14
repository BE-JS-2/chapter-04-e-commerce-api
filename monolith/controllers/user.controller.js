const { User, UserBiodata, Product, Transaction } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { sequelize } = require('../models')

class UserController {
   static async register (req, res) {
      const user = await User.create({
        name: req.body.name,
        password: req.body.password
      })
      await UserBiodata.create({
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        address: req.body.address,
        userId: user.id,
      })

      res.status(201).json({
        message: 'Successfully create user'
      })
   }

   static async login (req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          name: req.body.name
        }
      })
      if (!user) {
        throw {
          status: 401,
          message: 'Invalid username or password'
        }
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // mengeluarkan token
          let token = jwt.sign({ id: user.id, name: user.name });
          res.status(200).json({
            message: 'Login success',
            token,
          })
          console.log(token)
        } else {
          throw {
            status: 401,
            message: 'Invalid username or password'
          }
        }
      }
     } catch (error) {
      next(error);
     }
    // masukkan username dan password
    // cek apakah username ada di database, kalau ada, lanjut proses selanjutnya, kalau misalnya username
    // tidak ada di database, maka error (tidak bisa dapat token)
    // username ada di database => mencocokan password, kalau cocok dapet token, kalau tidak, tidak bisa masuk (tidak dapat token)
   }

   static async order (req, res, next) {
    const t = await sequelize.transaction();
    // cek apakah barang dengan ID = req.body.id ada di database
    // cek stok barang ada (stok >= jumlah barang yang dibeli user)
    // kalau ada, kalian catat di tabel transaksi
    // kalau tidak ada, lempar error barang tidak tersedia
    // kalau sudah tercatat di tabel transaksi, kurangi stok barang

    // untuk mendapatkan ID barang, req.body.id, amount: req.body.amount
    try {
      const product = await Product.findOne({
        where: {
          id: req.body.id,
        }
      })
  
      if (!product) {
        throw {
          status: 404,
          message: 'Product not found'
        }
      } else {
        if (product.stock >= req.body.amount) {
          // create transaction dan kurangi stok
          const transaction = await Transaction.create({
            userId: req.user.id,
            product_name: product.name,
            amount: req.body.amount,
            product_price: product.price,
            productId: product.id,
          }, {
            transaction: t
          })
          // await Product.update({
          //   stock: product.stock - req.body.amount
          // }, {
          //   where: {
          //     id: product.id,
          //   }
          // })

          await Product.decrement('stock', { 
            by: req.body.amount, 
            where: {
              id: product.id,
            },
            transaction: t,
          })

          await t.commit()
          res.status(200).json({
            message: 'Successfully order product'
          })
        } else {
          throw {
            status: 400,
            message: 'Product unavailable'
          }
        }
      }
    } catch (err) {
      await t.rollback();
      next(err)
    }
   }

   static async getOrder (req, res, next) {
    try {
      const transactions = await Transaction.findAll({
        where: {
          userId: req.user.id
        }
      })
      res.status(200).json(transactions);
    } catch (err) {
      next(err);
    }
   }
};

module.exports = UserController;