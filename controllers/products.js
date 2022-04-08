const { Product, Seller, Category } = require("../models");

const getProductList = async (req, res, next) => {
  const products = await Product.findAll({
    attributes: ["name", "price", "stock", "sellerId", "categoryId"],
    include: [
      {
        model: Seller,
        attributes: ["name"],
      },
      {
        model: Category,
        attributes: ["name"],
      },
    ],
  });

  const result = [];
  products.forEach((element) => {
    const temp = {
      name: element.name,
      price: element.price,
      stock: element.stock,
      seller: element.Seller.name,
      category: element.Category.name,
    };
    result.push(temp);
  });

  return res.status(200).json(result);
};

const getDetailProdukById = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      attributes: ["name", "price", "stock", "sellerId", "categoryId"],
      include: [
        {
          model: Seller,
          attributes: ["name"],
        },
        {
          model: Category,
          attributes: ["name"],
        },
      ],
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      throw {
        status: 404,
        message: "Product not found",
      };
    } else {
      const result = {
        name: product.name,
        price: product.price,
        stock: product.stock,
        seller: product.Seller.name,
        category: product.Category.name,
      };

      console.log("result", result);

      return res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      categoryId: req.body.categoryId,
      sellerId: req.body.sellerId,
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!product) {
      throw {
        status: 404,
        message: "Failed add product",
      };
    } else {
      return res.status(200).json({ message: "Success add product" });
    }
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id"],
    });

    if (!product) {
      throw {
        status: 404,
        message: "Product not found",
      };
    } else {
      await Product.update(
        {
          categoryId: req.body.categoryId,
          sellerId: req.body.sellerId,
          name: req.body.name,
          price: req.body.price,
          stock: req.body.stock,
          updatedAt: new Date(),
        },
        { where: { id: req.params.id } }
      );
      return res.status(200).json({ message: "Success update product" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id"],
    });

    if (!product) {
      throw {
        status: 404,
        message: "Product not found",
      };
    } else {
      await Product.destroy({ where: { id: req.params.id } });
      return res.status(200).json({ message: "Success delete product" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductList,
  getDetailProdukById,
  addProduct,
  updateProduct,
  deleteProduct,
};
