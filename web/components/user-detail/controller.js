import BaseController from '../base-controller';

export default [
  '$rootScope', '$scope', '$http', 'posgram', '$uibModalInstance', 'UserApi', 'user',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $http, posgram, $uibModalInstance, UserApi, user) {
      super()
      this.$http = $http;
      this.$scope = $scope;
      this.$uibModalInstance = $uibModalInstance;
      this.UserApi = UserApi;
      this.user = user || {};
    }

    cancel() {
      this.$uibModalInstance.close(false);
    }

    save() {
      if (this.user._id) this.create()
      else this.update();
      // return this.DeliveryApi.updateCOD(this.order._id, this.codAmount, this.notes)
      //   .then(delivery => {
      //     this.$uibModalInstance.close(delivery);
      //   })
      //   .catch(err => {
      //     this.showDangerAlert("Cannot edit COD");
      //   })
    }

    create() {
      return this.UserApi.create(this.user)
        .then(user => {
          this.$uibModalInstance.close(user);
        })
        .catch(err => {
          // this.showDangerAlert("Cannot edit COD");
        })
    }

    update() {

    }
  }
]