import BaseApi from './base-api'

export default ['$http', '$q', 'posgram',
  class OrderApi extends BaseApi {
    constructor($http, $q, posgram) {
      super($http, $q, posgram, 'orders');
    }

    markArchived(id) {
      let url = `${this.endpoint}/archive/${id}`;

      return this.$q((resolve, reject) => {
        this.$http.post(url)
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