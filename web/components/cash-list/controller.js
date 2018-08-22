import BaseController from '../base-controller';
import CashDialog from '../cash-dialog';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'CashApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, posgram, DialogService, CashApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.CashApi = CashApi;
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
      this.CashApi.find(query, this.pagination)
        .then(result => {
          this.cashes = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    create() {
      this.DialogService.open(CashDialog)
        .then(cash => {
          if (!cash) return;
          this.search();
        })
    }

    delete(cash) {
      this.DialogService.confirm("Do you want to delete?")
        .then(confirmed => {
          if (!confirmed) return;
          this.CashApi.delete(cash._id)
            .then(result => {
              toastr.success('Deleted succeeded');
              this.search();
            })
        })
    }

    paging(page) {
      this.pagination.page = page;
      this.search();
    }
  }
]
