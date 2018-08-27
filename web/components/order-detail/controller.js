import BaseController from '../base-controller';
import PasswordDialog from '../password-dialog';

export default [
  '$rootScope', '$scope', '$state', '$stateParams', 'posgram', 'DialogService', 'CategoryApi', 'OrderApi',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $state, $stateParams, posgram, DialogService, CategoryApi, OrderApi) {
      super()
      this.$state = $state;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.OrderApi = OrderApi;
      this.CategoryApi = CategoryApi;
    }

    $onInit() {
      if (!this.$stateParams.id) return;

      this.OrderApi.findById(this.$stateParams.id)
        .then(order => {
          this.order = order;
        })
        .catch(err => {
          toastr.error(err.message);
        })
    }

    save() {
      this.OrderApi.update(this.order._id ,this.order)
        .then(order => {
          toastr.success('Updated succeeded');
        })
        .catch(err => {
          toastr.error(err.error);
        })
    }

    cancel() {
      this.$state.go(this.posgram.config.states.ORDER_LIST);
      // this.DialogService.confirm("Do you want to discard change?")
      //   .then(confirmed => {
      //     if (!confirmed) return;
      //     this.$state.go(this.posgram.config.states.ORDER_LIST);
      //   })
    }
  }
]