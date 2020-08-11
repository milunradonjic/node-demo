const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthenticationError = require('../errors/authentication_error');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    next(new AuthenticationError());
  }
};

const isAuthGraphQL = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) req.isAuth = false;
    else {
      req.token = token;
      req.user = user;
      req.isAuth = true;
    }
    next();
  } catch (e) {
    req.isAuth = false;
    next();
  }
};

module.exports = { auth, isAuthGraphQL };
