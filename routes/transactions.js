const express = require("express");
const { getUserTransaction } = require("../controllers/transactions");
const router = express.Router();

router.get("/", getUserTransaction);

module.exports = router;
