export default [
  '$stateProvider', '$locationProvider', 'posgram', 
  function ($stateProvider, $locationProvider, posgram) {
    $stateProvider
      .state(posgram.config.states.HOME, {
        url: '^',
        template: '<pos-login/>'
      })
      .state(posgram.config.states.LOGIN, {
        url: '/login',
        template: '<pos-login/>'
      })
      .state(posgram.config.states.DASHBOARD, {
        url: '/dasboard',
        template: '<pos-dashboard/>'
      })
      .state(posgram.config.states.ANALYTICS, {
        url: '/analytics',
        template: '<pos-analytics/>'
      })
      .state(posgram.config.states.ARCHIVES, {
        url: '/archives',
        template: '<pos-archives/>'
      })
      .state(posgram.config.states.TRASH, {
        url: '/trash',
        template: '<pos-trash/>'
      })
      .state(posgram.config.states.ACCOUNT, {
        url: '/account',
        template: '<pos-account/>'
      })
      .state(posgram.config.states.TENANT_LIST, {
        url: '/admin/shops',
        template: '<pos-tenant-list/>'
      })
      .state(posgram.config.states.TENANT_DETAIL, {
        url: '/admin/shop/:id',
        template: '<pos-tenant-detail/>'
      })
      .state(posgram.config.states.USER_LIST, {
        url: '/users',
        template: '<pos-user-list/>'
      })
      .state(posgram.config.states.USER_DETAIL, {
        url: '/users/:id',
        template: '<pos-user-detail/>'
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