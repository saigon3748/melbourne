import config from './config';
import route from './route';
import app from './components/app';
import login from './components/login';
import sidebar from './components/sidebar';
import dashboard from './components/dashboard';
import tenantList from './components/tenant-list';
import tenantDetail from './components/tenant-detail';
import cart from './components/cart';
import orderList from './components/order-list';
import orderDetail from './components/order-detail';
import menuList from './components/menu-list';
import categoryList from './components/category-list';
import userList from './components/user-list';
import authService from './services/auth-service';
import dialogService from './services/dialog-service';
import websocketService from './services/websocket-service';
import authApi from './api/auth-api';
import tenantApi from './api/tenant-api';
import userApi from './api/user-api';
import menuApi from './api/menu-api';
import categoryApi from './api/category-api';
import orderApi from './api/order-api';

angular
  .module('posgram', [ 'ui.router', 'ui.bootstrap' ])
  .component('posApp', app)  
  .component('posLogin', login)  
  .component('posSidebar', sidebar)
  .component('posDashboard', dashboard)
  .component('posTenantList', tenantList)
  .component('posTenantDetail', tenantDetail)
  .component('posCart', cart)
  .component('posOrderList', orderList)
  .component('posOrderDetail', orderDetail)
  .component('posMenuList', menuList)
  .component('posCategoryList', categoryList)
  .component('posUserList', userList)
  .service('AuthService', authService)
  .service('DialogService', dialogService)
  .service('WebsocketService', websocketService)
  .service('AuthApi', authApi)
  .service('TenantApi', tenantApi)
  .service('UserApi', userApi)
  .service('MenuApi', menuApi)
  .service('CategoryApi', categoryApi)
  .service('OrderApi', orderApi)  
  .constant('posgram', { config: config })
  .config(route)
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
  }])
  // .config(['$httpProvider', 'jwtInterceptorProvider', 
  //   function ($httpProvider, jwtInterceptorProvider) {
  //     jwtInterceptorProvider.authPrefix = 'JWT ';
  //     jwtInterceptorProvider.tokenGetter = function () {
  //       return window.localStorage.getItem('token');
  //     }

  //     $httpProvider.interceptors.push('jwtInterceptor');
  //   }
  // ])
  .run(['$rootScope', '$window', '$state', '$timeout', 'posgram', 'AuthService',
    function ($rootScope, $window, $state, $timeout, posgram, AuthService) {
      $rootScope.global = {};      

      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $window.scrollTo(0, 0);
      });

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (!AuthService.isAuthenticated && toState.name != "Login") {
          event.preventDefault();
          $state.go(posgram.config.states.LOGIN);
        }
      });
    }
  ]);

angular.element(document).ready(function () {
  angular.bootstrap(document, ['posgram']);
});

