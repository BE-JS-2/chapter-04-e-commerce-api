const { sequelize, Product, Transaction } = require("../models");

const decStock = async (idParam, stockParam, amountParam) => {
  try {
    await Product.update(
      {
        stock: stockParam - amountParam,
        updatedAt: new Date(),
      },
      { where: { id: idParam } }
    );
    return true;
  } catch (error) {
    return false;
  }
};

const logTransaction = async (
  userIdParam,
  productNameParam,
  amountParam,
  priceParam,
  productIdParam
) => {
  try {
    await Transaction.Create({
      userId: userIdParam,
      productName: productNameParam,
      amount: amountParam,
      price: priceParam,
      productId: productIdParam,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return true;
  } catch (error) {
    return false;
  }
};

const buyProduct = async (req, res, next) => {
  // const t = await sequelize.transaction();

  try {
    const product = await Product.findOne(
      {
        where: {
          id: req.body.id,
        },
        attributes: ["id", "name", "stock", "price"],
      }
      // { transaction: t }
    );
    if (product == null) {
      throw {
        status: 404,
        message: "Product not found",
      };
    } else if (product.stock - req.body.amount < 0) {
      throw {
        status: 401,
        message: "Not enough stock",
      };
    } else {
      const temp = decStock(product.id, product.stock, req.body.amount);
      if (!temp) {
        throw {
          status: 401,
          message: "Failed decrease Stock",
        };
      }
      temp = logTransaction(
        req.user.id,
        product.name,
        req.body.amount,
        product.price,
        req.body.id
      );
      if (!temp) {
        throw {
          status: 401,
          message: "Failed log transaction",
        };
      }
      //   // { transaction: t }
      // );
      // await t.commit();
      return res.status(200).json({ message: "Success orders product" });
    }
  } catch (error) {
    // await t.rollback();
    next(error);
  }
};

module.exports = { buyProduct };
