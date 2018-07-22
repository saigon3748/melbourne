import BaseController from '../base-controller';
import ReceiptDialog from '../receipt-dialog';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'MenuApi', 'OrderApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, posgram, DialogService, MenuApi, OrderApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.posgram = posgram;
      this.DialogService = DialogService;
      this.MenuApi = MenuApi;
      this.OrderApi = OrderApi;
    }

    $onInit() {
      this.order = {
        subtotal: 0,
        discount: 0,
        tax: 0,
        total: 0,
        items: []
      }

      this.selectedTag = 'All';

      this.MenuApi.find()
        .then(result => {
          this.menus = result;
        })

      this.MenuApi.findTags()
        .then(result => {
          this.tags = result;
          this.tags.splice(0, 0, 'All')
        })
    }

    selectTag(tag) {
      this.selectedTag = tag;
    }

    isSelectedTag(tag) {
      return this.selectedTag === tag;
    }

    selectMenu(menu) {
      let item = _.find(this.order.items, item => {
        return item.name === menu.name;
      })

      if (item) {
        item.quantity++;
      } else {
        item = _.clone(menu);
        item.quantity = 1;
        this.order.items.push(item);
      }

      this.calculate();
    }

    isSelectedMenu(menu) {
      return _.some(this.order.items, item => {
        return item.name === menu.name;
      })
    }

    canShowMenu(menu) {
      if (!this.selectedTag || this.selectedTag === 'All') return true;
      return menu.tags.indexOf(this.selectedTag) >= 0;
    }

    increaseQuantity(item) {
      item.quantity++;
      this.calculate();
    }

    decreaseQuantity(item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.order.items = _.filter(this.order.items, menu => {
          return menu._id != item._id; 
        });
      }

      this.calculate();
    }

    calculate() {
      let subtotal = 0;
      let discount = 0;
      let total = 0;

      this.order.items.forEach(item => {
        item.subtotal = item.quantity * item.unitPrice;
        item.discount = 0;
        item.total = item.subtotal - item.discount;

        subtotal += item.subtotal;
        discount += item.discount;
        total += item.total;
      });

      this.order.subtotal = subtotal;
      this.order.discount = discount;
      this.order.tax = 0.11 * total;
      this.order.total = total + this.order.tax;
    }

    discard() {
      this.DialogService.confirm('Do you want to discard?')
        .then(result => {
          if (!result) return;
          this.order = {
            subtotal: 0,
            discount: 0,
            tax: 0,
            total: 0,
            items: []
          }

          this.selectedTag = 'All';
        })
    }

    confirm() {
      if (this.order.items.length === 0) {
        return toastr.error('Select items to confirm');
      }

      return this.OrderApi.create(this.order)
        .then(order => {
          toastr.success('Created successfully');
    
          let inputs = {
            order: _.clone(order)
          };

          this.DialogService.open(ReceiptDialog, inputs)
            .then(result => {
              this.order = {
                subtotal: 0,
                discount: 0,
                tax: 0,
                total: 0,
                items: []
              }

              this.selectedTag = 'All';
            })
        })
        .catch(err => {
          toastr.error(err.message);
        })      
    }
  }
]
