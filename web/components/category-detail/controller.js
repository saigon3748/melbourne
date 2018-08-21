import BaseController from '../base-controller';
import PasswordDialog from '../password-dialog';

export default [
  '$rootScope', '$scope', '$state', '$stateParams', 'posgram', 'DialogService', 'CategoryApi',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $state, $stateParams, posgram, DialogService, CategoryApi) {
      super()
      this.$state = $state;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.posgram = posgram;
      this.DialogService = DialogService;
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
        this.CategoryApi.findById(this.$stateParams.id)
          .then(category => {
            this.category = category;
          })
          .catch(err => {
            toastr.error(err.message);
          })
      }
    }

    get title() {
      return this.$stateParams.id ? "Category Detail" : "Create Category";
    }

    save() {
      if (this.category._id) {
        this.CategoryApi.update(this.category._id ,this.category)
          .then(category => {
            toastr.success('Updated succeeded');
          })
          .catch(err => {
            toastr.error(err.error);
          })

        return;
      }

      this.CategoryApi.create(this.category)
        .then(category => {
          toastr.success('Created succeeded');
          this.$state.go(this.posgram.config.states.CATEGORY_LIST);
        })
        .catch(err => {
          toastr.error(err.error);
        })
    }

    cancel() {
      this.DialogService.confirm("Do you want to discard change?")
        .then(confirmed => {
          if (!confirmed) return;
          this.$state.go(this.posgram.config.states.CATEGORY_LIST);
        })
    }
  }
]