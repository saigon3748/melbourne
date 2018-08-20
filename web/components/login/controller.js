import toastr from 'toastr';

export default [
  '$rootScope', '$state', '$timeout', 'posgram', 'AuthApi', 'DialogService',
  class Controller {
    constructor($rootScope, $state, $timeout, posgram, AuthApi, DialogService) {
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.posgram = posgram;
      this.AuthApi = AuthApi;
      this.DialogService = DialogService;
    }

    login() {
      this.AuthApi.login(this.username, this.password)
        .then(result => {
          if (!result.token) return toastr.error(result.error);

          window.localStorage.setItem('token', result.token);
          
          let payload = result.token.split('.')[1];
          payload = payload.replace('-', '+').replace('_', '/');
          payload = JSON.parse(window.atob(payload));

          this.$rootScope.user = payload;
          this.$rootScope.isAuthenticated = true;
          if (this.$rootScope.user.isSudo) {
            this.$state.go(this.posgram.config.states.TENANT_LIST);
          } else {
            this.$state.go(this.posgram.config.states.DASHBOARD);
          }
        })
    }
  }
]