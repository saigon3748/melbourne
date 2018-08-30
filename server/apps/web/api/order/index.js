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

  .post('/', 
    middleware.authenticate, 
    middleware.intercept(controller, 'create'))

  .get('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'findById'))

  .put('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'updateById'))

  .delete('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'deleteById'))

  .post('/deleteById/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'markDeleted'))

  .post('/delete/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'markDeleted'))

  .post('/archive/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'markArchived'))
