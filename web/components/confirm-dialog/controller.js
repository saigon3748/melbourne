export default [
  '$scope', '$modalInstance', 'type', 'message',
  class Controller {
    constructor($scope, $modalInstance, type, message) {
      this.$scope = $scope;
      this.$modalInstance = $modalInstance;
      this.type = type;
      this.message = message;
    }

    closeModal(result) {
      this.$modalInstance.close(result);
    }
  }
]