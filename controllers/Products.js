const { Products, Categories, Sellers } = require("../models");
const { validationResult } = require('express-validator');

exports.getProducts = async(req, res, next) => {
    try {
        const products = await Products.findAll({
            attributes: ["name", "price", "stock"],
            include: [{
                model: Categories,
                attributes: ["name"]
            }, {
                model: Sellers,
                attributes: ["name"]
            }]
        });
        res.status(200).json({
            message: "Products fetched successfully!",
            products: products
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getDetailProducts = async(req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Products.findOne({
            where: {
                id: id
            },
            attributes: ["name", "price", "stock"],
            include: [{
                model: Categories,
                attributes: ["name"]
            }, {
                model: Sellers,
                attributes: ["name"]
            }]
        });
        res.status(200).json({
            message: "Product fetched successfully!",
            product: product
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postProduct = async(req, res, next) => {
    const { name, price, stock, categoryId, sellerId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed ,entered data is incorrect");
        error.statusCode = 422;
        throw error;
    }
    try {
        const product = await Products.create({
            name: name,
            price: price,
            stock: stock,
            categoryId: categoryId,
            sellerId: sellerId
        });
        res.status(201).json({
            message: "Product created successfully!",
            product: product
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.putProduct = async(req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, categoryId, sellerId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed ,entered data is incorrect");
        error.statusCode = 422;
        throw error;
    }
    try {
        const productIsEmpty = await Products.findByPk(id);
        if (!productIsEmpty) {
            const error = new Error("Could not find product");
            error.statusCode = 404;
            throw error;
        }
        const product = await Products.update({
            name: name,
            price: price,
            stock: stock,
            categoryId: categoryId,
            sellerId: sellerId
        }, {
            where: {
                id: id
            }
        });
        res.status(200).json({
            message: "Product updated successfully!",
            product: product
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteProduct = async(req, res, next) => {
    const { id } = req.params;
    try {
        const productIsEmpty = await Products.findByPk(id);
        if (!productIsEmpty) {
            const error = new Error("Could not find product");
            error.statusCode = 404;
            throw error;
        }
        const product = await Products.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json({
            message: "Product deleted successfully!",
            product: product
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}