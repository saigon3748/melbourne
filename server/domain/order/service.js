const _ = require('lodash');
const moment = require('moment');
const Promise = require('bluebird');
const promiseRetry = require('promise-retry');
const schema = require('./schema');
const BaseService = require('../base-service');
const TenantService = require('../tenant/service');
const KitchenService = require('../kitchen/service');
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

      let doCalculate = () => {
        data.subtotal = 0;
        data.discount = 0;

        data.items.forEach(item => {
          item.subtotal = _.round(item.quantity * item.unitPrice, 2);
          item.total = _.round(item.subtotal - (item.discount || 0), 2);

          if (item.extra && item.extra.length > 0) {
            item.extra.forEach(extra => {
              extra.subtotal = _.round(extra.quantity * extra.unitPrice, 2);
              extra.total = _.round(extra.subtotal - (extra.discount || 0), 2);
              data.subtotal += extra.subtotal;
              data.discount += extra.discount || 0;
            });
          }

          data.subtotal += item.subtotal;
          data.discount += item.discount;
        });

        data.isInclusiveGST = tenant.settings.isInclusiveGST;
        if (data.isInclusiveGST) {
          data.total = _.round(data.subtotal - data.discountAmt || data.discount, 2);
          data.tax = _.round(data.total * 0.11, 2);
        } else {
          data.tax = _.round((data.subtotal - data.discountAmt || data.discount) * 0.11, 2);
          data.total = _.round(data.subtotal - (data.discountAmt || data.discount) + data.tax, 2);
        }
      }

      let doSave = () => {
        console.log(JSON.stringify(data))
        return super.create(data)
          .then(result => {
            order = result;
          })   
      }

      let doCreateKitchen = () => {
        let doCreateKitchenItem = (item) => {
          return new KitchenService(this._ctx)
            .create({
              tenant: order.tenant,
              orderId: order._id,
              orderCode: order.code,
              orderRef: order.ref,
              itemId: item._id,
              name: item.name,
              quantity: item.quantity,
              category: item.category,
              extra: item.extra,
              note: item.note,
              isTakeaway: item.isTakeaway
            })
        }

        return Promise.each(order.items, doCreateKitchenItem);
      }

      let doReturn = () => {
        return order;
      }

      return pipeline([
        doGetTenant,
        doGenerateCode,
        doCalculate,
        doSave,
        doCreateKitchen,
        doReturn
      ])
    }

    return promiseRetry(doCreate, {retries: 3})
  }  

  _generateCode(code) {
    let timestamp = new Date().getTime().toString().slice(-4);
    return `${code}${moment().format("YYMMDD")}${timestamp}`
  }
}