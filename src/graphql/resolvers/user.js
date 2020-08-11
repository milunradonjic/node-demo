const userContoller = require('../../controllers/user');
const AuthenticationError = require('../../errors/authentication_error');

module.exports = {
  users: async (args, req) => {
    if (!req.isAuth) throw new AuthenticationError();
    const users = await userContoller.getUsers();
    return users;
  },
  createUser: async (args, req) => {
    if (!req.isAuth) throw new AuthenticationError();
    const { userInput } = args;
    const res = await userContoller.createUserGraphQL(userInput);
    return res.user;
  },
  login: async (args) => {
    const { email, password } = args;
    const res = await userContoller.loginGraphQL(email, password);
    return res;
  },
};
