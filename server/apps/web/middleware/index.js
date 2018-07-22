const intercept = require('./intercept');
const authenticate = require('./authenticate');
const authorize = require('./authorize');

module.exports = {
  intercept: intercept,
  authorize: authorize,
  authenticate: authenticate
}