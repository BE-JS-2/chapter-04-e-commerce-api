const { body, validationResult } = require("express-validator");
const { isDuplicateUsername } = require("../controllers/users");

const productValidationRules = () => {
  return [
    body("categoryId", "Category not found").isLength({ min: 1 }),
    body("sellerId", "Seller not found").isLength({ min: 1 }),
    body("name", "Name not found").isLength({ min: 1 }),
    body("price", "Price not found").isLength({ min: 1 }),
    body("stock", "Stock not found").isLength({ min: 1 }),
  ];
};

const registerUserValidationRules = () => {
  return [
    body("username", "Username not found").isLength({ min: 1 }),
    // .custom((value) => {
    //   console.log("value", value);
    //   if (isDuplicateUsername(value)) {
    //     return Promise.reject("Username already in use");
    //   }
    // })
    body("name", "name not found").isLength({ min: 1 }),
    body("password", "Password not found").isLength({ min: 1 }),
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
