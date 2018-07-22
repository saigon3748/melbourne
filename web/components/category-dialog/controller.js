import BaseController from '../base-controller';

export default [
  '$rootScope', '$scope', '$http', 'appConfig', '$uibModalInstance', 'CategoryApi', 'category',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $http, appConfig, $uibModalInstance, CategoryApi, category) {
      super()
      this.$http = $http;
      this.$scope = $scope;
      this.$uibModalInstance = $uibModalInstance;
      this.CategoryApi = CategoryApi;
      this.category = category || {};
    }

    cancel() {
      this.$uibModalInstance.close(false);
    }

    addSub() {
      this.category.subs = this.category.subs || [];
      this.category.subs.push({
        _t: (new Date()).getTime()
      })
    }

    deleteSub(sub) {
      sub.isDeleted = true;
    }

    save() {
      if (!this.validate()) return;

      this.category.displayIndex = this.category.displayIndex || 1;
      if (this.category.subs) {
        this.category.subs.forEach(item => {
          item.displayIndex = item.displayIndex || 1;
        })
      }

      if (this.category._id) {
        return this.CategoryApi.update(this.category._id, this.category)
          .then(result => {
            toastr.success('Updated successfully');
            this.$uibModalInstance.close(this.category);
          })
          .catch(err => {
            toastr.error(err.message);
          })
      } else {
        return this.CategoryApi.create(this.category)
          .then(category => {
            toastr.success('Created successfully');
            this.$uibModalInstance.close(category);
          })
          .catch(err => {
            toastr.error(err.message);
          })        
      }
    }

    validate() {
      if (!this.category.name) {
        toastr.error("Name is required");
        return false;
      }

      if (this.category.sub) {
        this.category.subs.forEach(item => {
          if (!item.name) {
            toastr.error("Name is required");
            return false;
          }
        })
      }
      
      return true;
    }
  }
]