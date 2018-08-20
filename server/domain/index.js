const _ = require('lodash');
const Tenant = require('./tenant');
const User = require('./user');
const Menu = require('./menu');
const Category = require('./category');
const Order = require('./order');
const Cook = require('./cook');
const Addon = require('./addon');
const Cash = require('./cash');
const Discount = require('./discount');
const Place = require('./place');
const Printer = require('./printer');

module.exports = class Domain {
  static Tenant(data) {
    return new Tenant.Model(data);
  }

  static TenantService(ctx) {
    return new Tenant.Service(ctx);
  }

  static User(data) {
    return new User.Model(data);
  }

  static UserService(ctx) {
    return new User.Service(ctx);
  }

  static Menu(data) {
    return new Menu.Model(data);
  }

  static MenuService(ctx) {
    return new Menu.Service(ctx);
  }

  static Category(data) {
    return new Category.Model(data);
  }

  static CategoryService(ctx) {
    return new Category.Service(ctx);
  }

  static Order(data) {
    return new Order.Model(data);
  }

  static OrderService(ctx) {
    return new Order.Service(ctx);
  }

  static Discount(data) {
    return new Discount.Model(data);
  }

  static DiscountService(ctx) {
    return new Discount.Service(ctx);
  }

  static Cook(data) {
    return new Cook.Model(data);
  }

  static CookService(ctx) {
    return new Cook.Service(ctx);
  }

  static Addon(data) {
    return new Addon.Model(data);
  }

  static AddonService(ctx) {
    return new Addon.Service(ctx);
  }

  static Cash(data) {
    return new Cash.Model(data);
  }

  static CashService(ctx) {
    return new Cash.Service(ctx);
  }

  static Place(data) {
    return new Place.Model(data);
  }

  static PlaceService(ctx) {
    return new Place.Service(ctx);
  }

  static Printer(data) {
    return new Printer.Model(data);
  }

  static PrinterService(ctx) {
    return new Printer.Service(ctx);
  }
}

