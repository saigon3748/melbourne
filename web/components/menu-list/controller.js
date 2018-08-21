import BaseController from '../base-controller';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'MenuApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, posgram, DialogService, MenuApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.MenuApi = MenuApi;
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
      this.MenuApi.find(query, this.pagination)
        .then(result => {
          this.menus = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    download() {
      let query = this.searchText ? `text=${this.searchText}` : null;
      this.MenuApi.download(query)
    }

    create() {
      this.$state.go(this.posgram.config.states.MENU_DETAIL);      
    }

    view(menu) {
      this.$state.go(this.posgram.config.states.MENU_DETAIL, {id: menu._id});      
    }

    getStatus(menu) {
      return menu.isArchived ? "Archived" : null;
    }
    
    paging(page) {
      this.pagination.page = page;
      this.search();
    }
  }
]
