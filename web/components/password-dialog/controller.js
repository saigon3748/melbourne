import BaseController from '../base-controller';

export default [
  '$rootScope', '$scope', '$http', 'posgram', '$modalInstance', 'UserApi', 'user',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $http, posgram, $modalInstance, UserApi, user) {
      super()
      this.$http = $http;
      this.$scope = $scope;
      this.$modalInstance = $modalInstance;
      this.UserApi = UserApi;
      this.user = user;
    }

    cancel() {
      this.$modalInstance.close(false);
    }

    save() {
      if (!this.validate()) return;

      this.UserApi.update(this.user._id, {password: this.password})
        .then(result => {
          toastr.success('Updated succeeded');
          this.$modalInstance.close(this.password);
        })
        .catch(err => {
          toastr.error(err.message);
        })
    }

    validate() {
      if (!this.password) {
        toastr.error("Password is required");
        return false;
      }

      if (!this.confirmPassword) {
        toastr.error("Confirm password is required");
        return false;
      } 
      
      if (this.password != this.confirmPassword) {
        toastr.error("Passwords are not matched");
        return false;
      } 
      
      return true;
    }
  }
]