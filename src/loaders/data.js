const allRoles = require('../constants/roles');
const Project = require('../models/project');
const Role = require('../models/role');
const User = require('../models/user');

const isEmpty = (arr) => arr === null || arr.length === 0;

const projects = [
  {
    name: 'Test Project 1',
    description: 'This is first test project',
  },
  {
    name: 'Test Project 2',
    description: 'This is second test project',
  },
];

const roles = Object.keys(allRoles).map((key) => ({
  name: allRoles[key],
}));

const users = [
  {
    name: 'John Doe2',
    email: 'misho.radonjic95@gmail.com',
    password: '$2b$08$8u3rxsEA.xiUgcvb2fDgrOSjPkFHkB9DjTbMuAqiG7aHWOohy8JDa',
    projects: [
      {
        project: '5f32f50a5a9f316c236d62c9',
        roles: ['5f32f50a5a9f316c236d62cb', '5f32f50a5a9f316c236d62cc'],
      },
      {
        project: '5f32f50a5a9f316c236d62ca',
        roles: ['5f32f50a5a9f316c236d62cb', '5f32f50a5a9f316c236d62cc'],
      },
    ],
  },
  {
    name: 'Miso Radonjic',
    email: 'misho.radonjic951@gmail.com',
    password: '$2b$08$pvedf465pQ90YmDy7dmiCe.gaafqadk1AoBzQbAXBNhVWGGz5a6l.',
    projects: {
      project: '5f32f50a5a9f316c236d62ca',
      roles: ['5f32f50a5a9f316c236d62cd', '5f32f50a5a9f316c236d62ce'],
    },
  },
];

const loadData = async () => {
  const projectsFromDB = await Project.find();
  const rolesFromDB = await Role.find();
  const usersFromDB = await User.find();

  if (isEmpty(projectsFromDB)) Project.insertMany(projects);
  if (isEmpty(rolesFromDB)) Role.insertMany(roles);
  if (isEmpty(usersFromDB)) User.insertMany(users);
};

loadData();
