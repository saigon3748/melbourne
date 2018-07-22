export default [
  '$http', '$rootScope', '$state', '$stateParams', 'posgram', 'UserApi', 'CountryApi',
  class UserProfileController {
    constructor($http, $rootScope, $state, $stateParams, posgram, UserApi, CountryApi) {
      this.$state = $state;
      this.$http = $http;
      this.posgram = posgram;
      this.$stateParams = $stateParams;
      this.UserApi = UserApi;
      this.CountryApi = CountryApi;
      this.userId = $rootScope.global.user._id;
    }

    $onInit() {
      this.CountryApi.list()
        .then(countries => {
          this.countries = countries;
        })
        .catch(err => {
          this.showError(err);
        });

      this.UserApi.get(this.userId)
        .then(res => {
          this.data = res;
        })
        .catch(err => {
          this.showError(err);
        });
    }

    get displayCountry() {
      if (!this.data || !this.countries) return null;
      if (!this.data.profile || !this.data.profile.country) return null;
      let country = _.find(this.countries, item => {
        return item._id.toString() === this.data.profile.country.toString();
      })

      if (country) return country.name;
      return null;
    }

    edit() {
      this.$state.go(this.appConfig.states.EDIT_PROFILE);
    }

    changePassword() {
      this.$state.go(this.appConfig.states.CHANGE_PASSWORD);
    }
  }
]