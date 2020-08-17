const { gql } = require('apollo-server-express');

module.exports = gql`
  input Pageable {
    page: Int!
    size: Int
  }
`;
