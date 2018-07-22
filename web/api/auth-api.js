import BaseApi from './base-api'

export default ['$http', '$q', 'posgram',
  class AuthApi extends BaseApi {
    constructor($http, $q, posgram) {
      super($http, $q, posgram, 'auth');
    }

    login(username, password) {
      return this.$http.post(`${this.endpoint}/login`, null, {
        headers: {
          'Authorization': 'Basic ' + window.btoa(username + ':' + password)
        }
      })
    }
  }
]