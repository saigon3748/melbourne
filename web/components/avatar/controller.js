export default [
  '$rootScope', '$state', '$timeout', 'posgram',
  class Controller {
    constructor($rootScope, $state, $timeout, posgram) {
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.posgram = posgram;
    }  

    logout() {
      window.localStorage.removeItem('token');
      this.$rootScope.user = null;
      this.$rootScope.isAuthenticated = false;
      this.$state.go(this.posgram.config.states.LOGIN);
    }     
  }
]