const intercept = require('./intercept');
const authenticate = require('./authenticate');
const authorize = require('./authorize');
const { uploadMenu } = require('./upload');

module.exports = {
  intercept,
  authorize,
  authenticate,
  uploadMenu
}