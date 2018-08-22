import BaseController from '../base-controller';
import PlaceDialog from '../place-dialog';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'PlaceApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, posgram, DialogService, PlaceApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.PlaceApi = PlaceApi;
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
      this.PlaceApi.find(query, this.pagination)
        .then(result => {
          this.places = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    create() {
      this.DialogService.open(PlaceDialog)
        .then(place => {
          if (!place) return;
          this.search();
        })
    }

    delete(place) {
      this.DialogService.confirm("Do you want to delete?")
        .then(confirmed => {
          if (!confirmed) return;
          this.PlaceApi.delete(place._id)
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
