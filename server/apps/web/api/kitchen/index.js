const express = require('express');
const controller = require('./controller');
const middleware = require('../../middleware');

module.exports = express.Router()
  .get('/', 
    middleware.authenticate, 
    middleware.intercept(controller, 'find'))

  .get('/today', 
    middleware.authenticate, 
    middleware.intercept(controller, 'getToday'))

  .put('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'updateById'))

  .post('/markCompleted', 
    middleware.authenticate, 
    middleware.intercept(controller, 'markCompleted'))

  .post('/markUncompleted', 
    middleware.authenticate, 
    middleware.intercept(controller, 'markUncompleted'))

  .delete('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'deleteById'))
