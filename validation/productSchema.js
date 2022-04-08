const Joi = require('joi');

module.exports = Joi.object({
  sellerId: Joi.string()
    .required()
    .messages({
      'string.base': 'sellerId should be string',
      'string.empty': 'sellerId cannot be empty',
      'any.required': 'sellerId is required'
    }),
  categoryId: Joi.number()
    .required()
    .messages({
      'number.base': 'categoryId should be number',
      'number.empty': 'categoryId cannot be empty',
      'any.required': 'categoryId is required'
    }),
  name: Joi.string()
    .required()
    .messages({
      'string.base': 'name should be string',
      'string.empty': 'name cannot be empty',
      'any.required': 'name is required'
    }),
  price: Joi.number()
    .required()
    .messages({
      'number.base': 'price should be number',
      'number.empty': 'price cannot be empty',
      'any.required': 'price is required'
    }),
  stock: Joi.number()
    .required()
    .messages({
      'number.base': 'stock should be number',
      'number.empty': `stock cannot be empty`,
      'any.required': `stock is required`
    }),
})