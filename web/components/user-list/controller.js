import BaseController from '../base-controller';
import UserDialog from '../user-dialog';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'UserApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, posgram, DialogService, UserApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.UserApi = UserApi;
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
      this.UserApi.find(query, this.pagination)
        .then(result => {
          this.users = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    create() {
      let inputs = {
        user: null
      };

      this.DialogService.open(UserDialog, inputs)
        .then(user => {
          if (!user) return;
          this.users.push(user);
        })      
    }

    edit(user) {
      let inputs = {
        user: _.clone(user)
      };

      this.DialogService.open(UserDialog, inputs)
        .then(user => {
          if (!user) return;
          let item = _.find(this.users, item => {
            return item._id === user._id;
          })
          if (item) _.extend(item, user);
        })      
    }

    getRole(user) {
      if (user.isAdmin) return "Admin";
      if (user.isManager) return "Manager";
      return "Staff";
    }

    getStatus(user) {
      if (user.isLocked) return "Locked";
      return null;
    }
  }
]
