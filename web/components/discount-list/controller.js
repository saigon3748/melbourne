import BaseController from '../base-controller';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'DiscountApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, posgram, DialogService, DiscountApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.DiscountApi = DiscountApi;
    }

    $onInit() {
      this.pagination = {
        page: 1,
        limit: 10
      };

      this.search();
    }

    search() {
      let query = this.searchText ? `text=${this.searchText}` : null;
      this.DiscountApi.find(query, this.pagination)
        .then(result => {
          this.discounts = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    download() {
      let query = this.searchText ? `text=${this.searchText}` : null;
      this.DiscountApi.download(query)
    }

    create() {
      this.$state.go(this.posgram.config.states.DISCOUNT_DETAIL);      
    }

    view(category) {
      this.$state.go(this.posgram.config.states.DISCOUNT_DETAIL, {id: category._id});      
    }

    getStatus(user) {
      return user.isArchived ? "Archived" : null;
    }

    getDiscount(discount) {
      if (discount.isPercentOff) {
        return discount.discount + "%";
      }

      return "$" + discount.discount;
    }
    
    paging(page) {
      this.pagination.page = page;
      this.search();
    }
  }
]
