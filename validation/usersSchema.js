const Joi = require('joi');

module.exports = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      'string.base': 'username should be string',
      'string.empty': 'username cannot be empty',
      'any.required': 'username is required'
    }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      'string.base': 'password should be string',
      'string.empty': 'password cannot be empty',
      'string.min': 'password minimum length 8 character',
      'any.required': 'password is required'
    }),
  gender: Joi.string()
    .required()
    .valid('male', 'female')
    .messages({
      'string.base': 'gender should be string',
      'string.empty': 'gender cannot be empty',
      'any.only': 'gender must contain male or female',
      'any.required': 'gender is required'
    }),
  birthdate: Joi.date()
    .required()
    .messages({
      'date.base': 'birthdate should be date',
      'date.empty': 'birthdate cannot be empty',
      'any.required': 'birthdate is required'
    }),
  address: Joi.string()
    .required()
    .messages({
      'string.base': 'address should be string',
      'string.empty': 'address cannot be empty',
      'any.required': 'address is required'
    }),
})