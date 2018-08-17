const _ = require('lodash');
const express = require('express');

module.exports = express.Router()
  .use('/auth', require('./auth'))  
  .use('/tenants', require('./tenant'))  
  .use('/users', require('./user'))
  .use('/menus', require('./menu'))
  .use('/categories', require('./category'))
  .use('/orders', require('./order'))
  .use('/cooks', require('./cook'))
  .use('/addons', require('./addon'))
  .use('/discounts', require('./discount'))
  .use('/cashes', require('./cash'))
  .use('/places', require('./place'))

