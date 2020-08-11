const HttpStatus = require('http-status-codes');

module.exports = (err, req, res) => {
  const { statusCode = HttpStatus.BAD_REQUEST, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
