import BaseController from '../base-controller';
import PasswordDialog from '../password-dialog';

export default [
  '$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'posgram', 'DialogService', 'CategoryApi', 'MenuApi', 'Upload',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $state, $stateParams, $timeout, posgram, DialogService, CategoryApi, MenuApi, Upload) {
      super()
      this.$state = $state;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.MenuApi = MenuApi;
      this.CategoryApi = CategoryApi;
      this.Upload = Upload;
    }

    $onInit() {
      this.selectedFiles = [];

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
            this.fileUrl = this.menu.imageUrl;
          })
          .catch(err => {
            toastr.error(err.message);
          })
      }
    }

    get title() {
      return this.$stateParams.id ? "Menu Detail" : "Create Menu";
    }

    onImageChange() {
      if (!this.file) return;

      let reader = new FileReader();
      reader.onload = (e) => {
        this.$timeout(() => {
          this.fileUrl = e.target.result;
        });
      }

      reader.readAsDataURL(this.file);
    }

    save() {
      if (this.menu._id) {
        this.Upload.upload({
          url: `${this.posgram.config.api}/menus/${this.menu._id}`,
          method: 'PUT',
          data: _.extend(this.menu, {
            file: this.file
          })
        }).then((result) => {
          toastr.success('Updated succeeded');
        }, (err) => {
          toastr.error('Updated failed');
        });

        return;
      }

      this.Upload.upload({
        url: `${this.posgram.config.api}/menus`,
        data: _.extend(this.menu, {
          file: this.file
        })
      }).then((result) => {
        toastr.success('Created succeeded');
        this.$state.go(this.posgram.config.states.MENU_LIST);
      }, (err) => {
        toastr.error('Created failed');
      });
    }

    cancel() {
      this.$state.go(this.posgram.config.states.MENU_LIST);
      // this.DialogService.confirm("Do you want to discard change?")
      //   .then(confirmed => {
      //     if (!confirmed) return;
      //     this.$state.go(this.posgram.config.states.MENU_LIST);
      //   })
    }
  }
]