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

  .post('/complete', 
    middleware.authenticate, 
    middleware.intercept(controller, 'completeAll'))

  .post('/complete/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'complete'))

  .post('/undo/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'undo'))

  .delete('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'deleteById'))
