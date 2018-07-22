import ConfirmDialog from '../components/confirm-dialog';

export default [
  '$uibModal', '$rootScope',
  class Service {
    constructor($uibModal, $rootScope) {
      this.$uibModal = $uibModal;
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
        _.forOwn(inputs, (value, key) => {
          _.set(resolve, key, () => { return value; });
        });

        if (_.size(resolve) > 0) {
          _.extend(options, { resolve: resolve });
        }
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