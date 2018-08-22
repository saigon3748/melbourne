import BaseController from '../base-controller';

export default [
  '$rootScope', '$scope', '$http', 'posgram', '$modalInstance', 'PlaceApi',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $http, posgram, $modalInstance, PlaceApi) {
      super()
      this.$http = $http;
      this.$scope = $scope;
      this.$modalInstance = $modalInstance;
      this.PlaceApi = PlaceApi;
    }

    cancel() {
      this.$modalInstance.close(false);
    }

    save() {
      if (!this.validate()) return;

      let data = {
        name: this.name,
        zone: this.zone
      };

      this.PlaceApi.create(data)
        .then(result => {
          toastr.success('Created succeeded');
          this.$modalInstance.close(true);
        })
        .catch(err => {
          toastr.error(err.message);
        })
    }

    validate() {
      if (!this.name) {
        toastr.error("Name is required");
        return false;
      }
      
      return true;
    }
  }
]