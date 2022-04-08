const express = require("express");
const { registerUser } = require("../controllers/users");
const {
  validate,
  registerUserValidationRules,
} = require("../middlewares/validator");
const router = express.Router();

router.post("/", registerUserValidationRules(), validate, registerUser);

module.exports = router;
