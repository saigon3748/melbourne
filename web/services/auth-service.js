export default [
  '$rootScope',
  class Service {
    constructor($rootScope) {
      this.$rootScope = $rootScope;
    }

    get isAuthenticated() {
      return this.$rootScope.isAuthenticated;
    }
  }
]