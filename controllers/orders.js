const { sequelize, Product, Transaction } = require("../models");

const buyProduct = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const product = await Product.findOne({
      where: {
        id: req.body.id,
      },
      attributes: ["id", "name", "stock", "price"],
    });
    if (product == null) {
      throw {
        status: 404,
        message: "Product not found",
      };
    } else if (product.stock - req.body.amount < 0) {
      throw {
        status: 401,
        message: "Invalid amount",
      };
    } else {
      await Product.update(
        {
          stock: product.stock - req.body.amount,
          updatedAt: new Date(),
        },
        { where: { id: req.body.id } },
        { transaction: t }
      );

      const tran = await Transaction.create(
        {
          userId: req.user.id,
          productName: product.name,
          amount: req.body.amount,
          productPrice: product.price,
          productId: req.body.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction: t }
      );
      await t.commit();
      return res.status(200).json({ message: "Success orders product" });
    }
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

module.exports = { buyProduct };
