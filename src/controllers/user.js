const userService = require('../services/user');

const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account');

const createUser = async (req, res) => {
  try {
    const userDTO = req.body;
    const { user, token } = await userService.createUser(userDTO);
    sendWelcomeEmail(user.email, user.name);
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    console.log(req.body);
    const { user, token } = await userService.login(email, password);
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
};

const logout = async (req, res) => {
  try {
    const { user, token } = req;
    await userService.logout(user, token);
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const logoutAll = async (req, res) => {
  try {
    await userService.logoutAll(req.user);
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const getCurrentUser = async (req, res) => {
  res.send(req.user);
};

const updateCurrentUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const { user } = req;
    const result = await userService.updateCurrentUser(user, updates);
    if (result.error) return res.status(400).send(result.error);
    return res.send(result.user);
  } catch (e) {
    return res.status(400).send(e);
  }
};

const deleteCurrentUser = async (req, res) => {
  const { user } = req;
  try {
    sendCancelationEmail(user.email, user.name);
    await userService.deleteCurrentUser(user);
    res.send(user);
  } catch (e) {
    res.status(500).send();
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
