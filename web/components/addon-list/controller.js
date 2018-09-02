import BaseController from '../base-controller';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'AddonApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, posgram, DialogService, AddonApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.AddonApi = AddonApi;
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

      this.AddonApi.find(query, this.pagination)
        .then(result => {
          this.addons = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    download() {
      let query = "isDeleted=false";
      if (this.searchText && this.searchText.length > 0) {
        query = `${query}&text=${this.searchText}`;  
      }

      this.AddonApi.download(query)
    }

    create() {
      this.$state.go(this.posgram.config.states.ADDON_DETAIL);      
    }

    view(addon) {
      this.$state.go(this.posgram.config.states.ADDON_DETAIL, {id: addon._id});      
    }
    
    delete(addon) {
      this.DialogService.confirm("Do you want to delete?")
        .then(confirmed => {
          if (!confirmed) return;
          this.AddonApi.delete(addon._id)
            .then(addon => {
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
