const express = require("express");
const {
  getProductList,
  getDetailProdukById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const {
  productValidationRules,
  validate,
} = require("../middlewares/validator");
const router = express.Router();

router.get("/", getProductList);
router.get("/:id", getDetailProdukById);
router.post("/", productValidationRules(), validate, addProduct);
router.put("/:id", productValidationRules(), validate, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
