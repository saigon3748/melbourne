import BaseController from '../base-controller';

export default [
  '$rootScope', '$scope', '$http', 'posgram', '$uibModalInstance', 'TenantApi', 'UserApi', 'tenant',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $http, posgram, $uibModalInstance, TenantApi, UserApi, tenant) {
      super()
      this.$http = $http;
      this.$scope = $scope;
      this.$uibModalInstance = $uibModalInstance;
      this.TenantApi = TenantApi;
      this.UserApi = UserApi;
      this.tenant = tenant || {};
      this.user = {};
    }

    $onInit() {
      if (this.tenant._id) {
        this.UserApi.find(`tenant._id=${this.tenant._id}`)
          .then(users => {
            this.users = users.docs || []
          })
          .catch(err => {
            toastr.error(err.data.message);
          })
      }
    }

    cancel() {
      this.$uibModalInstance.close(false);
    }

    save() {
      if (!this.validate()) return;

      if (!this.tenant._id) {
        let data = {
          tenant: this.tenant,
          user: this.user
        }

        return this.TenantApi.create(data)
          .then(tenant => {
            this.$uibModalInstance.close(tenant);
          })
          .catch(err => {
            toastr.error(err.message);
          })
      } 

      let data = {
        tenant: this.tenant
      }

      return this.TenantApi.update(this.tenant._id, this.tenant)
        .then(result => {
          this.$uibModalInstance.close(this.tenant);
        })
        .catch(err => {
          toastr.error(err.message);
        })
    }

    validate() {
      if (!this.tenant.name) {
        toastr.error("Shop name is required");
        return false;
      }

      if (!this.tenant.code) {
        toastr.error("Shop code is required");
        return false;
      }

      if (!this.tenant._id) {
        if (!this.user.name) {
          toastr.error("Admin name is required");
          return false;
        } 

        if (!this.user.username) {
          toastr.error("Login ID is required");
          return false;
        }

        if (!this.user.password) {
          toastr.error("Password is required");
          return false;
        } 
      }
      
      return true;
    }

    getUserRole(user) {
      if (user.isAdmin) return "Admin" 
      if (user.isManager) return "Manager" 
      return "Staff"      
    }

    lockUser(user) {
      let data = _.clone(user);
      data.isLocked = true;

      return this.UserApi.update(data._id, data)
        .then(result => {
          user.isLocked = true;
        })
        .catch(err => {
          toastr.error(err.message);
        })      
    }

    unlockUser(user) {
      let data = _.clone(user);
      data.isLocked = false;

      return this.UserApi.update(data._id, data)
        .then(result => {
          user.isLocked = false;
        })
        .catch(err => {
          toastr.error(err.message);
        })      
    }
  }
]