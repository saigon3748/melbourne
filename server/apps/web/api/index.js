const _ = require('lodash');
const express = require('express');
const AuthApi = require('./auth');
const TenantApi = require('./tenant');
const UserApi = require('./user');
const MenuApi = require('./menu');
const CategoryApi = require('./category');
const OrderApi = require('./order');
const KitchenApi = require('./kitchen');
const AddonApi = require('./addon');
const CashApi = require('./cash');

module.exports = express.Router()
  .use('/auth', AuthApi)  
  .use('/tenants', TenantApi)  
  .use('/users', UserApi)
  .use('/menus', MenuApi)
  .use('/categories', CategoryApi)
  .use('/orders', OrderApi)
  .use('/kitchens', KitchenApi)
  .use('/addons', AddonApi)
  .use('/cashes', CashApi)

