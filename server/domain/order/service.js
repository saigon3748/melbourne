const _ = require('lodash');
const moment = require('moment');
const Promise = require('bluebird');
const promiseRetry = require('promise-retry');
const schema = require('./schema');
const BaseService = require('../base-service');
const TenantService = require('../tenant/service');
const CookService = require('../cook/service');
const pipeline = require('../../libs/pipeline');

module.exports = class Service extends BaseService {
  constructor(ctx) {
    super(schema, ctx);
  }

  getToday() {
    let fromDate = moment().utcOffset(4).startOf('day').toDate()
    let toDate = moment().utcOffset(4).endOf('day').toDate()

    let query = {
      createdAt: {
        $lte: toDate,
        $gte: fromDate
      },
      isDeleted: {
        $ne: true
      }
    };

    return this.find(query);
  }

  create(data) {
    if (!data) throw new Error('Missing data');
    if (!data.items) throw new Error('Missing items');
    if (data.items.length === 0) throw new Error('Missing items');

    let doCreate = () => {
      let order;
      let tenant;

      let doGetTenant = () => {
        return new TenantService(this._ctx)
          .findById(this._ctx.user.tenant._id)
          .then(result => {
            tenant = result
          })
      }
      
      let doGenerateCode = () => {
        data.code = this._generateCode(this._ctx.user.tenant.code);
        data.ref = data.code.slice(-4);
      }

      let doSave = () => {
        data = this._calculate(data);
        return super.create(data)
          .then(result => {
            order = result;
          })   
      }

      let doCook = () => {
        let doCookItem = (item) => {
          return new CookService(this._ctx)
            .create({
              tenant: order.tenant,
              orderId: order._id,
              orderCode: order.code,
              orderRef: order.ref,
              menuId: item._id,
              menuName: item.name,
              quantity: item.quantity,
              category: item.category,
              addons: item.addons,
              note: item.note,
              isTakeaway: item.isTakeaway
            })
        }

        return Promise.each(order.items, doCookItem);
      }

      let doReturn = () => {
        return this.findById(order._id);
      }

      return pipeline([
        doGetTenant,
        doGenerateCode,
        doSave,
        doCook,
        doReturn
      ])
    }

    return promiseRetry(doCreate, {retries: 3})
  }  

  _generateCode(code) {
    let timestamp = new Date().getTime().toString().slice(-4);
    return `${code}${moment().format("YYMMDD")}${timestamp}`
  }


  _calculate(data) {
    let order = {...data};

    let discount = 0;
    let subtotal = 0;
    let addonsSubtotal = 0;
    let mostExpensiveSubtotal = 0;
    let mostExpensiveAddonsSubtotal = 0;
    let leastExpensiveSubtotal = 0;
    let leastExpensiveAddonsSubtotal = 0;

    order.items.forEach(item => {
      item.subtotal = _.round(item.quantity * item.price, 2);
      subtotal += item.subtotal;

      let tempAddonsSubtotal = 0;
      
      item.addons.forEach(addon => {
        addon.subtotal = _.round(addon.quantity * addon.price, 2);
        addonsSubtotal += addon.subtotal;
        tempAddonsSubtotal += addon.subtotal;
      })

      if (item.subtotal > mostExpensiveSubtotal) {
        mostExpensiveSubtotal = item.subtotal;
      }

      if (item.subtotal + tempAddonsSubtotal > mostExpensiveAddonsSubtotal) {
        mostExpensiveAddonsSubtotal = item.subtotal + tempAddonsSubtotal;
      }

      if (leastExpensiveSubtotal === 0) {
        leastExpensiveSubtotal = item.subtotal;
      }

      if (item.subtotal < leastExpensiveSubtotal) {
        leastExpensiveSubtotal = item.subtotal;
      }

      if (item.subtotal + tempAddonsSubtotal < leastExpensiveAddonsSubtotal) {
        leastExpensiveAddonsSubtotal = item.subtotal + tempAddonsSubtotal;
      }

      if (leastExpensiveAddonsSubtotal === 0) {
        leastExpensiveAddonsSubtotal = item.subtotal + tempAddonsSubtotal;
      }
    })

    order.discounts.forEach(item => {
      if (!item.isPercentOff) {
        item.amount = _.round(item.quantity * item.discount, 2);
      } else {
        if (item.isAddonsInclusive) {
          if (item.isLeastExpensive) {
            item.amount = _.round(leastExpensiveAddonsSubtotal * item.quantity * item.discount / 100, 2);
          } else {
            if (item.isMostExpensive) {
              item.amount = _.round(mostExpensiveAddonsSubtotal * item.quantity * item.discount / 100, 2);
            } else {
              item.amount = _.round((subtotal + addonsSubtotal) * item.quantity * item.discount / 100, 2);
            }
          }
        } else {
          if (item.isLeastExpensive) {
            item.amount = _.round(leastExpensiveAddonsSubtotal * item.quantity * item.discount / 100, 2);
          } else {
            if (item.isMostExpensive) {
              item.amount = _.round(mostExpensiveAddonsSubtotal * item.quantity * item.discount / 100, 2);
            } else {
              item.amount = _.round(subtotal * item.quantity * item.discount / 100, 2);            
            }
          }
        }
      }

      discount += item.amount;
    })

    order.subtotal = _.round(subtotal + addonsSubtotal, 2);
    order.discount = _.round(discount, 2);

    if (order.isTaxInclusive) {
      order.total = order.subtotal - order.discount;
      order.tax = _.round(order.total * order.taxRate / 100, 2);
    } else {
      order.tax = _.round((order.subtotal - order.discount) * order.taxRate / 100, 2);
      order.total = order.subtotal - order.discount + order.tax;      
    }

    order.cash = order.cash || 0;
    order.change = order.change || 0;
    if (order.cash > 0) {
      order.change = order.cash - order.total;
    }

    return order;
  }  
}