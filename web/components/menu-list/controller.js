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
      let query = "isDeleted=false";
      if (this.searchText && this.searchText.length > 0) {
        query = `${query}&text=${this.searchText}`;  
      }

      this.MenuApi.find(query, this.pagination)
        .then(result => {
          this.menus = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    download() {
      let query = "isDeleted=false";
      if (this.searchText && this.searchText.length > 0) {
        query = `${query}&text=${this.searchText}`;  
      }

      this.MenuApi.download(query)
    }

    create() {
      this.$state.go(this.posgram.config.states.MENU_DETAIL);      
    }

    view(menu) {
      this.$state.go(this.posgram.config.states.MENU_DETAIL, {id: menu._id});      
    }
        
    delete(menu) {
      this.DialogService.confirm("Do you want to delete?")
        .then(confirmed => {
          if (!confirmed) return;
          this.MenuApi.delete(menu._id)
            .then(menu => {
              toastr.success('Deleted succeeded');
              this.search();
            })
            .catch(err => {
              toastr.error(err.error);
            })
        })
    }

    paging(page) {
      this.pagination.page = page;
      this.search();
    }
  }
]
