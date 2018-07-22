export default [
  '$rootScope', '$state', '$timeout', 'posgram',
  class Controller {
    constructor($rootScope, $state, $timeout, posgram) {
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.posgram = posgram;
    }

    get isLoggedIn() {
      return this.$rootScope.isLoggedIn;
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