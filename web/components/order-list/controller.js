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
      let query = "isDeleted=false&isArchived=false";
      if (this.searchText && this.searchText.length > 0) {
        query = `${query}&text=${this.searchText}`;  
      }

      this.OrderApi.find(query, this.pagination)
        .then(result => {
          this.orders = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    download() {
      let query = "isDeleted=false&isArchived=false";
      if (this.searchText && this.searchText.length > 0) {
        query = `${query}&text=${this.searchText}`;  
      }

      this.OrderApi.download(query)
    }

    archive(order) {
      this.DialogService.confirm("Do you want to archive?")
        .then(confirmed => {
          if (!confirmed) return;
          this.OrderApi.markArchived(order._id)
            .then(order => {
              toastr.success('Archived succeeded');
              this.search();
            })
            .catch(err => {
              toastr.error(err.error);
            })
        })
    }

    delete(order) {
      this.DialogService.confirm("Do you want to delete?")
        .then(confirmed => {
          if (!confirmed) return;
          this.OrderApi.markDeleted(order._id)
            .then(order => {
              toastr.success('Deleted succeeded');
              this.search();
            })
            .catch(err => {
              toastr.error(err.error);
            })
        })
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
