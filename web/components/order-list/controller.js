import BaseController from '../base-controller';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'OrderApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, posgram, DialogService, OrderApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.OrderApi = OrderApi;
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
      this.OrderApi.find(query, this.pagination)
        .then(result => {
          this.orders = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    download() {
      let query = this.searchText ? `text=${this.searchText}` : null;
      this.OrderApi.download(query)
    }

    create() {
      this.$state.go(this.posgram.config.states.ORDER_DETAIL);      
    }

    view(order) {
      this.$state.go(this.posgram.config.states.ORDER_DETAIL, {id: order._id});      
    }
    
    paging(page) {
      this.pagination.page = page;
      this.search();
    }
  }
]
