import BaseController from '../base-controller';

export default [
  '$rootScope', '$scope', '$http', 'posgram', '$uibModalInstance', 'order',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $http, posgram, $uibModalInstance, order) {
      super()
      this.$http = $http;
      this.$scope = $scope;
      this.$uibModalInstance = $uibModalInstance;
      this.order = order;
    }

    close() {
      this.$uibModalInstance.close(false);
    }

    print() {
      this.$uibModalInstance.close(false);
    }
  }
]