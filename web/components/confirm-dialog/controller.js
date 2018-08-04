export default [
  '$scope', '$modalInstance', 'type', 'message',
  class Controller {
    constructor($scope, $modalInstance, type, message) {
      this.$scope = $scope;
      this.$uibModalInstance = $modalInstance;
      this.type = type;
      this.message = message;
    }

    closeModal(result) {
      this.$uibModalInstance.close(result);
    }
  }
]