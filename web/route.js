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
        url: '/shops',
        template: '<pos-tenant-list/>'
      })
      .state(posgram.config.states.TENANT_DETAIL, {
        url: '/shop/:id',
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
      .state(posgram.config.states.ORDER_LIST, {
        url: '/orders',
        template: '<pos-order-list/>'
      })
      .state(posgram.config.states.ORDER_DETAIL, {
        url: '/orders/:id',
        template: '<pos-order-detail/>'
      })
      .state(posgram.config.states.MENU_LIST, {
        url: '/menus',
        template: '<pos-menu-list/>'
      })
      .state(posgram.config.states.MENU_DETAIL, {
        url: '/menus/:id',
        template: '<pos-menu-detail/>'
      })
      .state(posgram.config.states.CATEGORY_LIST, {
        url: '/categories',
        template: '<pos-category-list/>'
      })      
      .state(posgram.config.states.CATEGORY_DETAIL, {
        url: '/categories/:id',
        template: '<pos-category-detail/>'
      })
      .state(posgram.config.states.DISCOUNT_LIST, {
        url: '/discounts',
        template: '<pos-discount-list/>'
      })      
      .state(posgram.config.states.DISCOUNT_DETAIL, {
        url: '/discounts/:id',
        template: '<pos-discount-detail/>'
      })
  }
]