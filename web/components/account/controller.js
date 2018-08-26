import BaseController from '../base-controller';

export default [
  '$rootScope', '$state', '$timeout', '$stateParams', 'posgram', 'DialogService', 'TenantApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $stateParams, posgram, DialogService, TenantApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$stateParams = $stateParams;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.TenantApi = TenantApi;
    }

    $onInit() {
      this.TenantApi.findById(this.$rootScope.user.tenant._id)
        .then(tenant => {
          this.account = tenant;
        })
        .catch(err => {
          toastr.error(err.message);
        })
    }

    save() {
      if (!this.validate()) return;

      let data = {
        name: this.account.name,
        taxRate: this.account.taxRate,
        isTaxInclusive: this.account.isTaxInclusive,
        isTakeaway: this.account.isTakeaway
      }

      return this.TenantApi.update(this.account._id, data)
        .then(result => {
          toastr.success('Saved account succeeded');
        })
        .catch(err => {
          toastr.error(err.message);
        })
    }

    validate() {
      if (!this.account.name) {
        toastr.error("Name is required");
        return false;
      }
      
      return true;
    }
  }
]
