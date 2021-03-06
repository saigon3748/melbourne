const { Readable } = require('stream'); 
const _ = require('lodash');
const pipeline = require('../../../libs/pipeline');
const Context = require('../../../infra/utils/context');

module.exports = function(controller, method, enableLog = false) {
  return (req, res, next) => {
    let ctx = new Context(_.clone(req.user), req)
    let ctrl = new controller(ctx);
    if (!ctrl || !ctrl[method]) {
      return next(new Error(`Method ${method} not found in controller`))
    }

    return ctrl[method]()
      .then(result => {
        if (method === "download") {
          res.setHeader('Content-disposition', 'attachment; filename=export.csv');
          res.setHeader('Content-Type', 'text/csv');
          res.flushHeaders();
          result.pipe(res);
          return;
        }

        res.json(result);
      })
      .catch(err => {
        if (err.output) {
          let payload = err.output.payload
          res.status(payload.statusCode).json(payload);
          return;
        }
console.log('intercept middleware', err)
        let payload = {
          "statusCode": 500,
          "error": "Internal Server Error",
          "message": "An internal server error occurred"
        }

        res.status(payload.statusCode).json(payload);      
      })
  };
};
