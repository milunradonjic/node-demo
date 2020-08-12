const HttpStatus = require('http-status-codes');
const userService = require('../services/user');

const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account');

const createUser = async (req, res) => {
  try {
    const userDTO = req.body;
    const { user, token } = await userService.createUser(userDTO);
    sendWelcomeEmail(user.email, user.name);
    res.status(HttpStatus.CREATED).send({ user, token });
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST).send(e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await userService.login(email, password);
    res.send({ user, token });
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST).send();
  }
};

const logout = async (req, res) => {
  try {
    const { user, token } = req;
    await userService.logout(user, token);
    res.send();
  } catch (e) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
  }
};

const logoutAll = async (req, res) => {
  try {
    await userService.logoutAll(req.user);
    res.send();
  } catch (e) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
  }
};

const getCurrentUser = async (req, res) => {
  res.send(req.user);
};

const updateCurrentUser = async (req, res, next) => {
  try {
    const { user, body } = req;
    const result = await userService.updateCurrentUser(user, body);
    return res.send(result);
  } catch (e) {
    next(e);
  }
};

const deleteCurrentUser = async (req, res) => {
  const { user } = req;
  try {
    sendCancelationEmail(user.email, user.name);
    await userService.deleteCurrentUser(user);
    res.send(user);
  } catch (e) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
  }
};

module.exports = {
  createUser,
  login,
  logout,
  logoutAll,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
};
