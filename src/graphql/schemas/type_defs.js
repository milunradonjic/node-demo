const Query = require('./query');
const Mutation = require('./mutation');

const Pageable = require('./pageable');

const User = require('./user');
const Project = require('./project');
const Role = require('./role');

module.exports = [Query, Mutation, Pageable, User, Project, Role];
