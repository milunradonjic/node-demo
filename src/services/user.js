const User = require('../models/user');
const { ErrorHandler } = require('../utils/error');

const createUser = async (userDTO) => {
  const user = new User(userDTO);
  await user.save();
  const token = await user.generateAuthToken();
  await User.populate(user, [
    { path: 'projects.project' },
    { path: 'projects.roles' },
  ]);
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
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) throw new ErrorHandler(400, 'Invalid updates');
};

const updateCurrentUser = async (user, updateObject) => {
  const updates = Object.keys(updateObject);
  validateUpdate(updates);
  updates.forEach((update) => (user[update] = updateObject[update]));
  await user.save();
  return user;
};

const deleteCurrentUser = async (user) => {
  await user.remove();
};

const getUsers = async () => {
  const res = await User.find()
    .populate('projects.project')
    .populate('projects.roles');
  return res;
};

module.exports = {
  createUser,
  login,
  logout,
  logoutAll,
  updateCurrentUser,
  deleteCurrentUser,
  getUsers,
};
