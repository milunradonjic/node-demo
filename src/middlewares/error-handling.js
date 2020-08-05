const { handleError } = require('../utils/error');

module.exports = (err, req, res, next) => {
  handleError(err, res);
};
