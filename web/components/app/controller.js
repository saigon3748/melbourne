export default [
  '$rootScope', '$state', '$timeout', 'posgram', 'AuthService',
  class Controller {
    constructor($rootScope, $state, $timeout, posgram, AuthService) {
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.posgram = posgram;
      this.AuthService = AuthService;
    }

    get isAuthenticated() {
      return this.AuthService.isAuthenticated;
    }

    get isSudo() {
      return this.$rootScope.global.user.name === "sudo";
    }

    get loggedUser() {
      return this.$rootScope.global.user;
    }

    get tenant() {
      return this.$rootScope.global.user.tenant;
    }

    logout() {
      window.localStorage.removeItem('token');
      this.$rootScope.global.user = null;
      this.$rootScope.isLoggedIn = false;
      this.$state.go(this.posgram.config.states.LOGIN);
    }    
  }
]