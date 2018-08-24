import BaseController from '../base-controller';
import PasswordDialog from '../password-dialog';

export default [
  '$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'posgram', 'DialogService', 'CategoryApi', 'AddonApi', 'Upload',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $state, $stateParams, $timeout, posgram, DialogService, CategoryApi, AddonApi, Upload) {
      super()
      this.$state = $state;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.AddonApi = AddonApi;
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
        this.AddonApi.findById(this.$stateParams.id)
          .then(addon => {
            this.addon = addon;
            this.fileUrl = this.addon.imageUrl;
          })
          .catch(err => {
            toastr.error(err.message);
          })
      }
    }

    get title() {
      return this.$stateParams.id ? "Addon Detail" : "Create Addon";
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
      if (this.addon._id) {
        this.Upload.upload({
          url: `${this.posgram.config.api}/addons/${this.addon._id}`,
          method: 'PUT',
          data: _.extend(this.addon, {
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
        url: `${this.posgram.config.api}/addons`,
        data: _.extend(this.addon, {
          file: this.file
        })
      }).then((result) => {
        toastr.success('Created succeeded');
        this.$state.go(this.posgram.config.states.ADDON_LIST);
      }, (err) => {
        toastr.error('Created failed');
      });
    }

    cancel() {
      this.DialogService.confirm("Do you want to discard change?")
        .then(confirmed => {
          if (!confirmed) return;
          this.$state.go(this.posgram.config.states.ADDON_LIST);
        })
    }
  }
]