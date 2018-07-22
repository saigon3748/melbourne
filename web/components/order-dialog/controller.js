import BaseController from '../base-controller';

export default [
  '$rootScope', '$scope', '$http', 'posgram', '$uibModalInstance', 'OrderApi', 'order',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $http, posgram, $uibModalInstance, OrderApi, order) {
      super()
      this.$http = $http;
      this.$scope = $scope;
      this.$uibModalInstance = $uibModalInstance;
      this.OrderApi = OrderApi;
      this.order = order || {};
    }

    cancel() {
      this.$uibModalInstance.close(false);
    }

    save() {
      if (!this.validate()) return;

      if (this.order._id) {
        return this.OrderApi.update(this.order._id, this.order)
          .then(result => {
            toastr.success('Updated successfully');
            this.$uibModalInstance.close(this.order);
          })
          .catch(err => {
            toastr.error(err.message);
          })
      } else {
        return this.OrderApi.create(this.order)
          .then(order => {
            toastr.success('Created successfully');
            this.$uibModalInstance.close(order);
          })
          .catch(err => {
            toastr.error(err.message);
          })        
      }
    }

    validate() {
      if (!this.order.name) {
        toastr.error("Name is required");
        return false;
      }

      if (!this.order.unitPrice) {
        toastr.error("Unit price is required");
        return false;
      } 
      
      return true;
    }
  }
]