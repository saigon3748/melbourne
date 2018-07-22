import BaseController from '../base-controller';
import MenuDialog from '../menu-dialog';

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

    create() {
      let inputs = {
        menu: null
      };

      this.DialogService.open(MenuDialog, inputs)
        .then(menu => {
          if (!menu) return;
          this.menus.push(menu);
        })      
    }

    edit(menu) {
      let inputs = {
        menu: _.clone(menu)
      };

      this.DialogService.open(MenuDialog, inputs)
        .then(menu => {
          if (!menu) return;
          let item = _.find(this.menus, item => {
            return item._id === menu._id;
          })
          if (item) _.extend(item, menu);
        })      
    }

    getTags(menu) {
      if (!menu.tags) return null;
      return menu.tags.reduce((value, item) => `${value}, ${item}`);
    }

    getStatus(menu) {
      if (menu.isLocked) return "Locked";
      return null;
    }
  }
]
