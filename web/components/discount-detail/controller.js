import BaseController from '../base-controller';
import PasswordDialog from '../password-dialog';

export default [
  '$rootScope', '$scope', '$state', '$stateParams', 'posgram', 'DialogService', 'CategoryApi', 'DiscountApi',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $state, $stateParams, posgram, DialogService, CategoryApi, DiscountApi) {
      super()
      this.$state = $state;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.DiscountApi = DiscountApi;
      this.CategoryApi = CategoryApi;
    }

    $onInit() {
      this.CategoryApi.find()
        .then(categories => {
          this.categories = categories;
        })
        .catch(err => {
          toastr.error(err.message);
        })      

      if (this.$stateParams.id) {
        this.DiscountApi.findById(this.$stateParams.id)
          .then(discount => {
            this.discount = discount;
          })
          .catch(err => {
            toastr.error(err.message);
          })
      }
    }

    get title() {
      return this.$stateParams.id ? "Discount Detail" : "Create Discount";
    }

    save() {
      if (this.discount._id) {
        this.DiscountApi.update(this.discount._id ,this.discount)
          .then(discount => {
            toastr.success('Updated succeeded');
          })
          .catch(err => {
            toastr.error(err.error);
          })

        return;
      }

      this.DiscountApi.create(this.discount)
        .then(discount => {
          toastr.success('Created succeeded');
          this.$state.go(this.posgram.config.states.DISCOUNT_LIST);
        })
        .catch(err => {
          toastr.error(err.error);
        })
    }

    cancel() {
      this.$state.go(this.posgram.config.states.DISCOUNT_LIST);
      // this.DialogService.confirm("Do you want to discard change?")
      //   .then(confirmed => {
      //     if (!confirmed) return;
      //     this.$state.go(this.posgram.config.states.DISCOUNT_LIST);
      //   })
    }
  }
]