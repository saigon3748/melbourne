import BaseController from '../base-controller';

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
      let query = "isDeleted=false";
      if (this.searchText && this.searchText.length > 0) {
        query = `${query}&text=${this.searchText}`;  
      }

      this.UserApi.find(query, this.pagination)
        .then(result => {
          this.users = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    download() {
      let query = "isDeleted=false";
      if (this.searchText && this.searchText.length > 0) {
        query = `${query}&text=${this.searchText}`;  
      }

      this.UserApi.download(query)
    }

    delete(user) {
      this.DialogService.confirm("Do you want to delete?")
        .then(confirmed => {
          if (!confirmed) return;
          this.UserApi.delete(user._id)
            .then(user => {
              toastr.success('Deleted succeeded');
              this.search();
            })
            .catch(err => {
              toastr.error(err.error);
            })
        })
    }

    create(user) {
      this.$state.go(this.posgram.config.states.USER_DETAIL);      
    }

    view(user) {
      this.$state.go(this.posgram.config.states.USER_DETAIL, {id: user._id});      
    }

    getRole(user) {
      if (user.isAdmin) return "Admin";
      if (user.isManager) return "Manager";
      return "Staff";
    }

    paging(page) {
      this.pagination.page = page;
      this.search();
    }
  }
]
