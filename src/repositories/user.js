const User = require('../models/user');

const findByCredentials = async (email, password) => {
  return User.findByCredentials(email, password).lean();
};

const generateAuthToken = async (user) => {
  const userMongoose = await User.findById(user._id);
  return userMongoose.generateAuthToken();
};

const create = async (userDTO) => {
  const user = new User(userDTO);
  return user.save();
};

const update = async (id, updateObject) => {
  return User.findByIdAndUpdate(id, updateObject, { new: true })
    .populate('projects.project')
    .populate('projects.roles')
    .lean();
};

const deleteById = async (id) => {
  await User.findByIdAndDelete(id);
};

const find = async () => {
  return User.find()
    .populate('projects.project')
    .populate('projects.roles')
    .lean();
};

const findPage = async (pageable) => {
  return User.findPage(pageable)
    .populate('projects.project')
    .populate('projects.roles')
    .lean();
};

const findOne = async (filter) => {
  return User.findOne(filter)
    .populate('projects.project')
    .populate('projects.roles')
    .lean();
};

module.exports = {
  findByCredentials,
  generateAuthToken,
  findPage,
  create,
  update,
  deleteById,
  find,
  findOne,
};
