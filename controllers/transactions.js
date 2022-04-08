const { Transaction } = require("../models");

const getUserTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findAll({
      attributes: ["productName", "productPrice", "amount"],
      where: {
        userId: req.user.id,
      },
    });

    if (!transaction) {
      throw {
        status: 404,
        message: "Product not found",
      };
    } else {
      return res.status(200).json(transaction);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserTransaction };
