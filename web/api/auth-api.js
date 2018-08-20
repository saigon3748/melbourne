import BaseApi from './base-api'

export default ['$http', '$q', 'posgram',
  class AuthApi extends BaseApi {
    constructor($http, $q, posgram) {
      super($http, $q, posgram, 'auth');
    }

    login(username, password) {
      let token = 'Basic ' + window.btoa(username + ':' + password);

      return this.$q((resolve, reject) => {
        this.$http.post(`${this.endpoint}/login`, null, {
            headers: {
              'Authorization': token
            }
          })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
]