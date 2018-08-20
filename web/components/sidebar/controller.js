export default [
  '$rootScope', '$state', '$timeout', 'posgram',
  class Controller {
    constructor($rootScope, $state, $timeout, posgram) {
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.posgram = posgram;
    }

    get isSudo() {
      return this.$rootScope.user.isSudo;
    }
  }
]