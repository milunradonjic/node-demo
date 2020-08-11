const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

// graphql
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const userContoller = require('./controllers/user');

const handleError = require('./middlewares/error-handling');

require('./db/mongoose');

const router = require('./routers/router');

const app = express();

require('./loaders/data');

app.use(helmet());
app.use(logger(process.env.LOGGER));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
      type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        projects: [UserProject!]!
      }

      input UserInput {
        name: String!
        email: String!
        password: String!
        projects: [UserProjectInput!]
      }

      type UserProject {
        _id: ID!
        project: Project!
        roles: [Role!]!
      }

      input UserProjectInput {
        project: ID!
        roles: [ID!]!
      }

      type Project {
        _id: ID!
        name: String!
        description: String!
      }

      type Role {
        _id: ID!
        name: String!
      }

      type RootQuery {
        users: [User!]!
      }

      type RootMutation {
        createUser(userInput: UserInput): User
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      users: async () => {
        const users = await userContoller.getUsers();
        return users;
      },
      createUser: async (args) => {
        const { userInput } = args;
        const res = await userContoller.createUserGraphQL(userInput);
        return res.user;
      },
    },
    graphiql: true,
  })
);

app.use(handleError);

module.exports = app;
