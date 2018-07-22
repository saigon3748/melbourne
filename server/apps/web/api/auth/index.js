const express = require('express');
const controller = require('./controller');
const middleware = require('../../middleware');

module.exports = express.Router()
  .post('/login', 
    middleware.intercept(controller, 'login'))
