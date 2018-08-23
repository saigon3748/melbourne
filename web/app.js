import _ from 'lodash';
import toastr from 'toastr';
import config from './config';
import route from './route';
import app from './components/app';
import login from './components/login';
import avatar from './components/avatar';
import sidebar from './components/sidebar';
import dashboard from './components/dashboard';
import analytics from './components/analytics';
import archives from './components/archives';
import trash from './components/trash';
import account from './components/account';
import tenantList from './components/tenant-list';
import tenantDetail from './components/tenant-detail';
import orderList from './components/order-list';
import orderDetail from './components/order-detail';
import menuList from './components/menu-list';
import menuDetail from './components/menu-detail';
import categoryList from './components/category-list';
import categoryDetail from './components/category-detail';
import discountList from './components/discount-list';
import discountDetail from './components/discount-detail';
import printerList from './components/printer-list';
import printerDetail from './components/printer-detail';
import cashList from './components/cash-list';
import placeList from './components/place-list';
import userList from './components/user-list';
import userDetail from './components/user-detail';
import authService from './services/auth-service';
import dialogService from './services/dialog-service';
import websocketService from './services/websocket-service';
import authApi from './api/auth-api';
import tenantApi from './api/tenant-api';
import userApi from './api/user-api';
import menuApi from './api/menu-api';
import categoryApi from './api/category-api';
import discountApi from './api/discount-api';
import orderApi from './api/order-api';
import printerApi from './api/printer-api';
import cashApi from './api/cash-api';
import placeApi from './api/place-api';

window.toastr = toastr;
window._ = _;

angular
  .module('posgram', [ 'ui.router', 'ui.bootstrap', 'angular-jwt', 'ngFileUpload' ])
  .component('posApp', app)  
  .component('posLogin', login)  
  .component('posAvatar', avatar)  
  .component('posSidebar', sidebar)
  .component('posDashboard', dashboard)
  .component('posAnalytics', analytics)
  .component('posArchives', archives)
  .component('posTrash', trash)
  .component('posAccount', account)
  .component('posTenantList', tenantList)
  .component('posTenantDetail', tenantDetail)
  .component('posOrderList', orderList)
  .component('posOrderDetail', orderDetail)
  .component('posMenuList', menuList)
  .component('posMenuDetail', menuDetail)
  .component('posCategoryList', categoryList)
  .component('posCategoryDetail', categoryDetail)
  .component('posDiscountList', discountList)
  .component('posDiscountDetail', discountDetail)
  .component('posUserList', userList)
  .component('posUserDetail', userDetail)
  .component('posPrinterList', printerList)
  .component('posPrinterDetail', printerDetail)
  .component('posCashList', cashList)
  .component('posPlaceList', placeList)
  .service('AuthService', authService)
  .service('DialogService', dialogService)
  .service('WebsocketService', websocketService)
  .service('AuthApi', authApi)
  .service('TenantApi', tenantApi)
  .service('UserApi', userApi)
  .service('MenuApi', menuApi)
  .service('CategoryApi', categoryApi)
  .service('DiscountApi', discountApi)
  .service('OrderApi', orderApi)  
  .service('PrinterApi', printerApi)  
  .service('CashApi', cashApi)  
  .service('PlaceApi', placeApi)  
  .factory("fileReader", function($q, $log) {
    var onLoad = function(reader, deferred, scope) {
      return function() {
        scope.$apply(function() {
          deferred.resolve(reader.result);
        });
      };
    };

    var onError = function(reader, deferred, scope) {
      return function() {
        scope.$apply(function() {
          deferred.reject(reader.result);
        });
      };
    };

    var onProgress = function(reader, scope) {
      return function(event) {
        scope.$broadcast("fileProgress", {
          total: event.total,
          loaded: event.loaded
        });
      };
    };

    var getReader = function(deferred, scope) {
      var reader = new FileReader();
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      reader.onprogress = onProgress(reader, scope);
      return reader;
    };

    var readAsDataURL = function(file, scope) {
      var deferred = $q.defer();

      var reader = getReader(deferred, scope);
      reader.readAsDataURL(file);

      return deferred.promise;
    };

    return {
      readAsDataUrl: readAsDataURL
    };
  })   
  .directive("ngFileSelect", function(fileReader, $timeout) {
    return {
      scope: {
        ngModel: '='
      },
      link: function($scope, el) {
        function getFile(file) {
          fileReader.readAsDataUrl(file, $scope)
            .then(function(result) {
              $timeout(function() {
                $scope.ngModel = result;
              });
            });
        }

        el.bind("change", function(e) {
          var file = (e.srcElement || e.target).files[0];
          getFile(file);
        });
      }
    };
  }) 
  .constant('posgram', { config: config })
  .config(route)
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }])
  .config(['$httpProvider', 'posgram', 'jwtInterceptorProvider', function ($httpProvider, posgram, jwtInterceptorProvider) {
      jwtInterceptorProvider.authPrefix = 'JWT ';
      jwtInterceptorProvider.tokenGetter = function () {
        return window.localStorage.getItem('token');
      }

      $httpProvider.interceptors.push('jwtInterceptor');
    }
  ])
  .run(['$rootScope', '$window', '$state', '$timeout', 'posgram',
    function ($rootScope, $window, $state, $timeout, posgram) {
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $window.scrollTo(0, 0);
      });

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (!$rootScope.isAuthenticated && toState.name != "Login") {
          event.preventDefault();
          $state.go(posgram.config.states.LOGIN);
        }
      });
    }
  ]);

angular.element(document).ready(function () {
  angular.bootstrap(document, ['posgram']);
});

