import BaseController from '../base-controller';
import PasswordDialog from '../password-dialog';

export default [
  '$rootScope', '$scope', '$state', '$stateParams', 'posgram', 'DialogService', 'CategoryApi', 'MenuApi',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $state, $stateParams, posgram, DialogService, CategoryApi, MenuApi) {
      super()
      this.$state = $state;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.MenuApi = MenuApi;
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
        this.MenuApi.findById(this.$stateParams.id)
          .then(menu => {
            this.menu = menu;
          })
          .catch(err => {
            toastr.error(err.message);
          })
      }
    }

    get title() {
      return this.$stateParams.id ? "Menu Detail" : "Create Menu";
    }

    save() {
      if (this.menu._id) {
        this.MenuApi.update(this.menu._id ,this.menu)
          .then(menu => {
            toastr.success('Updated succeeded');
          })
          .catch(err => {
            toastr.error(err.error);
          })

        return;
      }

      this.MenuApi.create(this.menu)
        .then(menu => {
          toastr.success('Created succeeded');
          this.$state.go(this.posgram.config.states.MENU_LIST);
        })
        .catch(err => {
          toastr.error(err.error);
        })
    }

    cancel() {
      this.DialogService.confirm("Do you want to discard change?")
        .then(confirmed => {
          if (!confirmed) return;
          this.$state.go(this.posgram.config.states.MENU_LIST);
        })
    }
  }
]