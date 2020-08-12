const { buildSchema } = require('graphql');

module.exports = buildSchema(`
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

      type AuthData {
        user: User!
        token: String!
      }

      input Pageable {
        page: Int!
        size: Int
      }

      type RootQuery {
        users(pageable: Pageable): [User!]!
        login(email: String!, password: String!): AuthData!
      }

      type RootMutation {
        createUser(userInput: UserInput): User
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `);
