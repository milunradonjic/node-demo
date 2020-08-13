const HttpStatus = require('http-status-codes');
const BaseError = require('../errors/base_error');
const UserRepository = require('../repositories/user');

const createUser = async (userDTO) => {
  const user = await UserRepository.create(userDTO);
  const token = await UserRepository.generateAuthToken(user);
  return { user, token };
};

const login = async (email, password) => {
  const user = await UserRepository.findByCredentials(email, password);
  const token = await UserRepository.generateAuthToken(user);
  return { user, token };
};

const logout = async (user, invalidToken) => {
  const updateObject = {
    tokens: user.tokens.filter(({ token }) => token !== invalidToken),
  };
  return UserRepository.update(user._id, updateObject);
};

const logoutAll = async (user) => {
  const updateObject = { tokens: [] };
  return UserRepository.update(user._id, updateObject);
};

const validateUpdate = (updateObject) => {
  const updates = Object.keys(updateObject);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    throw new BaseError(HttpStatus.BAD_REQUEST, 'Invalid updates');
};

const updateCurrentUser = async (user, updateObject) => {
  validateUpdate(updateObject);
  return UserRepository.update(user._id, updateObject);
};

const deleteCurrentUser = async (user) => {
  await UserRepository.deleteById(user._id);
};

const getUsers = async (pageable) => {
  return !pageable ? UserRepository.find() : UserRepository.findPage(pageable);
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
