require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Api401Error } = require('../error/APIError');
const {
  JWT_SECRET_KEY
} = process.env;

module.exports = (req, res, next) => {
  const Auth = req.get('Authorization');
  const [ bearer, token ] = Auth.split(' ')
  console.log(bearer, token);
  try {
    if (bearer === "Bearer") {
      jwt.verify(token, JWT_SECRET_KEY, (err, pass) => {
        if (err) throw new Api401Error(err.message)
        if (pass) {
          req.user = pass
          next()
        }
      })
    } else {
      throw new Api401Error('wrong token')
    }
  } catch (error) {
    next(error);
  }
}