const express = require('express');
const controller = require('./controller');
const middleware = require('../../middleware');

module.exports = express.Router()
  .get('/', 
    middleware.authenticate, 
    middleware.intercept(controller, 'find'))

  .post('/', 
    middleware.authenticate, 
    middleware.intercept(controller, 'create'))

  .get('/download', 
    middleware.authenticate, 
    middleware.intercept(controller, 'download'))

  .get('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'findById'))

  .put('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'updateById'))

  .delete('/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'deleteById'))

  .post('/delete/:id', 
    middleware.authenticate, 
    middleware.intercept(controller, 'markDeleted'))
