const { gql } = require('apollo-server-express');

module.exports = gql`
  type Role {
    _id: ID!
    name: String!
  }
`;
