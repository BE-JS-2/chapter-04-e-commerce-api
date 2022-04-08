const { Products, Categories, Sellers } = require('../models');
const { Api404Error, Api422Error, Api400Error } = require('../error/APIError');
const schema = require('../validation/productSchema');

class ProductController {
  static async getAll(req, res, next) {
    try {
      await Products.findAll({
        attributes: ['id', 'name', 'price', 'stock'],
        include: [
          { model: Sellers, as: 'seller', attributes: ['name'] },
          { model: Categories, as: 'category', attributes: ['name'] }
        ]
      })
      .then(data => {
        return res.json({
          success: true,
          message: "data successfully retrieved",
          data
        })
      })
    } catch (error) {
      next(error);
    }
  }

  static async getDetail(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Products.findOne({
        where: { id },
        attributes: ['id', 'name', 'price', 'stock'],
        include: [
          { model: Sellers, as: 'seller', attributes: ['name'] },
          { model: Categories, as: 'category', attributes: ['name'] }
        ]
      }).catch(error => {
        if (error.name == "SequelizeDatabaseError") {
          throw new Api400Error("Invalid input params id product")
        }
      })

      // check available product
      if (data == null) throw new Api404Error('id product not found')
      return res.json({
        success: true,
        message: "data successfully retrieved",
        data
      })
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      // check validation data body
      const { value, error } = schema.validate(req.body);
      if (error) throw new Api422Error(error.message);

      // adding data product
      await Products.create(value)
        .then(() => {
          return res.status(201).json({
            success: true,
            message: "data successfully added"
          })
        })
        .catch(error => {
          if (error.name == "SequelizeForeignKeyConstraintError") {
            throw new Api400Error('wrong categoryId or sellerId data')
          } else {
            throw new Api400Error(error.message)
          }
        })
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    const { id } = req.params;

    try {
      // check available product
      const checkAVB = await Products.findOne({ where: { id } })
        .catch(error => {
          if (error.name == "SequelizeDatabaseError") {
            throw new Api400Error("Invalid input params id product")
          }
        });
      if (!checkAVB) throw new Api404Error('id product not found');

      // check validation data body
      const { error, value } = schema.validate(req.body);
      if (error) throw new Api422Error(error.message);
      
      // updating data product
      await Products.update(value, { where: { id } })
        .then(() => {
          return res.json({
            success: true,
            message: "data successfully updated"
          })
        })
        .catch(error => {
          if (error.name == "SequelizeForeignKeyConstraintError") {
            throw new Api400Error('wrong categoryId or sellerId data')
          } else {
            throw new Api400Error(error.message)
          }
        })
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    const { id } = req.params;

    try {
      // check available product
      const checkAVB = await Products.findOne({ where: { id } })
        .catch(error => {
          if (error.name == "SequelizeDatabaseError") {
            throw new Api400Error("Invalid input params id product")
          }
        });
      if (!checkAVB) throw new Api404Error('id product not found');

      await Products.destroy({ where: { id } })
        .then(() => {
          return res.json({
            success: false,
            message: "product successfully deleted"
          })
        })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;