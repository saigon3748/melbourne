import BaseController from '../base-controller';
import CategoryDialog from '../category-dialog';

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
      this.search();
    }

    search() {
      this.CategoryApi.find()
        .then(result => {
          this.categories = result;
        })
    }

    create() {
      let inputs = {
        category: null
      };

      this.DialogService.open(CategoryDialog, inputs)
        .then(category => {
          if (!category) return;
          this.search();
        })      
    }

    edit(category) {
      let inputs = {
        category: _.clone(category)
      };

      this.DialogService.open(CategoryDialog, inputs)
        .then(category => {
          if (!category) return;
          this.search();
        })      
    }

    delete(category) {
      this.DialogService.confirm("Do you want to delete?")
        .then(confirmed => {
          if (!confirmed) return;
          this.CategoryApi.delete(category._id)
            .then(result => {
              this.search();              
              toastr.success('Deleted successfully');
            })
            .catch(err => {
              toastr.error('Deleted failed');
            })          
        })
    }

    getParent(category) {
      let parent = _.find(this.categories, item => {
        return item._id === category.parent;
      })
      return parent ? parent.name : "";
    }
  }
]
