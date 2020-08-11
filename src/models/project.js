const mongoose = require('mongoose');
const { PROJECT_MODEL } = require('../constants/model_names');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Project Name is required'],
  },
  description: {
    type: String,
    required: [true, 'Project Description is required'],
  },
});

const Project = mongoose.model(PROJECT_MODEL, RoleSchema);
module.exports = Project;
