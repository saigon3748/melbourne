import BaseController from '../base-controller';

export default [
  '$rootScope', '$scope', '$http', 'posgram', '$uibModalInstance', 'UserApi', 'user',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $http, posgram, $uibModalInstance, UserApi, user) {
      super()
      this.$http = $http;
      this.$scope = $scope;
      this.$uibModalInstance = $uibModalInstance;
      this.UserApi = UserApi;
      this.user = user || {};
      this.isPasswordEditing = false;
    }

    cancel() {
      this.$uibModalInstance.close(false);
    }

    save() {
      if (!this.validate()) return;

      if (this.user._id) {
        this.user.password = this.newPassword;
        return this.UserApi.update(this.user._id, this.user)
          .then(result => {
            toastr.success('Updated successfully');
            this.$uibModalInstance.close(this.user);
          })
          .catch(err => {
            toastr.error(err.data.message);
          })
      } else {
        return this.UserApi.create(this.user)
          .then(user => {
            toastr.success('Created successfully');
            this.$uibModalInstance.close(user);
          })
          .catch(err => {
            toastr.error(err.data.message);
          })        
      }
    }

    validate() {
      if (!this.user.username) {
        toastr.error("Username is required");
        return false;
      }

      if (!this.user.password && !this.user._id) {
        toastr.error("Password is required");
        return false;
      } 

      if (!this.user.name) {
        toastr.error("Name is required");
        return false;
      } 
      
      return true;
    }
  }
]