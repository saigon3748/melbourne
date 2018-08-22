import BaseController from '../base-controller';
import PasswordDialog from '../password-dialog';

export default [
  '$rootScope', '$scope', '$state', '$stateParams', 'posgram', 'DialogService', 'PrinterApi',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $state, $stateParams, posgram, DialogService, PrinterApi) {
      super()
      this.$state = $state;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.PrinterApi = PrinterApi;
    }

    $onInit() {
      if (! this.$stateParams.id) return;

      this.PrinterApi.findById(this.$stateParams.id)
        .then(printer => {
          this.printer = printer;
        })
        .catch(err => {
          toastr.error(err.message);
        })
    }

    get title() {
      return this.$stateParams.id ? "Printer Detail" : "Create Printer";
    }

    save() {
      if (this.printer._id) {
        this.PrinterApi.update(this.printer._id ,this.printer)
          .then(printer => {
            toastr.success('Updated succeeded');
          })
          .catch(err => {
            toastr.error(err.error);
          })

        return;
      }

      this.PrinterApi.create(this.printer)
        .then(printer => {
          toastr.success('Created succeeded');
          this.$state.go(this.posgram.config.states.PRINTER_LIST);
        })
        .catch(err => {
          toastr.error(err.error);
        })
    }

    cancel() {
      this.DialogService.confirm("Do you want to discard change?")
        .then(confirmed => {
          if (!confirmed) return;
          this.$state.go(this.posgram.config.states.PRINTER_LIST);
        })
    }
  }
]