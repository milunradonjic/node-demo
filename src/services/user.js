const User = require('../models/user');
const { ErrorHandler } = require('../utils/error');

const createUser = async (userDTO) => {
  const user = new User(userDTO);
  await user.save();
  const token = await user.generateAuthToken();
  return { user, token };
};

const login = async (email, password) => {
  const user = await User.findByCredentials(email, password);
  const token = await user.generateAuthToken();
  return { user, token };
};

const logout = async (user, invalidToken) => {
  user.tokens = user.tokens.filter(({ token }) => token !== invalidToken);
  await user.save();
};

const logoutAll = async (user) => {
  user.tokens = [];
  await user.save();
};

const validateUpdate = (updates) => {
  const allowedUpdates = ['email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) throw new ErrorHandler(400, 'Invalid updates');
};

const updateCurrentUser = async (user, updates) => {
  validateUpdate(updates);
  updates.forEach((update) => (user[update] = req.body[update]));
  await user.save();
  return user;
};

const deleteCurrentUser = async (user) => {
  await user.remove();
};

module.exports = {
  createUser,
  login,
  logout,
  logoutAll,
  updateCurrentUser,
  deleteCurrentUser,
};
