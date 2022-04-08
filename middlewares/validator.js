const { body, validationResult } = require("express-validator");
const { User } = require("../models");

const productValidationRules = () => {
  return [
    body("categoryId", "Category not found").not().isEmpty(),
    body("sellerId", "Seller not found").not().isEmpty(),
    body("name", "Name not found").not().isEmpty(),
    body("price", "Price not found").not().isEmpty(),
    body("stock", "Stock not found").not().isEmpty(),
  ];
};

const registerUserValidationRules = () => {
  return [
    body("username", "Username not found")
      .not()
      .isEmpty()
      .custom(async (value) => {
        const isExist = await User.findOne({
          where: {
            username: value,
          },
        });
        console.log("isExist", isExist);
        if (isExist) {
          return Promise.reject("Username already in use");
        }
      }),
    body("name", "name not found").not().isEmpty(),
    body("password", "Password not found").not().isEmpty(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  productValidationRules,
  validate,
  registerUserValidationRules,
};
