const { gql } = require('apollo-server-express');

module.exports = gql`
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

  type AuthData {
    user: User!
    token: String!
  }

  extend type Query {
    users(pageable: Pageable): [User!]!
    createUser(user: UserInput): User!
    login(email: String!, password: String!): AuthData!
  }
`;
