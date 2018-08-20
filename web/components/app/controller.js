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
      return this.$rootScope.isAuthenticated;
    }

    get isSudo() {
      return this.$rootScope.user.isSudo;
    }

    get loggedUser() {
      return this.$rootScope.user;
    }

    get tenant() {
      return this.$rootScope.user.tenant;
    }

    logout() {
      window.localStorage.removeItem('token');
      this.$rootScope.user = null;
      this.$rootScope.isAuthenticated = false;
      this.$state.go(this.posgram.config.states.LOGIN);
    }    
  }
]