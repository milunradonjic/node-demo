const userService = require('../../services/user');

const { sendWelcomeEmail } = require('../../emails/account');
const auth = require('../../utils/auth');

module.exports = {
  users: (args, req) => {
    // auth(req);
    return userService.getUsers(args.pageable);
  },

  createUser: async ({ userInput }, req) => {
    auth(req);
    const { user, token } = await userService.createUser(userInput);
    sendWelcomeEmail(user.email, user.name);
    return { user, token };
  },

  login: async ({ email, password }) => {
    return userService.login(email, password);
  },
};
