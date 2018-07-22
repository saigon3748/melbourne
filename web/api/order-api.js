import BaseApi from './base-api'

export default ['$http', '$q', 'posgram',
  class OrderApi extends BaseApi {
    constructor($http, $q, posgram) {
      super($http, $q, posgram, 'orders');
    }
  }
]