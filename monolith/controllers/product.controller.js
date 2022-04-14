const { Product, Seller, Category } = require('../models/index')
const sequelize = require('sequelize');
class ProductController {
  static async list (req, res, next) {
    try {
      const products = await Product.findAll({
        attributes: [
          'name', 
          'price', 
          'stock',
          [sequelize.literal('"seller"."name"'), 'seller_name'],
          [sequelize.literal('"category"."name"'), 'category_name'],
        ],
        include: [
          {
            model: Seller,
            as: 'seller',
            attributes: [],
          },
          {
            model: Category,
            as: 'category',
            attributes: []
          }
        ]
      })
      res.status(200).json(products);
    } catch(err) {
      next(err);
    }
  }

  static async getById (req, res, next) {
    try {
      const product = await Product.findOne({
        where: {
          id: req.params.id,
        }
      })
      if (!product) {
        throw {
          status: 404,
          message: 'Product not found'
        }
      } else {
        res.status(200).json(product);
      }
    } catch (err) {
      next(err)
    }

  }
  
  static async create(req, res, next) {
    try {
      const createdProduct = await Product.create({
        categoryId: req.body.categoryId,
        sellerId: req.body.sellerId,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
      })
      res.status(201).json(createdProduct)
    } catch (err) {
      next(err)
    }
  }

  static async edit(req, res, next) {
    try {
      const updatedProduct = await Product.update(req.body, {
        where: {
          id: req.params.id
        },
        returning: true,
      })
      res.status(200).json(updatedProduct[1][0])
    } catch(err) {
      next(err)
    }

  }

  static async delete (req, res, next) {
    try {
      await Product.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json('Succesfully delete product')
    } catch(err) {
      next(err);
    }
  }
};

module.exports = ProductController;
