const BaseError = require('./BaseError');
const HttpStatusCodes = require('./HttpStatusCodes');

class Api404Error extends BaseError {
  constructor(
    message,
    name = "ERR_NOT_FOUND",
    statusCode = HttpStatusCodes.NOT_FOUND,
  ) {
    super(name, statusCode, message)
  }
}

class Api400Error extends BaseError {
  constructor(
    message,
    name = "ERR_BAD_REQUEST",
    statusCode = HttpStatusCodes.BAD_REQUEST,
  ) {
    super(name, statusCode, message)
  }
}

class Api401Error extends BaseError {
  constructor(
    message,
    name = "ERR_UNAUTHORIZED",
    statusCode = HttpStatusCodes.UNAUTHORIZED,
  ) {
    super(name, statusCode, message)
  }
}

class Api422Error extends BaseError {
  constructor(
    message,
    name = "ERR_UNPROCESSABLE_ENTITY",
    statusCode = HttpStatusCodes.UNPROCESSABLE_ENTITY,
  ) {
    super(name, statusCode, message)
  }
}

module.exports = { Api404Error, Api401Error, Api400Error, Api403Error, Api422Error, Api500Error };