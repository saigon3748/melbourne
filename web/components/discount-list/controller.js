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
      let query = "isDeleted=false";
      if (this.searchText && this.searchText.length > 0) {
        query = `${query}&text=${this.searchText}`;  
      }

      this.DiscountApi.find(query, this.pagination)
        .then(result => {
          this.discounts = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    download() {
      let query = "isDeleted=false";
      if (this.searchText && this.searchText.length > 0) {
        query = `${query}&text=${this.searchText}`;  
      }

      this.DiscountApi.download(query)
    }

    create() {
      this.$state.go(this.posgram.config.states.DISCOUNT_DETAIL);      
    }

    view(category) {
      this.$state.go(this.posgram.config.states.DISCOUNT_DETAIL, {id: category._id});      
    }

    delete(discount) {
      this.DialogService.confirm("Do you want to delete?")
        .then(confirmed => {
          if (!confirmed) return;
          this.DiscountApi.delete(discount._id)
            .then(discount => {
              toastr.success('Deleted succeeded');
              this.search();
            })
            .catch(err => {
              toastr.error(err.error);
            })
        })
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
