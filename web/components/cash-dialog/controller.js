import BaseController from '../base-controller';

export default [
  '$rootScope', '$scope', '$http', 'posgram', '$modalInstance', 'CashApi',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $http, posgram, $modalInstance, CashApi) {
      super()
      this.$http = $http;
      this.$scope = $scope;
      this.$modalInstance = $modalInstance;
      this.CashApi = CashApi;
    }

    cancel() {
      this.$modalInstance.close(false);
    }

    save() {
      if (!this.validate()) return;

      let data = {
        cash: this.cash
      };

      this.CashApi.create(data)
        .then(result => {
          toastr.success('Created succeeded');
          this.$modalInstance.close(true);
        })
        .catch(err => {
          toastr.error(err.message);
        })
    }

    validate() {
      if (!this.cash) {
        toastr.error("Cash is required");
        return false;
      }
      
      return true;
    }
  }
]