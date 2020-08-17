const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    createUser(userInput: UserInput): User
  }
`;
