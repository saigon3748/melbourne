import BaseController from '../base-controller';

export default [
  '$rootScope', '$state', '$timeout', '$stateParams', 'posgram', 'DialogService', 'TenantApi', 'UserApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $stateParams, posgram, DialogService, TenantApi, UserApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$stateParams = $stateParams;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.TenantApi = TenantApi;
      this.UserApi = UserApi;
      this.tenant = {};
      this.user = {};      
    }

    $onInit() {
      if (!this.$stateParams.id) return;

      this.TenantApi.findById(this.$stateParams.id)
        .then(tenant => {
          this.tenant = tenant;
        })
        .catch(err => {
          toastr.error(err.message);
        })      
    }

    get title() {
      return this.$stateParams.id ? "Shop Detail" : "Create Shop";
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
            toastr.error('Created shop succeeded');
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
          toastr.success('Saved shop succeeded');
        })
        .catch(err => {
          toastr.error(err.message);
        })
    }

    validate() {
      if (!this.tenant.name) {
        toastr.error("Name is required");
        return false;
      }

      if (!this.tenant.code) {
        toastr.error("Code is required");
        return false;
      }

      if (!this.tenant._id) {
        if (!this.user.username) {
          toastr.error("Username is required");
          return false;
        }

        if (!this.user.password) {
          toastr.error("Password is required");
          return false;
        }

        if (!this.user.firstName) {
          toastr.error("First name is required");
          return false;
        } 

        if (!this.user.lastName) {
          toastr.error("Last name is required");
          return false;
        }
      }
      
      return true;
    }

    cancel() {
      this.$state.go(this.posgram.config.states.TENANT_LIST);      
    }
  }
]
