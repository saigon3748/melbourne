import ConfirmDialog from '../components/confirm-dialog';

export default [
  '$modal', '$rootScope',
  class Service {
    constructor($modal, $rootScope) {
      this.$uibModal = $modal;
      this.$rootScope = $rootScope;
    }

    open(dialog, inputs, size) {
      let options = {
        size: size || 'md',
        template: dialog.template,
        controller: dialog.controller,
        controllerAs: '$ctrl',
        backdrop: 'static'
      };

      if (inputs) {
        let resolve = {};
        
        Object.keys(inputs).forEach(key => {
          resolve[key] = () => { return inputs[key]; }
        })

        Object.assign(options, { resolve: resolve });
      }

      return this.$uibModal.open(options).result;
    }

    confirm(message) {
      let inputs = {
        type: 'confirm',
        message: message
      };
      
      return this.open(ConfirmDialog, inputs, 'sm');
    }

    info(message) {
      let inputs = {
        type: 'info',
        message: message
      };
      
      return this.open(ConfirmDialog, inputs, 'sm');
    }
  }
]