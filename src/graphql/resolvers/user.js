const userService = require('../../services/user');

const { sendWelcomeEmail } = require('../../emails/account');
const AuthenticationError = require('../../errors/authentication_error');

module.exports = {
  users: async (args, req) => {
    if (!req.isAuth) throw new AuthenticationError();
    const users = await userService.getUsers();
    return users;
  },

  createUser: async (args, req) => {
    if (!req.isAuth) throw new AuthenticationError();
    const { userInput } = args;
    const { user, token } = await userService.createUser(userInput);
    sendWelcomeEmail(user.email, user.name);
    return { user, token };
  },

  login: async (args) => {
    const { email, password } = args;
    const res = await userService.login(email, password);
    return res;
  },
};
