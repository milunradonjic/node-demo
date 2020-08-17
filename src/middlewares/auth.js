const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/user');
const AuthenticationError = require('../errors/authentication_error');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserRepository.findOne({
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

const authGraphQL = async (req) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserRepository.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) return { isAuth: false };
    return { token, user, isAuth: true };
  } catch (e) {
    return { isAuth: false };
  }
};

module.exports = { auth, authGraphQL };
