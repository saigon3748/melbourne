import BaseController from '../base-controller';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'CookApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, posgram, DialogService, CookApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.CookApi = CookApi;
    }

    $onInit() {
      this.statuses = [ "Completed", "Incompleted" ];

      this.pagination = {
        page: 1,
        limit: 10
      };

      this.search();
    }

    search() {
      let query = "";
      if (this.searchText && this.searchText.length > 0) {
        query = `${query}&text=${this.searchText}`;  
      }

      if (this.searchStatus === "Completed") {
        query = `${query}&isCooked=true`;
      }

      if (this.searchStatus === "Incompleted") {
        query = `${query}&isCooked=false`;
      }

      this.CookApi.find(query, this.pagination)
        .then(result => {
          this.cooks = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    download() {
      let query = "";
      if (this.searchText && this.searchText.length > 0) {
        query = `${query}&text=${this.searchText}`;  
      }

      this.CookApi.download(query)
    }

    getItem(cook) {
      let item = `${cook.quantity} x ${cook.menuName}`;

      if (cook.addons && cook.addons.length > 0) {
        item += " ( ";
        cook.addons.forEach(addon => {
          item += `${addon.quantity} x ${addon.name}  `;
        })
        item += ") ";
      } else {
        item += "  ";
      }

      if (cook.note) {
        item += " - " + cook.note;
      }

      return item;
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
