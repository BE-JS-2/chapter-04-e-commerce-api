module.exports = (error, req, res, next) => {
  const { statusCode, name, message } = error;
  return res.status(statusCode).json({
    success: false,
    code: name,
    message
  })
}