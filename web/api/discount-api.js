import BaseApi from './base-api'

export default ['$http', '$q', 'posgram',
  class DiscountApi extends BaseApi {
    constructor($http, $q, posgram) {
      super($http, $q, posgram, 'discounts');
    }
  }
]