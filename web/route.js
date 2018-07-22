export default [
  '$stateProvider', '$locationProvider', 'posgram', 
  function ($stateProvider, $locationProvider, posgram) {
    $stateProvider
      .state(posgram.config.states.HOME, {
        url: '^',
        template: '<pos-dashboard/>'
      })
      .state(posgram.config.states.LOGIN, {
        url: '/login',
        template: '<pos-login/>'
      })
      .state(posgram.config.states.DASHBOARD, {
        url: '/dasboard',
        template: '<pos-dashboard/>'
      })
      .state(posgram.config.states.TENANT_LIST, {
        url: '/tenants',
        template: '<pos-tenant-list/>'
      })
      .state(posgram.config.states.TENANT_DETAIL, {
        url: '/shop',
        template: '<pos-tenant-detail/>'
      })
      .state(posgram.config.states.CART, {
        url: '/cart',
        template: '<pos-cart/>'
      })
      .state(posgram.config.states.ORDER_LIST, {
        url: '/orders',
        template: '<pos-order-list/>'
      })
      .state(posgram.config.states.ORDER_DETAIL, {
        url: '/orders/:id',
        template: '<pos-order-detail/>'
      })
      .state(posgram.config.states.MENU_LIST, {
        url: '/menu',
        template: '<pos-menu-list/>'
      })
      .state(posgram.config.states.CATEGORY_LIST, {
        url: '/category',
        template: '<pos-category-list/>'
      })      
  }
]