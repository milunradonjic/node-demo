const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schemas/type_defs');
const resolvers = require('./resolvers/resolvers');
const { authGraphQL } = require('../middlewares/auth');

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authGraphQL(req),
  formatError: (err) => {
    if (!err.originalError) return err;
    const { statusCode, message } = err.extensions.exception;
    return { statusCode, message };
  },
});
