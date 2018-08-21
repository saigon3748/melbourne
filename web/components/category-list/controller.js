import BaseController from '../base-controller';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'CategoryApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, posgram, DialogService, CategoryApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.CategoryApi = CategoryApi;
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
      this.CategoryApi.find(query, this.pagination)
        .then(result => {
          this.categories = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    download() {
      let query = this.searchText ? `text=${this.searchText}` : null;
      this.CategoryApi.download(query)
    }

    create() {
      this.$state.go(this.posgram.config.states.CATEGORY_DETAIL);      
    }

    view(category) {
      this.$state.go(this.posgram.config.states.CATEGORY_DETAIL, {id: category._id});      
    }

    getStatus(user) {
      return user.isArchived ? "Archived" : null;
    }

    paging(page) {
      this.pagination.page = page;
      this.search();
    }
  }
]
