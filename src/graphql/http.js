const { graphqlHTTP } = require('express-graphql');
const schema = require('./schemas/index');
const resolvers = require('./resolvers/index');

module.exports = graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: process.env.GRAPHIQL,
  customFormatErrorFn: (err) => {
    if (!err.originalError) return err;
    return err.originalError;
  },
});
