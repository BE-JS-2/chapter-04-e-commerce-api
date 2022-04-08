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
})