const HttpStatus = require('http-status-codes');
const BaseError = require('./base_error');

class AuthenticationError extends BaseError {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, 'Please authenticate');
  }
}

module.exports = AuthenticationError;
