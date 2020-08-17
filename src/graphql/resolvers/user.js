const userService = require('../../services/user');

const { sendWelcomeEmail } = require('../../emails/account');
const auth = require('../../utils/auth');

module.exports = {
  Query: {
    users: (parent, args, context) => {
      auth(context);
      return userService.getUsers(args.pageable);
    },

    createUser: async (parent, { userInput }, context) => {
      auth(context);
      const { user, token } = await userService.createUser(userInput);
      sendWelcomeEmail(user.email, user.name);
      return { user, token };
    },

    login: async (parent, { email, password }) => {
      return userService.login(email, password);
    },
  },
};
