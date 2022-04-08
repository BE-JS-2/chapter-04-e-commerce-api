const express = require("express");
const { buyProduct } = require("../controllers/orders");
const router = express.Router();

router.post("/", buyProduct);

module.exports = router;
