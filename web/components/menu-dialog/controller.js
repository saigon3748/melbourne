import BaseController from '../base-controller';

export default [
  '$rootScope', '$scope', '$http', 'posgram', '$uibModalInstance', 'MenuApi', 'CategoryApi', 'menu',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $http, posgram, $uibModalInstance, MenuApi, CategoryApi, menu) {
      super()
      this.$http = $http;
      this.$scope = $scope;
      this.$uibModalInstance = $uibModalInstance;
      this.MenuApi = MenuApi;
      this.CategoryApi = CategoryApi;
      this.menu = menu || {};

      this.categories = [];

      this.init();
    }

    init() {
      return this.CategoryApi.find()
        .then(result => {
          this.categories = result;
        })
    }

    cancel() {
      this.$uibModalInstance.close(false);
    }

    save() {
      if (!this.validate()) return;

      if (this.menu._id) {
        return this.MenuApi.update(this.menu._id, this.menu)
          .then(result => {
            toastr.success('Updated successfully');
            this.$uibModalInstance.close(this.menu);
          })
          .catch(err => {
            toastr.error(err.message);
          })
      } else {
        return this.MenuApi.create(this.menu)
          .then(menu => {
            toastr.success('Created successfully');
            this.$uibModalInstance.close(menu);
          })
          .catch(err => {
            toastr.error(err.message);
          })        
      }
    }

    validate() {
      if (!this.menu.name) {
        toastr.error("Name is required");
        return false;
      }

      if (!this.menu.unitPrice) {
        toastr.error("Unit price is required");
        return false;
      } 
      
      return true;
    }
  }
]