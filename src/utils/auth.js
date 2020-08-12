const AuthenticationError = require('../errors/authentication_error');

module.exports = (req) => {
  if (!req.isAuth) throw new AuthenticationError();
};
