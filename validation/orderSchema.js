const Joi = require('joi');

module.exports = Joi.object({
  productId: Joi.number()
    .required()
    .messages({
      'number.base': 'productId should be number',
      'number.empty': 'productId cannot be empty',
      'any.required': 'productId is required'
    }),
  amount: Joi.number()
    .required()
    .messages({
      'number.base': 'amount should be number',
      'number.empty': 'amount cannot be empty',
      'any.required': 'amount is required'
    }),
})