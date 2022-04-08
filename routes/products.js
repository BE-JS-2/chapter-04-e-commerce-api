const router = require('express').Router();
const { body } = require('express-validator');

const Products = require("../controllers/Products");
const isAuth = require("../middlewares/isAuth");

router.get("/products", Products.getProducts);

router.get("/product/:id", Products.getDetailProducts);

router.post("/product", [
    body("name").not().isEmpty().withMessage("Name is required").trim(),
    body("price").not().isEmpty().withMessage("Price is required").trim(),
    body("stock").not().isEmpty().withMessage("Stock is required").trim(),
    body("categoryId").not().isEmpty().withMessage("Category is required").trim(),
    body("sellerId").not().isEmpty().withMessage("Seller is required").trim()
], Products.postProduct);

router.put("/product/:id", [
    body("name").trim().not().isEmpty().withMessage("Name is required"),
    body("price").trim().not().isEmpty().withMessage("Price is required"),
    body("stock").trim().not().isEmpty().withMessage("Stock is required")
], Products.putProduct);

router.delete("/product/:id", Products.deleteProduct);

router.post("/order", isAuth, Products.postOrder);

router.get("/order", isAuth, Products.getOrders);

module.exports = router;