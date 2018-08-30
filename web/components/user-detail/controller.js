import BaseController from '../base-controller';
import PasswordDialog from '../password-dialog';

export default [
  '$rootScope', '$scope', '$state', '$stateParams', 'posgram', 'DialogService', 'UserApi',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $state, $stateParams, posgram, DialogService, UserApi) {
      super()
      this.$state = $state;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.UserApi = UserApi;
    }

    $onInit() {
      if (!this.$stateParams.id) return;

      this.UserApi.findById(this.$stateParams.id)
        .then(user => {
          this.user = user;
        })
        .catch(err => {
          toastr.error(err.message);
        })      
    }

    get title() {
      return this.$stateParams.id ? "User Detail" : "Create User";
    }

    changePassword() {
      let inputs = {
        user: _.clone(this.user)
      };

      this.DialogService.open(PasswordDialog, inputs)
        .then(password => {
          if (!password) return;
          this.user.password = password;
        })
    }

    save() {
      if (this.user._id) {
        this.UserApi.update(this.user._id ,this.user)
          .then(user => {
            toastr.success('Updated succeeded');
          })
          .catch(err => {
            toastr.error(err.error);
          })

        return;
      }

      this.UserApi.create(this.user)
        .then(user => {
          toastr.success('Created succeeded');
          this.$state.go(this.posgram.config.states.USER_LIST);
        })
        .catch(err => {
          toastr.error(err.error);
        })
    }

    delete() {
      this.DialogService.confirm("Do you want to delete?")
        .then(confirmed => {
          if (!confirmed) return;
          this.UserApi.markDeleted(this.user._id)
            .then(user => {
              toastr.success('Deleted succeeded');
              this.$state.go(this.posgram.config.states.USER_LIST);
            })
            .catch(err => {
              toastr.error(err.error);
            })
        })
    }

    cancel() {
      this.$state.go(this.posgram.config.states.USER_LIST);
    }
  }
]