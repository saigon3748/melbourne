export default {
  cors: false,
  api: 'http://localhost:8000/api',
  states: {
    HOME: 'Home',
    LOGIN: 'Login',
    DASHBOARD: 'Dashboard',
    ANALYTICS: 'Analytics',
    ARCHIVES: 'Archives',
    TRASH: 'Trash',
    ACCOUNT: 'Account',
    TENANT_LIST: 'TenantList',
    TENANT_DETAIL: 'TenantDetail',
    USER_LIST: 'UserList',
    USER_DETAIL: 'UserDetail',
    CART: 'Cart',
    ORDER_LIST: 'OrderList',
    ORDER_DETAIL: 'OrderDetail',
    MENU_LIST: 'MenuList',
    CATEGORY_DETAIL: 'CategoryDetail',
    CATEGORY_LIST: 'CategoryList',
    DISCOUNT_DETAIL: 'DiscountDetail',
    DISCOUNT_LIST: 'DiscountList'
  },
  actions: {
    VIEW: 'View',
    CREATE: 'Create',
    UPDATE: 'Update',
    DELETE: 'Delete'
  }
}