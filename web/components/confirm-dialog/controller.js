export default [
  '$scope', '$uibModalInstance', 'type', 'message',
  class Controller {
    constructor($scope, $uibModalInstance, type, message) {
      this.$scope = $scope;
      this.$uibModalInstance = $uibModalInstance;
      this.type = type;
      this.message = message;
    }

    closeModal(result) {
      this.$uibModalInstance.close(result);
    }
  }
]