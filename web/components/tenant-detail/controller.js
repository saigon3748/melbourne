import BaseController from '../base-controller';
import UserDetailDailog from '../user-detail';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, posgram, DialogService) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.posgram = posgram;
      this.DialogService = DialogService;
    }

    $onInit() {
      this.selectedTab = 'users';
    }

    selectTab(tab) {
      this.selectedTab = tab;
    }

    isSelectedTab(tab) {
      return this.selectedTab === tab;
    }

    create() {
      let inputs = {
        user: null
      };

      this.DialogService.open(UserDetailDailog, inputs);
    }

    edit(user) {
      let inputs = {
        user: user
      };

      this.DialogService.open(UserDetailDailog, inputs);
    }
  }
]
