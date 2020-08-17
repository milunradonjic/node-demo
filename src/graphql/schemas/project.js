const { gql } = require('apollo-server-express');

module.exports = gql`
  type Project {
    _id: ID!
    name: String!
    description: String!
  }
`;
