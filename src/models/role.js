const mongoose = require('mongoose');
const { ROLE_MODEL } = require('../constants/model_names');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Role name is required'],
  },
  rights: [
    {
      name: String,
      path: String,
      url: String,
    },
  ],
});

const Role = mongoose.model(ROLE_MODEL, RoleSchema);
module.exports = Role;
