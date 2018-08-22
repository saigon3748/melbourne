import BaseController from '../base-controller';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'PrinterApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, posgram, DialogService, PrinterApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.PrinterApi = PrinterApi;
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
      this.PrinterApi.find(query, this.pagination)
        .then(result => {
          this.printers = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    create() {
      this.$state.go(this.posgram.config.states.PRINTER_DETAIL);      
    }

    view(printer) {
      this.$state.go(this.posgram.config.states.PRINTER_DETAIL, {id: printer._id});      
    }

    paging(page) {
      this.pagination.page = page;
      this.search();
    }
  }
]
