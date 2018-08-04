// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({19:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  api: 'http://localhost:8080/api',
  states: {
    HOME: 'Home',
    LOGIN: 'Login',
    DASHBOARD: 'Dashboard',
    TENANT_LIST: 'TenantList',
    TENANT_DETAIL: 'TenantDetail',
    CART: 'Cart',
    ORDER_LIST: 'OrderList',
    ORDER_DETAIL: 'OrderDetail',
    MENU_LIST: 'MenuList',
    CATEGORY_LIST: 'CategoryList'
  },
  actions: {
    VIEW: 'View',
    CREATE: 'Create',
    UPDATE: 'Update',
    DELETE: 'Delete'
  }
};
},{}],20:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ['$stateProvider', '$locationProvider', 'posgram', function ($stateProvider, $locationProvider, posgram) {
  $stateProvider.state(posgram.config.states.HOME, {
    url: '^',
    template: '<pos-login/>'
  }).state(posgram.config.states.LOGIN, {
    url: '/login',
    template: '<pos-login/>'
  }).state(posgram.config.states.DASHBOARD, {
    url: '/dasboard',
    template: '<pos-dashboard/>'
  }).state(posgram.config.states.TENANT_LIST, {
    url: '/tenants',
    template: '<pos-tenant-list/>'
  }).state(posgram.config.states.TENANT_DETAIL, {
    url: '/shop',
    template: '<pos-tenant-detail/>'
  }).state(posgram.config.states.CART, {
    url: '/cart',
    template: '<pos-cart/>'
  }).state(posgram.config.states.ORDER_LIST, {
    url: '/orders',
    template: '<pos-order-list/>'
  }).state(posgram.config.states.ORDER_DETAIL, {
    url: '/orders/:id',
    template: '<pos-order-detail/>'
  }).state(posgram.config.states.MENU_LIST, {
    url: '/menu',
    template: '<pos-menu-list/>'
  }).state(posgram.config.states.CATEGORY_LIST, {
    url: '/category',
    template: '<pos-category-list/>'
  });
}];
},{}],94:[function(require,module,exports) {

},{}],95:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = ['$rootScope', '$state', '$timeout', 'posgram', function () {
  function Controller($rootScope, $state, $timeout, posgram) {
    _classCallCheck(this, Controller);

    this.$rootScope = $rootScope;
    this.$state = $state;
    this.posgram = posgram;
  }

  _createClass(Controller, [{
    key: 'logout',
    value: function logout() {
      window.localStorage.removeItem('token');
      this.$rootScope.global.user = null;
      this.$rootScope.isLoggedIn = false;
      this.$state.go(this.posgram.config.states.LOGIN);
    }
  }, {
    key: 'isLoggedIn',
    get: function get() {
      return this.$rootScope.isLoggedIn;
    }
  }, {
    key: 'isSudo',
    get: function get() {
      return this.$rootScope.global.user.name === "sudo";
    }
  }, {
    key: 'loggedUser',
    get: function get() {
      return this.$rootScope.global.user;
    }
  }, {
    key: 'tenant',
    get: function get() {
      return this.$rootScope.global.user.tenant;
    }
  }]);

  return Controller;
}()];
},{}],65:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">\n  <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">\n    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 -55 200 60" version="1.1" style="width: 100px; height: 20px;">\n      <g fill="#FFFFFF">\n        <path d="M29.052-39.024C27.876-39.552 26.280-39.816 24.264-39.816C21.768-39.816 19.440-39.264 17.280-38.160C15.120-37.056 13.344-35.496 11.952-33.480L11.952-36.648C11.952-37.512 11.712-38.184 11.232-38.664C10.752-39.144 10.080-39.384 9.216-39.384C8.352-39.384 7.680-39.144 7.200-38.664C6.720-38.184 6.480-37.512 6.480-36.648L6.480-2.736C6.480-1.872 6.720-1.200 7.200-0.720C7.680-0.240 8.352 0 9.216 0C10.080 0 10.752-0.240 11.232-0.720C11.712-1.200 11.952-1.872 11.952-2.736L11.952-24.264C11.952-27.336 13.092-29.832 15.372-31.752C17.652-33.672 20.592-34.632 24.192-34.632C24.960-34.632 25.536-34.608 25.920-34.560C26.976-34.464 27.720-34.416 28.152-34.416C28.872-34.416 29.436-34.536 29.844-34.776C30.252-35.016 30.552-35.472 30.744-36.144C30.792-36.288 30.816-36.504 30.816-36.792C30.816-37.752 30.228-38.496 29.052-39.024Z"/>\n        <path d="M62.885-37.260C60.149-38.916 57.005-39.744 53.453-39.744C49.805-39.744 46.553-38.892 43.697-37.188C40.841-35.484 38.609-33.108 37.001-30.060C35.393-27.012 34.589-23.544 34.589-19.656C34.589-15.816 35.441-12.372 37.145-9.324C38.849-6.276 41.213-3.900 44.237-2.196C47.261-0.492 50.693 0.360 54.533 0.360C56.789 0.360 59.141-0.084 61.589-0.972C64.037-1.860 66.053-2.976 67.637-4.320C68.165-4.800 68.429-5.352 68.429-5.976C68.429-6.696 68.117-7.344 67.493-7.920C66.965-8.304 66.437-8.496 65.909-8.496C65.237-8.496 64.589-8.256 63.965-7.776C62.909-6.864 61.505-6.108 59.753-5.508C58.001-4.908 56.261-4.608 54.533-4.608C50.501-4.608 47.141-5.832 44.453-8.280C41.765-10.728 40.229-13.920 39.845-17.856L68.933-17.856C69.701-17.856 70.325-18.084 70.805-18.540C71.285-18.996 71.525-19.608 71.525-20.376C71.525-24.120 70.769-27.456 69.257-30.384C67.745-33.312 65.621-35.604 62.885-37.260ZM44.381-31.392C46.781-33.648 49.805-34.776 53.453-34.776C57.053-34.776 60.005-33.648 62.309-31.392C64.613-29.136 65.957-26.160 66.341-22.464L39.989-22.464C40.517-26.160 41.981-29.136 44.381-31.392Z"/>\n        <path d="M97.330-4.752C96.850-5.280 96.226-5.544 95.458-5.544L93.514-5.544C91.258-5.544 89.410-6.324 87.970-7.884C86.530-9.444 85.810-11.448 85.810-13.896L85.810-33.120L93.946-33.120C94.714-33.120 95.326-33.348 95.782-33.804C96.238-34.260 96.466-34.824 96.466-35.496C96.466-36.216 96.238-36.804 95.782-37.260C95.326-37.716 94.714-37.944 93.946-37.944L85.810-37.944L85.810-49.104C85.810-49.920 85.546-50.592 85.018-51.120C84.490-51.648 83.818-51.912 83.002-51.912C82.186-51.912 81.526-51.648 81.022-51.120C80.518-50.592 80.266-49.920 80.266-49.104L80.266-37.944L75.586-37.944C74.818-37.944 74.206-37.716 73.750-37.260C73.294-36.804 73.066-36.216 73.066-35.496C73.066-34.824 73.294-34.260 73.750-33.804C74.206-33.348 74.818-33.120 75.586-33.120L80.266-33.120L80.266-13.896C80.266-11.256 80.830-8.892 81.958-6.804C83.086-4.716 84.658-3.060 86.674-1.836C88.690-0.612 90.970 0 93.514 0L95.026 0C95.890 0 96.610-0.264 97.186-0.792C97.762-1.320 98.050-1.968 98.050-2.736C98.050-3.552 97.810-4.224 97.330-4.752Z"/>\n        <path d="M132.386-37.116C129.338-38.868 125.942-39.744 122.198-39.744C118.454-39.744 115.058-38.868 112.010-37.116C108.962-35.364 106.562-32.952 104.810-29.880C103.058-26.808 102.182-23.400 102.182-19.656C102.182-15.912 103.034-12.516 104.738-9.468C106.442-6.420 108.770-4.020 111.722-2.268C114.674-0.516 117.974 0.360 121.622 0.360C124.742 0.360 127.598-0.300 130.190-1.620C132.782-2.940 134.918-4.752 136.598-7.056L136.598-2.736C136.598-1.920 136.862-1.260 137.390-0.756C137.918-0.252 138.590 0 139.406 0C140.222 0 140.894-0.264 141.422-0.792C141.950-1.320 142.214-1.968 142.214-2.736L142.214-19.656C142.214-23.400 141.338-26.808 139.586-29.880C137.834-32.952 135.434-35.364 132.386-37.116ZM129.614-6.624C127.406-5.328 124.934-4.680 122.198-4.680C119.462-4.680 116.978-5.328 114.746-6.624C112.514-7.920 110.762-9.708 109.490-11.988C108.218-14.268 107.582-16.824 107.582-19.656C107.582-22.488 108.218-25.044 109.490-27.324C110.762-29.604 112.514-31.404 114.746-32.724C116.978-34.044 119.462-34.704 122.198-34.704C124.934-34.704 127.406-34.044 129.614-32.724C131.822-31.404 133.562-29.604 134.834-27.324C136.106-25.044 136.742-22.488 136.742-19.656C136.742-16.824 136.106-14.268 134.834-11.988C133.562-9.708 131.822-7.920 129.614-6.624Z"/>\n        <path d="M152.179-0.792C152.707-0.264 153.379 0 154.195 0C155.011 0 155.671-0.264 156.175-0.792C156.679-1.320 156.931-1.992 156.931-2.808L156.931-36.576C156.931-37.392 156.679-38.064 156.175-38.592C155.671-39.120 155.011-39.384 154.195-39.384C153.379-39.384 152.707-39.120 152.179-38.592C151.651-38.064 151.387-37.392 151.387-36.576L151.387-2.808C151.387-1.992 151.651-1.320 152.179-0.792ZM151.351-48.024C152.095-47.256 153.019-46.872 154.123-46.872C155.227-46.872 156.163-47.256 156.931-48.024C157.699-48.792 158.083-49.728 158.083-50.832C158.083-51.984 157.699-52.920 156.931-53.640C156.163-54.360 155.251-54.720 154.195-54.720C153.091-54.720 152.155-54.360 151.387-53.640C150.619-52.920 150.235-51.984 150.235-50.832C150.235-49.728 150.607-48.792 151.351-48.024Z"/>\n        <path d="M169.596-3.492C171.444-1.164 173.832 0 176.760 0L177.696 0C178.656 0 179.436-0.252 180.036-0.756C180.636-1.260 180.936-1.920 180.936-2.736C180.936-3.552 180.720-4.212 180.288-4.716C179.856-5.220 179.280-5.472 178.560-5.472L176.760-5.472C175.464-5.472 174.396-6.120 173.556-7.416C172.716-8.712 172.296-10.392 172.296-12.456L172.296-53.496C172.296-54.312 172.044-54.972 171.540-55.476C171.036-55.980 170.376-56.232 169.560-56.232C168.792-56.232 168.144-55.980 167.616-55.476C167.088-54.972 166.824-54.312 166.824-53.496L166.824-12.456C166.824-8.808 167.748-5.820 169.596-3.492Z"/>\n        <path d="M208.361-39.024C207.185-39.552 205.589-39.816 203.573-39.816C201.077-39.816 198.749-39.264 196.589-38.160C194.429-37.056 192.653-35.496 191.261-33.480L191.261-36.648C191.261-37.512 191.021-38.184 190.541-38.664C190.061-39.144 189.389-39.384 188.525-39.384C187.661-39.384 186.989-39.144 186.509-38.664C186.029-38.184 185.789-37.512 185.789-36.648L185.789-2.736C185.789-1.872 186.029-1.200 186.509-0.720C186.989-0.240 187.661 0 188.525 0C189.389 0 190.061-0.240 190.541-0.720C191.021-1.200 191.261-1.872 191.261-2.736L191.261-24.264C191.261-27.336 192.401-29.832 194.681-31.752C196.961-33.672 199.901-34.632 203.501-34.632C204.269-34.632 204.845-34.608 205.229-34.560C206.285-34.464 207.029-34.416 207.461-34.416C208.181-34.416 208.745-34.536 209.153-34.776C209.561-35.016 209.861-35.472 210.053-36.144C210.101-36.288 210.125-36.504 210.125-36.792C210.125-37.752 209.537-38.496 208.361-39.024Z"/>      \n      </g>\n    </svg>\n  </a>\n  <ul class="navbar-nav px-3">\n    <li class="nav-item text-nowrap">\n      <a class="nav-link" href="#">Sign out</a>\n    </li>\n  </ul>\n</nav>\n\n<div class="container-fluid">\n  <div ui-view></div>\n</div>\n\n';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":95}],96:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = ['$rootScope', '$state', '$timeout', 'posgram', 'AuthApi', 'DialogService', function () {
  function Controller($rootScope, $state, $timeout, posgram, AuthApi, DialogService) {
    _classCallCheck(this, Controller);

    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.posgram = posgram;
    this.AuthApi = AuthApi;
    this.DialogService = DialogService;
  }

  _createClass(Controller, [{
    key: 'login',
    value: function login() {
      this.DialogService.confirm('login ?');
      // alert('login')
      // this.$state.go(this.posgram.config.states.DASHBOARD);
      // this.AuthApi.login(this.username, this.password)
      //   .then(result => {
      //     if (!result.token) return toastr.error(result.error);

      //     window.localStorage.setItem('token', result.token);

      //     let payload = result.token.split('.')[1];
      //     payload = payload.replace('-', '+').replace('_', '/');
      //     payload = JSON.parse(window.atob(payload));

      //     this.$rootScope.global.user = payload;
      //     this.$rootScope.isLoggedIn = true;
      //     this.$state.go(this.posgram.config.states.HOME);
      //   })
    }
  }]);

  return Controller;
}()];
},{}],66:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<div class="container">\n  <div class="py-5 text-center">\n  </div>\n\n  <div class="row">\n    <div class="col-md-4"></div>\n    <div class="col-md-4">\n      <h4 class="mb-3">Sign in</h4>\n      <form class="needs-validation" novalidate>\n        <div class="mb-3">\n          <label for="username">Username</label>\n          <input type="text" class="form-control" id="username" required>\n          <div class="invalid-feedback">\n            Please enter username.\n          </div>\n        </div>\n        <div class="mb-3">\n          <label for="password">Password</label>\n          <input type="password" class="form-control" id="password" required>\n          <div class="invalid-feedback">\n            Please enter password.\n          </div>\n        </div>\n        <button class="btn btn-primary btn-lg btn-block" type="submit" ng-click="$ctrl.login()">Sign in</button>\n      </form>\n    </div>\n    <div class="col-md-4"></div>\n  </div>\n\n  <footer class="my-5 pt-5 text-muted text-center text-small">\n    <p class="mb-1">&copy; 2018 retailr</p>\n    <ul class="list-inline">\n      <li class="list-inline-item"><a href="#">Privacy</a></li>\n      <li class="list-inline-item"><a href="#">Terms</a></li>\n      <li class="list-inline-item"><a href="#">Support</a></li>\n    </ul>\n  </footer>\n</div>\n\n';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":96}],97:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = ['$rootScope', '$state', '$timeout', 'posgram', function () {
  function Controller($rootScope, $state, $timeout, posgram) {
    _classCallCheck(this, Controller);

    this.$rootScope = $rootScope;
    this.$state = $state;
    this.posgram = posgram;
    $timeout(function () {
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          datasets: [{
            data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false
              }
            }]
          },
          legend: {
            display: false
          }
        }
      });
    }, 0);
  }

  _createClass(Controller, [{
    key: 'logout',
    value: function logout() {
      window.localStorage.removeItem('token');
      this.$rootScope.global.user = null;
      this.$rootScope.isLoggedIn = false;
      this.$state.go(this.posgram.config.states.LOGIN);
    }
  }, {
    key: 'isLoggedIn',
    get: function get() {
      return this.$rootScope.isLoggedIn;
    }
  }, {
    key: 'isSudo',
    get: function get() {
      return this.$rootScope.global.user.name === "sudo";
    }
  }, {
    key: 'loggedUser',
    get: function get() {
      return this.$rootScope.global.user;
    }
  }, {
    key: 'tenant',
    get: function get() {
      return this.$rootScope.global.user.tenant;
    }
  }]);

  return Controller;
}()];
},{}],67:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<div class="row">\n  <nav class="col-md-2 d-none d-md-block bg-light sidebar">\n    <div class="sidebar-sticky">\n      <ul class="nav flex-column">\n        <li class="nav-item">\n          <a class="nav-link active" href="#">\n            <span data-feather="file"></span>\n            Orders\n          </a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" href="#">\n            <span data-feather="file"></span>\n            Analytics\n          </a>\n        </li>\n      </ul>\n\n      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">\n        <span>Settings</span>\n        <a class="d-flex align-items-center text-muted" href="#">\n          <span data-feather="plus-circle"></span>\n        </a>\n      </h6>\n      <ul class="nav flex-column mb-2">\n        <li class="nav-item">\n          <a class="nav-link" href="#">\n            <span data-feather="file"></span>\n            Account\n          </a>\n        </li>     \n        <li class="nav-item">\n          <a class="nav-link" href="#">\n            <span data-feather="file"></span>\n            Menu\n          </a>\n        </li>     \n        <li class="nav-item">\n          <a class="nav-link" href="#">\n            <span data-feather="file-text"></span>\n            Users\n          </a>\n        </li>\n      </ul>\n    </div>\n  </nav>\n\n  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">\n    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">\n      <h3>Dashboard</h3>\n      <div class="btn-toolbar mb-2 mb-md-0">\n        <div class="btn-group mr-2">\n          <button class="btn btn-sm btn-outline-secondary">Share</button>\n          <button class="btn btn-sm btn-outline-secondary">Export</button>\n        </div>\n        <button class="btn btn-sm btn-outline-secondary dropdown-toggle">\n          <span data-feather="calendar"></span>\n          This week\n        </button>\n      </div>\n    </div>\n\n    <canvas class="my-4" id="myChart" width="900" height="380"></canvas>\n\n    <h3>Section title</h3>\n    <div class="table-responsive">\n      <table class="table table-striped">\n        <thead>\n          <tr>\n            <th>#</th>\n            <th>Header</th>\n            <th>Header</th>\n            <th>Header</th>\n            <th>Header</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>1,001</td>\n            <td>Lorem</td>\n            <td>ipsum</td>\n            <td>dolor</td>\n            <td>sit</td>\n          </tr>\n          <tr>\n            <td>1,002</td>\n            <td>amet</td>\n            <td>consectetur</td>\n            <td>adipiscing</td>\n            <td>elit</td>\n          </tr>\n          <tr>\n            <td>1,003</td>\n            <td>Integer</td>\n            <td>nec</td>\n            <td>odio</td>\n            <td>Praesent</td>\n          </tr>\n          <tr>\n            <td>1,003</td>\n            <td>libero</td>\n            <td>Sed</td>\n            <td>cursus</td>\n            <td>ante</td>\n          </tr>\n          <tr>\n            <td>1,004</td>\n            <td>dapibus</td>\n            <td>diam</td>\n            <td>Sed</td>\n            <td>nisi</td>\n          </tr>\n          <tr>\n            <td>1,005</td>\n            <td>Nulla</td>\n            <td>quis</td>\n            <td>sem</td>\n            <td>at</td>\n          </tr>\n          <tr>\n            <td>1,006</td>\n            <td>nibh</td>\n            <td>elementum</td>\n            <td>imperdiet</td>\n            <td>Duis</td>\n          </tr>\n          <tr>\n            <td>1,007</td>\n            <td>sagittis</td>\n            <td>ipsum</td>\n            <td>Praesent</td>\n            <td>mauris</td>\n          </tr>\n          <tr>\n            <td>1,008</td>\n            <td>Fusce</td>\n            <td>nec</td>\n            <td>tellus</td>\n            <td>sed</td>\n          </tr>\n          <tr>\n            <td>1,009</td>\n            <td>augue</td>\n            <td>semper</td>\n            <td>porta</td>\n            <td>Mauris</td>\n          </tr>\n          <tr>\n            <td>1,010</td>\n            <td>massa</td>\n            <td>Vestibulum</td>\n            <td>lacinia</td>\n            <td>arcu</td>\n          </tr>\n          <tr>\n            <td>1,011</td>\n            <td>eget</td>\n            <td>nulla</td>\n            <td>Class</td>\n            <td>aptent</td>\n          </tr>\n          <tr>\n            <td>1,012</td>\n            <td>taciti</td>\n            <td>sociosqu</td>\n            <td>ad</td>\n            <td>litora</td>\n          </tr>\n          <tr>\n            <td>1,013</td>\n            <td>torquent</td>\n            <td>per</td>\n            <td>conubia</td>\n            <td>nostra</td>\n          </tr>\n          <tr>\n            <td>1,014</td>\n            <td>per</td>\n            <td>inceptos</td>\n            <td>himenaeos</td>\n            <td>Curabitur</td>\n          </tr>\n          <tr>\n            <td>1,015</td>\n            <td>sodales</td>\n            <td>ligula</td>\n            <td>in</td>\n            <td>libero</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </main>\n</div>\n\n';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":97}],110:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseController = function BaseController() {
  _classCallCheck(this, BaseController);
};

exports.default = BaseController;
},{}],114:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$scope', '$http', 'posgram', '$uibModalInstance', 'TenantApi', 'UserApi', 'tenant', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $scope, $http, posgram, $uibModalInstance, TenantApi, UserApi, tenant) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$http = $http;
    _this.$scope = $scope;
    _this.$uibModalInstance = $uibModalInstance;
    _this.TenantApi = TenantApi;
    _this.UserApi = UserApi;
    _this.tenant = tenant || {};
    _this.user = {};
    return _this;
  }

  _createClass(Controller, [{
    key: '$onInit',
    value: function $onInit() {
      var _this2 = this;

      if (this.tenant._id) {
        this.UserApi.find('tenant._id=' + this.tenant._id).then(function (users) {
          _this2.users = users.docs || [];
        }).catch(function (err) {
          toastr.error(err.data.message);
        });
      }
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.$uibModalInstance.close(false);
    }
  }, {
    key: 'save',
    value: function save() {
      var _this3 = this;

      if (!this.validate()) return;

      if (!this.tenant._id) {
        var _data = {
          tenant: this.tenant,
          user: this.user
        };

        return this.TenantApi.create(_data).then(function (tenant) {
          _this3.$uibModalInstance.close(tenant);
        }).catch(function (err) {
          toastr.error(err.message);
        });
      }

      var data = {
        tenant: this.tenant
      };

      return this.TenantApi.update(this.tenant._id, this.tenant).then(function (result) {
        _this3.$uibModalInstance.close(_this3.tenant);
      }).catch(function (err) {
        toastr.error(err.message);
      });
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (!this.tenant.name) {
        toastr.error("Shop name is required");
        return false;
      }

      if (!this.tenant.code) {
        toastr.error("Shop code is required");
        return false;
      }

      if (!this.tenant._id) {
        if (!this.user.name) {
          toastr.error("Admin name is required");
          return false;
        }

        if (!this.user.username) {
          toastr.error("Login ID is required");
          return false;
        }

        if (!this.user.password) {
          toastr.error("Password is required");
          return false;
        }
      }

      return true;
    }
  }, {
    key: 'getUserRole',
    value: function getUserRole(user) {
      if (user.isAdmin) return "Admin";
      if (user.isManager) return "Manager";
      return "Staff";
    }
  }, {
    key: 'lockUser',
    value: function lockUser(user) {
      var data = _.clone(user);
      data.isLocked = true;

      return this.UserApi.update(data._id, data).then(function (result) {
        user.isLocked = true;
      }).catch(function (err) {
        toastr.error(err.message);
      });
    }
  }, {
    key: 'unlockUser',
    value: function unlockUser(user) {
      var data = _.clone(user);
      data.isLocked = false;

      return this.UserApi.update(data._id, data).then(function (result) {
        user.isLocked = false;
      }).catch(function (err) {
        toastr.error(err.message);
      });
    }
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110}],111:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<div class="modal-header">\n  <h4 ng-if="!$ctrl.tenant._id" class="modal-title">Create shop</h4>\n  <h4 ng-if="$ctrl.tenant._id" class="modal-title">Edit shop</h4>\n</div>\n<div class="modal-body">\n  <form class="form-horizontal" role="form" novalidate name="editCodForm">\n    <div class="form-group">\n      <label class="control-label col-sm-3">Shop Name</label>\n      <div class="col-sm-9">\n        <input class="form-control" ng-model="$ctrl.tenant.name" autofocus/>\n      </div>\n    </div>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Shop Code</label>\n      <div class="col-sm-9">\n        <input class="form-control uppercase" ng-model="$ctrl.tenant.code" />\n      </div>\n    </div>\n    <div ng-if="$ctrl.tenant._id" class="form-group">\n      <label class="control-label col-sm-3">Status</label>\n      <div class="col-sm-9">\n        <div class="checkbox">\n          <label><input type="checkbox" ng-model="$ctrl.tenant.isLocked"/>Locked</label>\n        </div>        \n      </div>\n    </div>    \n    <hr/>\n    <div ng-if="!$ctrl.tenant._id" class="form-group">\n      <label class="control-label col-sm-3">Admin Name</label>\n      <div class="col-sm-9">\n        <input class="form-control" ng-model="$ctrl.user.name" />\n      </div>\n    </div>\n    <div ng-if="!$ctrl.tenant._id" class="form-group">\n      <label class="control-label col-sm-3">Login ID</label>\n      <div class="col-sm-9">\n        <input class="form-control lowercase" ng-model="$ctrl.user.username" />\n      </div>\n    </div>\n    <div ng-if="!$ctrl.tenant._id" class="form-group">\n      <label class="control-label col-sm-3">Password</label>\n      <div class="col-sm-9">\n        <input class="form-control" ng-model="$ctrl.user.password" />\n      </div>\n    </div>\n    <div ng-if="$ctrl.tenant._id" class="form-group">\n      <div class="col-sm-12">\n        <table class="table"> \n          <thead> \n            <tr> \n              <th>User Name</th> \n              <th>Login ID</th> \n              <th>Role</th> \n              <th></th>\n            </tr> \n          </thead> \n          <tbody> \n            <tr ng-repeat="user in $ctrl.users"> \n              <td>{{user.name}}</td> \n              <td>{{user.username}}</td> \n              <td>{{$ctrl.getUserRole(user)}}</td> \n              <td>\n                <a ng-if="!user.isLocked" href="javascript:;" ng-click="$ctrl.lockUser(user)" class="btn btn-danger btn-xs" role="button">\n                  <span aria-hidden="true"></span> Lock\n                </a>\n                <a ng-if="user.isLocked" href="javascript:;" ng-click="$ctrl.unlockUser(user)" class="btn btn-success btn-xs" role="button">\n                  <span aria-hidden="true"></span> Unlock\n                </a>\n              </td>\n            </tr>\n          </tbody> \n        </table>        \n      </div>\n    </div>    \n  </form>\n</div>\n<div class="modal-footer">\n  <button type="button" ng-click="$ctrl.cancel()" class="btn btn-default" data-dismiss="modal">Cancel</button>\n  <button type="button" ng-click="$ctrl.save()" class="btn btn-primary" data-dismiss="modal">Save</button>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":114}],98:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _tenantDialog = require('../tenant-dialog');

var _tenantDialog2 = _interopRequireDefault(_tenantDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'TenantApi', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $state, $timeout, $sce, posgram, DialogService, TenantApi) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$rootScope = $rootScope;
    _this.$state = $state;
    _this.$timeout = $timeout;
    _this.$sce = $sce;
    _this.posgram = posgram;
    _this.DialogService = DialogService;
    _this.TenantApi = TenantApi;
    return _this;
  }

  _createClass(Controller, [{
    key: '$onInit',
    value: function $onInit() {
      this.pagination = {
        page: 1,
        limit: 10
      };

      this.search();
    }
  }, {
    key: 'search',
    value: function search() {
      var _this2 = this;

      var query = this.searchText ? 'text=' + this.searchText : null;
      this.TenantApi.find(query, this.pagination).then(function (result) {
        _this2.tenants = result.docs || [];
        _this2.pagination = _.extend(_this2.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
      });
    }
  }, {
    key: 'create',
    value: function create() {
      var _this3 = this;

      var inputs = {
        tenant: null
      };

      this.DialogService.open(_tenantDialog2.default, inputs).then(function (tenant) {
        if (!tenant) return;
        _this3.tenants.push(tenant);
      });
    }
  }, {
    key: 'edit',
    value: function edit(tenant) {
      var _this4 = this;

      var inputs = {
        tenant: _.clone(tenant)
      };

      this.DialogService.open(_tenantDialog2.default, inputs).then(function (tenant) {
        if (!tenant) return;
        var item = _.find(_this4.tenants, function (item) {
          return item._id === tenant._id;
        });
        if (item) _.extend(item, tenant);
      });
    }
  }, {
    key: 'getTenantStatus',
    value: function getTenantStatus(tenant) {
      if (tenant.isLocked) return "Locked";
      return "";
    }
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110,"../tenant-dialog":111}],68:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<ol class="breadcrumb">\n  <li><a href="#">Dashboard</a></li>\n  <li class="active">Shops</li>\n  <li class="pull-right">\n    <a href="javascript:;" ng-click="$ctrl.create()" class="btn btn-primary btn-xs" role="button">\n      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Create\n    </a>\n  </li>\n</ol>\n<div class="row">\n  <div class="col-sm-10">\n    <input ng-model="$ctrl.searchText" type="text" class="form-control" placeholder="Search for...">\n  </div>\n  <div class="col-sm-2">\n    <button ng-click="$ctrl.search()" class="btn btn-default" type="button">\n      <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Search\n    </button>\n  </div>\n</div>\n<br/>\n<table class="table"> \n  <thead> \n    <tr> \n      <th>Shop Name</th>\n      <th>Shop Code</th>\n      <th>Status</th>\n      <th>\n        <a href="javascript:;" ng-click="$ctrl.create()" class="btn btn-primary btn-xs" role="button">\n          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Create\n        </a>\n      </th>      \n    </tr> \n  </thead> \n  <tbody> \n    <tr ng-repeat="tenant in $ctrl.tenants"> \n      <td>{{tenant.name}}</td> \n      <td>{{tenant.code}}</td>\n      <td>{{$ctrl.getTenantStatus(tenant)}}</td>\n      <td>\n        <a href="javascript:;" ng-click="$ctrl.edit(tenant)" class="btn btn-default btn-xs" role="button">\n          <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit\n        </a>        \n      </td>      \n    </tr>\n  </tbody> \n</table>\n<div class="clearfix">\n  <div class="pull-left pagination-info">\n    <p>{{$ctrl.pagination.total}} records</p>\n  </div>\n  <div class="pull-right">\n    <uib-pagination total-items="$ctrl.pagination.total" ng-model="$ctrl.pagination.page" ng-change="$ctrl.search()"\n      class="pagination-sm" previous-text="&lsaquo;" next-text="&rsaquo;" force-ellipses="true" rotate="true"\n      max-size="$ctrl.pagination.limit" items-per-page="$ctrl.pagination.limit"></uib-pagination>\n  </div>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":98}],115:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$scope', '$http', 'posgram', '$uibModalInstance', 'UserApi', 'user', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $scope, $http, posgram, $uibModalInstance, UserApi, user) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$http = $http;
    _this.$scope = $scope;
    _this.$uibModalInstance = $uibModalInstance;
    _this.UserApi = UserApi;
    _this.user = user || {};
    return _this;
  }

  _createClass(Controller, [{
    key: 'cancel',
    value: function cancel() {
      this.$uibModalInstance.close(false);
    }
  }, {
    key: 'save',
    value: function save() {
      if (this.user._id) this.create();else this.update();
      // return this.DeliveryApi.updateCOD(this.order._id, this.codAmount, this.notes)
      //   .then(delivery => {
      //     this.$uibModalInstance.close(delivery);
      //   })
      //   .catch(err => {
      //     this.showDangerAlert("Cannot edit COD");
      //   })
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      return this.UserApi.create(this.user).then(function (user) {
        _this2.$uibModalInstance.close(user);
      }).catch(function (err) {
        // this.showDangerAlert("Cannot edit COD");
      });
    }
  }, {
    key: 'update',
    value: function update() {}
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110}],112:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<div class="modal-header">\n  <h4 ng-if="$ctrl.user._id" class="modal-title">Edit user</h4>\n  <h4 ng-if="!$ctrl.user._id" class="modal-title">Create user</h4>\n</div>\n<div class="modal-body">\n  <form class="form-horizontal" role="form" novalidate name="editCodForm">\n    <div class="form-group">\n      <label class="control-label col-sm-3">Username</label>\n      <div class="col-sm-9">\n        <input class="form-control" ng-model="$ctrl.user.username" />\n      </div>\n    </div>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Password</label>\n      <div class="col-sm-9">\n        <input class="form-control" ng-model="$ctrl.user.password" />\n      </div>\n    </div>\n    <hr/>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Name</label>\n      <div class="col-sm-9">\n        <input class="form-control" ng-model="$ctrl.user.name" />\n      </div>\n    </div>    \n    <div class="form-group">\n      <label class="control-label col-sm-3">Role</label>\n      <div class="col-sm-9">\n        <div class="checkbox">\n          <label><input type="checkbox" ng-model="$ctrl.user.isManager">Manager</label>\n        </div>\n      </div>\n    </div>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Access</label>\n      <div class="col-sm-9">\n        <div class="checkbox">\n          <label><input type="checkbox" ng-model="$ctrl.user.isLocked">Locked</label>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n<div class="modal-footer">\n  <button type="button" ng-click="$ctrl.cancel()" class="btn btn-default" data-dismiss="modal">Cancel</button>\n  <button type="button" ng-click="$ctrl.save()" class="btn btn-primary" data-dismiss="modal">Save</button>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":115}],99:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _userDetail = require('../user-detail');

var _userDetail2 = _interopRequireDefault(_userDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $state, $timeout, $sce, posgram, DialogService) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$rootScope = $rootScope;
    _this.$state = $state;
    _this.$timeout = $timeout;
    _this.$sce = $sce;
    _this.posgram = posgram;
    _this.DialogService = DialogService;
    return _this;
  }

  _createClass(Controller, [{
    key: '$onInit',
    value: function $onInit() {
      this.selectedTab = 'users';
    }
  }, {
    key: 'selectTab',
    value: function selectTab(tab) {
      this.selectedTab = tab;
    }
  }, {
    key: 'isSelectedTab',
    value: function isSelectedTab(tab) {
      return this.selectedTab === tab;
    }
  }, {
    key: 'create',
    value: function create() {
      var inputs = {
        user: null
      };

      this.DialogService.open(_userDetail2.default, inputs);
    }
  }, {
    key: 'edit',
    value: function edit(user) {
      var inputs = {
        user: user
      };

      this.DialogService.open(_userDetail2.default, inputs);
    }
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110,"../user-detail":112}],69:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<ol class="breadcrumb">\n  <li><a href="#">Dashboard</a></li>\n  <li class="active">Company</li>\n</ol>\n<div class="tabbable-bordered">\n  <ul class="nav nav-tabs">\n    <li class="active"><a href="#users" data-toggle="tab">Users</a></li>\n    <li><a href="#users12" data-toggle="tab">...</a></li>\n  </ul>\n  <div class="tab-content">\n    <div id="users" class="tab-pane fade in active">\n      <div class="panel panel-default panel-noborder">\n        <div class="panel-body">\n          <go-user-list />\n        </div>\n      </div>\n    </div>\n    <div id="users12" class="tab-pane fade">\n      <div class="panel panel-default panel-noborder">\n        <div class="panel-body">\n          ...\n        </div>\n      </div>\n    </div>\n  </div>  \n</div>\n';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":99}],116:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$scope', '$http', 'posgram', '$uibModalInstance', 'order', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $scope, $http, posgram, $uibModalInstance, order) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$http = $http;
    _this.$scope = $scope;
    _this.$uibModalInstance = $uibModalInstance;
    _this.order = order;
    return _this;
  }

  _createClass(Controller, [{
    key: 'close',
    value: function close() {
      this.$uibModalInstance.close(false);
    }
  }, {
    key: 'print',
    value: function print() {
      this.$uibModalInstance.close(false);
    }
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110}],113:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<div class="modal-header">\n  <h4 class="modal-title">Order - {{$ctrl.order.code}}</h4>\n</div>\n<div class="modal-body">\n  <table class="table"> \n    <thead> \n      <tr> \n        <th>Item</th> \n        <th>Quantity</th> \n        <th>Sub Total</th>\n      </tr> \n    </thead> \n    <tbody> \n      <tr ng-repeat="item in $ctrl.order.items"> \n        <td>{{item.name}}</td> \n        <td>{{item.quantity}}</td> \n        <td>{{item.subtotal | currency}}</td>\n      </tr>\n      <tr> \n        <td></td>\n        <td>Discount</td> \n        <td>{{$ctrl.order.discount | currency}}</td>\n      </tr>\n      <tr> \n        <td></td> \n        <td>Tax</td> \n        <td>{{$ctrl.order.tax | currency}}</td>\n      </tr>\n      <tr> \n        <td></td> \n        <td>Total</td> \n        <td><h3>{{$ctrl.order.total | currency}}</h3></td>\n      </tr>\n    </tbody> \n  </table>\n</div>\n<div class="modal-footer">\n  <button type="button" ng-click="$ctrl.close()" class="btn btn-default" data-dismiss="modal">Close</button>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":116}],100:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _receiptDialog = require('../receipt-dialog');

var _receiptDialog2 = _interopRequireDefault(_receiptDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'MenuApi', 'OrderApi', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $state, $timeout, $sce, posgram, DialogService, MenuApi, OrderApi) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$rootScope = $rootScope;
    _this.$state = $state;
    _this.$timeout = $timeout;
    _this.$sce = $sce;
    _this.posgram = posgram;
    _this.DialogService = DialogService;
    _this.MenuApi = MenuApi;
    _this.OrderApi = OrderApi;
    return _this;
  }

  _createClass(Controller, [{
    key: '$onInit',
    value: function $onInit() {
      var _this2 = this;

      this.order = {
        subtotal: 0,
        discount: 0,
        tax: 0,
        total: 0,
        items: []
      };

      this.selectedTag = 'All';

      this.MenuApi.find().then(function (result) {
        _this2.menus = result;
      });

      this.MenuApi.findTags().then(function (result) {
        _this2.tags = result;
        _this2.tags.splice(0, 0, 'All');
      });
    }
  }, {
    key: 'selectTag',
    value: function selectTag(tag) {
      this.selectedTag = tag;
    }
  }, {
    key: 'isSelectedTag',
    value: function isSelectedTag(tag) {
      return this.selectedTag === tag;
    }
  }, {
    key: 'selectMenu',
    value: function selectMenu(menu) {
      var item = _.find(this.order.items, function (item) {
        return item.name === menu.name;
      });

      if (item) {
        item.quantity++;
      } else {
        item = _.clone(menu);
        item.quantity = 1;
        this.order.items.push(item);
      }

      this.calculate();
    }
  }, {
    key: 'isSelectedMenu',
    value: function isSelectedMenu(menu) {
      return _.some(this.order.items, function (item) {
        return item.name === menu.name;
      });
    }
  }, {
    key: 'canShowMenu',
    value: function canShowMenu(menu) {
      if (!this.selectedTag || this.selectedTag === 'All') return true;
      return menu.tags.indexOf(this.selectedTag) >= 0;
    }
  }, {
    key: 'increaseQuantity',
    value: function increaseQuantity(item) {
      item.quantity++;
      this.calculate();
    }
  }, {
    key: 'decreaseQuantity',
    value: function decreaseQuantity(item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.order.items = _.filter(this.order.items, function (menu) {
          return menu._id != item._id;
        });
      }

      this.calculate();
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      var subtotal = 0;
      var discount = 0;
      var total = 0;

      this.order.items.forEach(function (item) {
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
  }, {
    key: 'discard',
    value: function discard() {
      var _this3 = this;

      this.DialogService.confirm('Do you want to discard?').then(function (result) {
        if (!result) return;
        _this3.order = {
          subtotal: 0,
          discount: 0,
          tax: 0,
          total: 0,
          items: []
        };

        _this3.selectedTag = 'All';
      });
    }
  }, {
    key: 'confirm',
    value: function confirm() {
      var _this4 = this;

      if (this.order.items.length === 0) {
        return toastr.error('Select items to confirm');
      }

      return this.OrderApi.create(this.order).then(function (order) {
        toastr.success('Created successfully');

        var inputs = {
          order: _.clone(order)
        };

        _this4.DialogService.open(_receiptDialog2.default, inputs).then(function (result) {
          _this4.order = {
            subtotal: 0,
            discount: 0,
            tax: 0,
            total: 0,
            items: []
          };

          _this4.selectedTag = 'All';
        });
      }).catch(function (err) {
        toastr.error(err.message);
      });
    }
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110,"../receipt-dialog":113}],70:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<ol class="breadcrumb">\n  <li><a href="#">Dashboard</a></li>\n  <li class="active">Cart</li>\n</ol>\n<div class="row">\n  <div class="col-md-4">\n    <div class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">Checkout</h3>\n      </div>\n      <div class="panel-body">\n        <form>\n          <div class="form-group">\n            <input ng-model="$ctrl.order.note" type="text" class="form-control" placeholder="Note...">\n          </div>\n          <div class="form-group">\n            <table class="table"> \n              <tbody> \n                <tr> \n                  <td>Sub Total</td> \n                  <td>{{$ctrl.order.subtotal | currency}}</td> \n                </tr>\n                <tr> \n                  <td>Discount</td> \n                  <td>{{$ctrl.order.discount | currency}}</td> \n                </tr>\n                <tr> \n                  <td>Tax</td> \n                  <td>{{$ctrl.order.tax | currency}}</td> \n                </tr>\n                <tr> \n                  <td>Total</td> \n                  <td><h3>{{$ctrl.order.total | currency}}</h3></td> \n                </tr>\n              </tbody> \n            </table>\n          </div>\n          <div class="form-group">\n            <div class="pull-right">\n              <a href="javascript:;" ng-click="$ctrl.confirm()" class="btn btn-primary btn-sm" role="button">\n                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Confirm\n              </a>\n            </div>\n            <div class="pull-right">\n              <a href="javascript:;" ng-click="$ctrl.discard()" class="btn btn-default btn-sm" role="button">\n                Discard\n              </a>\n              &nbsp;&nbsp;\n            </div>\n          </div>\n        </form>        \n      </div>\n    </div>    \n  </div>  \n  <div class="col-md-8">\n    <table class="table"> \n      <thead> \n        <tr> \n          <th>Item</th> \n          <th>Quantity</th> \n          <th>Unit Price</th> \n          <th>Sub Total</th> \n          <th>Note</th> \n          <th></th>\n        </tr> \n      </thead> \n      <tbody> \n        <tr ng-repeat="item in $ctrl.order.items"> \n          <td>{{item.name}}</td> \n          <td>{{item.quantity}}\n            <a href="javascript:;" ng-click="$ctrl.increaseQuantity(item)" class="btn btn-default btn-xs pull-right" role="button">\n              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\n            </a>\n          </td> \n          <td>{{item.unitPrice | currency}}</td>\n          <td>{{item.subtotal | currency}}</td>\n          <td>\n            <input ng-model="item.note" type="text" class="form-control" placeholder="Note...">\n          </td>           \n          <td>\n            <a href="javascript:;" ng-click="$ctrl.decreaseQuantity(item)" class="btn btn-default btn-xs" role="button">\n              <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>\n            </a>\n          </td>\n        </tr>\n      </tbody> \n    </table>     \n  </div>\n</div>\n<div class="row">\n  <div class="col-md-4">\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <form>\n          <div class="form-group">\n            <input type="text" class="form-control" placeholder="Search for...">\n          </div>\n          <div class="form-group" style="font-size: 18px;">\n            <span ng-repeat="tag in $ctrl.tags" class="label label-default" ng-click="$ctrl.selectTag(tag)" ng-class="{\'label-success\': $ctrl.isSelectedTag(tag)}" style="margin: 2px; cursor: pointer; display:inline-block;">{{tag}}</span>\n          </div>\n        </form>\n      </div>\n    </div>    \n  </div>  \n  <div class="col-md-8">\n    <div style="font-size: 25px;">\n      <span ng-repeat="menu in $ctrl.menus" ng-if="$ctrl.canShowMenu(menu)" ng-click="$ctrl.selectMenu(menu)" class="label label-default" ng-class="{\'label-primary\': $ctrl.isSelectedMenu(menu)}" style="margin: 2px; cursor: pointer; display:inline-block;">{{menu.name}}</span>\n    </div>\n  </div>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":100}],101:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _receiptDialog = require('../receipt-dialog');

var _receiptDialog2 = _interopRequireDefault(_receiptDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'OrderApi', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $state, $timeout, $sce, posgram, DialogService, OrderApi) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$rootScope = $rootScope;
    _this.$state = $state;
    _this.$timeout = $timeout;
    _this.$sce = $sce;
    _this.posgram = posgram;
    _this.DialogService = DialogService;
    _this.OrderApi = OrderApi;
    return _this;
  }

  _createClass(Controller, [{
    key: '$onInit',
    value: function $onInit() {
      this.pagination = {
        page: 1,
        limit: 10
      };

      this.search();
    }
  }, {
    key: 'search',
    value: function search() {
      var _this2 = this;

      var query = this.searchText ? 'text=' + this.searchText : null;
      this.OrderApi.find(query, this.pagination).then(function (result) {
        _this2.orders = result.docs || [];
        _this2.pagination = _.extend(_this2.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
      });
    }
  }, {
    key: 'view',
    value: function view(order) {
      var _this3 = this;

      var inputs = {
        order: _.clone(order)
      };

      this.DialogService.open(_receiptDialog2.default, inputs).then(function (order) {
        if (!order) return;
        var item = _.find(_this3.orders, function (item) {
          return item._id === order._id;
        });
        if (item) _.extend(item, order);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(order) {
      var _this4 = this;

      this.DialogService.confirm("Do you want to delete?").then(function (confirmed) {
        if (!confirmed) return;
        _this4.OrderApi.delete(order._id).then(function (result) {
          _this4.orders = _.filter(_this4.orders, function (item) {
            return item._id != order._id;
          });
          toastr.success('Deleted successfully');
        }).catch(function (err) {
          toastr.error('Deleted failed');
        });
      });
    }
  }, {
    key: 'getTags',
    value: function getTags(order) {
      if (!order.tags) return null;
      return order.tags.reduce(function (value, item) {
        return value + ', ' + item;
      });
    }
  }, {
    key: 'getStatus',
    value: function getStatus(order) {
      if (order.isLocked) return "Locked";
      return null;
    }
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110,"../receipt-dialog":113}],71:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<ol class="breadcrumb">\n  <li><a href="#">Dashboard</a></li>\n  <li class="active">Orders</li>\n</ol>\n<div class="row">\n  <div class="col-sm-8">\n    <input ng-model="$ctrl.searchText" type="text" class="form-control" placeholder="Search for...">\n  </div>\n  <div class="col-sm-2=4">\n    <button ng-click="$ctrl.search()" class="btn btn-default" type="button">\n      <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Search\n    </button>\n    &nbsp;&nbsp;\n    <button ng-click="$ctrl.export()" class="btn btn-primary" type="button">\n      Export Data\n    </button>\n  </div>\n</div>\n<br/>\n<table class="table"> \n  <thead> \n    <tr> \n      <th>Order ID</th> \n      <th>Order Ref.</th> \n      <th>Discount</th> \n      <th>Total</th> \n      <th>Created By</th> \n      <th>Created Date</th> \n      <th></th>\n    </tr> \n  </thead> \n  <tbody> \n    <tr ng-repeat="order in $ctrl.orders"> \n      <td>{{order.code}}</td> \n      <td>#{{order.ref}}</td> \n      <td>{{order.discount | currency}}</td>\n      <td>{{order.total | currency}}</td>\n      <td>{{order.createdBy.name}}</td> \n      <td>{{order.createdAt | date:\'short\'}}</td>\n      <td>\n        <a href="javascript:;" ng-click="$ctrl.view(order)" class="btn btn-default btn-xs" role="button">\n          View\n        </a>\n        <a href="javascript:;" ng-click="$ctrl.delete(order)" class="btn btn-danger btn-xs" role="button">\n          <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete\n        </a>        \n      </td>\n    </tr>\n  </tbody> \n</table>\n<div class="clearfix">\n  <div class="pull-left pagination-info">\n    <p>{{$ctrl.pagination.total}} records</p>\n  </div>\n  <div class="pull-right">\n    <uib-pagination total-items="$ctrl.pagination.total" ng-model="$ctrl.pagination.page" ng-change="$ctrl.search()"\n      class="pagination-sm" previous-text="&lsaquo;" next-text="&rsaquo;" force-ellipses="true" rotate="true"\n      max-size="$ctrl.pagination.limit" items-per-page="$ctrl.pagination.limit"></uib-pagination>\n  </div>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":101}],118:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$scope', '$http', 'posgram', '$uibModalInstance', 'MenuApi', 'CategoryApi', 'menu', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $scope, $http, posgram, $uibModalInstance, MenuApi, CategoryApi, menu) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$http = $http;
    _this.$scope = $scope;
    _this.$uibModalInstance = $uibModalInstance;
    _this.MenuApi = MenuApi;
    _this.CategoryApi = CategoryApi;
    _this.menu = menu || {};

    _this.categories = [];

    _this.init();
    return _this;
  }

  _createClass(Controller, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      return this.CategoryApi.find().then(function (result) {
        _this2.categories = result;
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.$uibModalInstance.close(false);
    }
  }, {
    key: 'save',
    value: function save() {
      var _this3 = this;

      if (!this.validate()) return;

      if (this.menu._id) {
        return this.MenuApi.update(this.menu._id, this.menu).then(function (result) {
          toastr.success('Updated successfully');
          _this3.$uibModalInstance.close(_this3.menu);
        }).catch(function (err) {
          toastr.error(err.message);
        });
      } else {
        return this.MenuApi.create(this.menu).then(function (menu) {
          toastr.success('Created successfully');
          _this3.$uibModalInstance.close(menu);
        }).catch(function (err) {
          toastr.error(err.message);
        });
      }
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (!this.menu.name) {
        toastr.error("Name is required");
        return false;
      }

      if (!this.menu.unitPrice) {
        toastr.error("Unit price is required");
        return false;
      }

      return true;
    }
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110}],117:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<div class="modal-header">\n  <h4 class="modal-title">Create menu</h4>\n</div>\n<div class="modal-body">\n  <form class="form-horizontal" role="form" novalidate>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Name</label>\n      <div class="col-sm-9">\n        <input class="form-control" ng-model="$ctrl.menu.name" />\n      </div>\n    </div>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Unit Price</label>\n      <div class="col-sm-9">\n        <input type="number" class="form-control" ng-model="$ctrl.menu.unitPrice" />\n      </div>\n    </div>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Discount</label>\n      <div class="col-sm-4">\n        <input type="number" class="form-control" ng-model="$ctrl.menu.discount" />\n      </div>\n      <div class="col-sm-5">\n        <div class="checkbox">\n          <label><input type="checkbox" ng-model="$ctrl.menu.isPercentDiscount"/>Percent Discount</label>\n        </div>        \n      </div>\n    </div>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Category</label>\n      <div class="col-sm-9">\n        <select class="form-control" ng-model="$ctrl.menu.category" ng-options="category as category.name for category in $ctrl.categories track by category._id">\n          <option value="">- Select category -</option>\n        </select>\n      </div>      \n    </div>    \n    <div class="form-group">\n      <label class="control-label col-sm-3">Status</label>\n      <div class="col-sm-9">\n        <div class="checkbox">\n          <label><input type="checkbox" ng-model="$ctrl.menu.isLocked"/>Locked</label>\n        </div>\n      </div>\n    </div>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Image</label>\n      <div class="col-sm-9">\n        <img ng-src="{{$ctrl.menu.image}}" style="height: 170px; width: 170px; display: block;"/>\n        <input type="file" ng-file-select="onFileSelect($files)" ng-model="$ctrl.menu.image">\n      </div>\n    </div>\n  </form>\n</div>\n<div class="modal-footer">\n  <button type="button" ng-click="$ctrl.cancel()" class="btn btn-default" data-dismiss="modal">Cancel</button>\n  <button type="button" ng-click="$ctrl.save()" class="btn btn-primary" data-dismiss="modal">Save</button>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":118}],102:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _menuDialog = require('../menu-dialog');

var _menuDialog2 = _interopRequireDefault(_menuDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'MenuApi', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $state, $timeout, $sce, posgram, DialogService, MenuApi) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$rootScope = $rootScope;
    _this.$state = $state;
    _this.$timeout = $timeout;
    _this.$sce = $sce;
    _this.posgram = posgram;
    _this.DialogService = DialogService;
    _this.MenuApi = MenuApi;
    return _this;
  }

  _createClass(Controller, [{
    key: '$onInit',
    value: function $onInit() {
      this.pagination = {
        page: 1,
        limit: 10
      };

      this.search();
    }
  }, {
    key: 'search',
    value: function search() {
      var _this2 = this;

      var query = this.searchText ? 'text=' + this.searchText : null;
      this.MenuApi.find(query, this.pagination).then(function (result) {
        _this2.menus = result.docs || [];
        _this2.pagination = _.extend(_this2.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
      });
    }
  }, {
    key: 'create',
    value: function create() {
      var _this3 = this;

      var inputs = {
        menu: null
      };

      this.DialogService.open(_menuDialog2.default, inputs).then(function (menu) {
        if (!menu) return;
        _this3.menus.push(menu);
      });
    }
  }, {
    key: 'edit',
    value: function edit(menu) {
      var _this4 = this;

      var inputs = {
        menu: _.clone(menu)
      };

      this.DialogService.open(_menuDialog2.default, inputs).then(function (menu) {
        if (!menu) return;
        var item = _.find(_this4.menus, function (item) {
          return item._id === menu._id;
        });
        if (item) _.extend(item, menu);
      });
    }
  }, {
    key: 'getTags',
    value: function getTags(menu) {
      if (!menu.tags) return null;
      return menu.tags.reduce(function (value, item) {
        return value + ', ' + item;
      });
    }
  }, {
    key: 'getStatus',
    value: function getStatus(menu) {
      if (menu.isLocked) return "Locked";
      return null;
    }
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110,"../menu-dialog":117}],72:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<ol class="breadcrumb">\n  <li><a href="#">Dashboard</a></li>\n  <li class="active">Create Order</li>\n  <li class="pull-right">\n    <a href="javascript:;" ng-click="$ctrl.print()" class="btn btn-success btn-xs" role="button">\n      <span class="glyphicon glyphicon-print" aria-hidden="true"></span> Print\n    </a>    \n  </li>\n</ol>\n<div class="row">\n  <div class="col-md-4">\n    <div class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">Checkout</h3>\n      </div>\n      <div class="panel-body">\n        <table class="table"> \n          <tbody> \n            <tr> \n              <td>Subtotal</td> \n              <td>{{3 | currency}}</td> \n            </tr>\n            <tr> \n              <td>Discount</td> \n              <td>{{5 | currency}}</td> \n            </tr>\n            <tr> \n              <td>Tax</td> \n              <td>{{2 | currency}}</td> \n            </tr>\n            <tr> \n              <td>Total</td> \n              <td>{{12 | currency}}</td> \n            </tr>\n          </tbody> \n        </table>  \n        <div class="pull-right">\n          <a href="javascript:;" ng-click="$ctrl.create()" class="btn btn-primary btm-sm" role="button">\n            <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Save\n          </a>    \n        </div>\n        <div class="pull-right">\n          <a href="javascript:;" ng-click="$ctrl.create()" class="btn btn-default btm-sm" role="button">\n            Discard\n          </a> \n          &nbsp;&nbsp;   \n        </div>        \n      </div>\n    </div>    \n  </div>  \n  <div class="col-md-8">\n    <table class="table"> \n      <thead> \n        <tr> \n          <th>Name</th> \n          <th>Quantity</th> \n          <th>Unit Price</th> \n          <th>Subtotal</th> \n          <th>Discount</th> \n          <th>Total</th>\n        </tr> \n      </thead> \n      <tbody> \n        <tr ng-repeat="menu in $ctrl.menus"> \n          <td>{{menu.name}}</td> \n          <td>{{menu.quanity}}</td> \n          <td>{{menu.unitPrice | currency}}</td>\n          <td>{{menu.subtotal | currency}}</td>\n          <td>{{menu.discount | currency}}</td>\n          <td>{{menu.total | currency}}</td>\n        </tr>\n      </tbody> \n    </table>     \n  </div>\n</div>\n<hr/>\n<div class="row">\n  <div class="col-md-4">\n    <div class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">Filter by tags</h3>\n      </div>\n      <div class="panel-body">\n        <h4>\n          <span class="label label-default">Default</span>\n          <span class="label label-primary">Primary</span>\n          <span class="label label-success">Success</span>\n          <span class="label label-info">Info</span>\n          <span class="label label-warning">Warning</span>\n          <span class="label label-danger">Danger</span>\n        </h4>       \n      </div>\n    </div>    \n  </div>  \n  <div class="col-md-8">\n    <div class="bs-glyphicons"> \n      <ul class="bs-glyphicons-list"> \n        <li>banhmi acnnc adnad</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n        <li>opla</li> \n      </ul> \n    </div>   \n  </div>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":102}],103:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _menuDialog = require('../menu-dialog');

var _menuDialog2 = _interopRequireDefault(_menuDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'MenuApi', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $state, $timeout, $sce, posgram, DialogService, MenuApi) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$rootScope = $rootScope;
    _this.$state = $state;
    _this.$timeout = $timeout;
    _this.$sce = $sce;
    _this.posgram = posgram;
    _this.DialogService = DialogService;
    _this.MenuApi = MenuApi;
    return _this;
  }

  _createClass(Controller, [{
    key: '$onInit',
    value: function $onInit() {
      this.pagination = {
        page: 1,
        limit: 10
      };

      this.search();
    }
  }, {
    key: 'search',
    value: function search() {
      var _this2 = this;

      var query = this.searchText ? 'text=' + this.searchText : null;
      this.MenuApi.find(query, this.pagination).then(function (result) {
        _this2.menus = result.docs || [];
        _this2.pagination = _.extend(_this2.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
      });
    }
  }, {
    key: 'create',
    value: function create() {
      var _this3 = this;

      var inputs = {
        menu: null
      };

      this.DialogService.open(_menuDialog2.default, inputs).then(function (menu) {
        if (!menu) return;
        _this3.menus.push(menu);
      });
    }
  }, {
    key: 'edit',
    value: function edit(menu) {
      var _this4 = this;

      var inputs = {
        menu: _.clone(menu)
      };

      this.DialogService.open(_menuDialog2.default, inputs).then(function (menu) {
        if (!menu) return;
        var item = _.find(_this4.menus, function (item) {
          return item._id === menu._id;
        });
        if (item) _.extend(item, menu);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(menu) {
      var _this5 = this;

      this.DialogService.confirm("Do you want to delete?").then(function (confirmed) {
        if (!confirmed) return;
        _this5.MenuApi.delete(menu._id).then(function (result) {
          _this5.menus = _.filter(_this5.menus, function (item) {
            return item._id != menu._id;
          });
          toastr.success('Deleted successfully');
        }).catch(function (err) {
          toastr.error('Deleted failed');
        });
      });
    }
  }, {
    key: 'getDiscount',
    value: function getDiscount(menu) {
      if (!menu.discount) return null;
      if (menu.isPercentDiscount) return menu.discount + '%';
      return "$" + ('' + menu.discount);
    }
  }, {
    key: 'getStatus',
    value: function getStatus(menu) {
      if (menu.isLocked) return "Locked";
      return null;
    }
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110,"../menu-dialog":117}],73:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<ol class="breadcrumb">\n  <li><a href="#">Dashboard</a></li>\n  <li class="active">Menu</li>\n</ol>\n<div class="row">\n  <div class="col-sm-10">\n    <input ng-model="$ctrl.searchText" type="text" class="form-control" placeholder="Search for...">\n  </div>\n  <div class="col-sm-2">\n    <button ng-click="$ctrl.search()" class="btn btn-default" type="button">\n      <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Search\n    </button>\n  </div>\n</div>\n<br/>\n<table class="table"> \n  <thead> \n    <tr> \n      <th>Name</th> \n      <th>Unit Price</th> \n      <th>Discount</th> \n      <th>Category</th> \n      <th>Status</th> \n      <th>\n        <a href="javascript:;" ng-click="$ctrl.create()" class="btn btn-primary btn-xs" role="button">\n          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Create\n        </a>\n      </th>\n    </tr> \n  </thead> \n  <tbody> \n    <tr ng-repeat="menu in $ctrl.menus"> \n      <td>{{menu.name}}</td> \n      <td>{{menu.unitPrice | currency}}</td>\n      <td>{{$ctrl.getDiscount(menu)}}</td>\n      <td>{{menu.category.name}}</td> \n      <td>{{$ctrl.getStatus(menu)}}</td>      \n      <td>\n        <a href="javascript:;" ng-click="$ctrl.edit(menu)" class="btn btn-default btn-xs" role="button">\n          <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit\n        </a>  \n        <a href="javascript:;" ng-click="$ctrl.delete(menu)" class="btn btn-danger btn-xs" role="button">\n          <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete\n        </a>\n      </td>\n    </tr>\n  </tbody> \n</table>\n<div class="clearfix">\n  <div class="pull-left pagination-info">\n    <p>{{$ctrl.pagination.total}} records</p>\n  </div>\n  <div class="pull-right">\n    <uib-pagination total-items="$ctrl.pagination.total" ng-model="$ctrl.pagination.page" ng-change="$ctrl.search()"\n      class="pagination-sm" previous-text="&lsaquo;" next-text="&rsaquo;" force-ellipses="true" rotate="true"\n      max-size="$ctrl.pagination.limit" items-per-page="$ctrl.pagination.limit"></uib-pagination>\n  </div>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":103}],121:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$scope', '$http', 'appConfig', '$uibModalInstance', 'CategoryApi', 'category', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $scope, $http, appConfig, $uibModalInstance, CategoryApi, category) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$http = $http;
    _this.$scope = $scope;
    _this.$uibModalInstance = $uibModalInstance;
    _this.CategoryApi = CategoryApi;
    _this.category = category || {};
    return _this;
  }

  _createClass(Controller, [{
    key: 'cancel',
    value: function cancel() {
      this.$uibModalInstance.close(false);
    }
  }, {
    key: 'addSub',
    value: function addSub() {
      this.category.subs = this.category.subs || [];
      this.category.subs.push({
        _t: new Date().getTime()
      });
    }
  }, {
    key: 'deleteSub',
    value: function deleteSub(sub) {
      sub.isDeleted = true;
    }
  }, {
    key: 'save',
    value: function save() {
      var _this2 = this;

      if (!this.validate()) return;

      this.category.displayIndex = this.category.displayIndex || 1;
      if (this.category.subs) {
        this.category.subs.forEach(function (item) {
          item.displayIndex = item.displayIndex || 1;
        });
      }

      if (this.category._id) {
        return this.CategoryApi.update(this.category._id, this.category).then(function (result) {
          toastr.success('Updated successfully');
          _this2.$uibModalInstance.close(_this2.category);
        }).catch(function (err) {
          toastr.error(err.message);
        });
      } else {
        return this.CategoryApi.create(this.category).then(function (category) {
          toastr.success('Created successfully');
          _this2.$uibModalInstance.close(category);
        }).catch(function (err) {
          toastr.error(err.message);
        });
      }
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (!this.category.name) {
        toastr.error("Name is required");
        return false;
      }

      if (this.category.sub) {
        this.category.subs.forEach(function (item) {
          if (!item.name) {
            toastr.error("Name is required");
            return false;
          }
        });
      }

      return true;
    }
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110}],119:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<div class="modal-header">\n  <h4 class="modal-title">Create category</h4>\n</div>\n<div class="modal-body">\n  <form class="form-horizontal" role="form" novalidate>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Name</label>\n      <div class="col-sm-9">\n        <input class="form-control" ng-model="$ctrl.category.name" />\n      </div>\n    </div>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Display Index</label>\n      <div class="col-sm-9">\n        <input type="number" class="form-control" ng-model="$ctrl.category.displayIndex" />\n      </div>\n    </div>\n    <div class="form-group">\n      <div class="col-sm-12">\n        <table class="table"> \n          <thead> \n            <tr> \n              <th>Sub-category</th> \n              <th>Display Index</th> \n              <th>\n                <a href="javascript:;" ng-click="$ctrl.addSub()" class="btn btn-primary btn-xs" role="button">\n                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add\n                </a>\n              </th>\n            </tr> \n          </thead> \n          <tbody> \n            <tr ng-if="!sub.isDeleted" ng-repeat="sub in $ctrl.category.subs"> \n              <td>\n                <input class="form-control" ng-model="sub.name" />\n              </td> \n              <td>\n                <input class="form-control" ng-model="sub.displayIndex" />\n              </td> \n              <td>\n                <a href="javascript:;" ng-click="$ctrl.deleteSub(sub)" class="btn btn-danger btn-xs" role="button">\n                  <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete\n                </a>\n              </td>\n            </tr>\n          </tbody> \n        </table>        \n      </div>\n    </div>    \n  </form>\n</div>\n<div class="modal-footer">\n  <button type="button" ng-click="$ctrl.cancel()" class="btn btn-default" data-dismiss="modal">Cancel</button>\n  <button type="button" ng-click="$ctrl.save()" class="btn btn-primary" data-dismiss="modal">Save</button>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":121}],104:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _categoryDialog = require('../category-dialog');

var _categoryDialog2 = _interopRequireDefault(_categoryDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'CategoryApi', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $state, $timeout, $sce, posgram, DialogService, CategoryApi) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$rootScope = $rootScope;
    _this.$state = $state;
    _this.$timeout = $timeout;
    _this.$sce = $sce;
    _this.posgram = posgram;
    _this.DialogService = DialogService;
    _this.CategoryApi = CategoryApi;
    return _this;
  }

  _createClass(Controller, [{
    key: '$onInit',
    value: function $onInit() {
      this.search();
    }
  }, {
    key: 'search',
    value: function search() {
      var _this2 = this;

      this.CategoryApi.find().then(function (result) {
        _this2.categories = result;
      });
    }
  }, {
    key: 'create',
    value: function create() {
      var _this3 = this;

      var inputs = {
        category: null
      };

      this.DialogService.open(_categoryDialog2.default, inputs).then(function (category) {
        if (!category) return;
        _this3.search();
      });
    }
  }, {
    key: 'edit',
    value: function edit(category) {
      var _this4 = this;

      var inputs = {
        category: _.clone(category)
      };

      this.DialogService.open(_categoryDialog2.default, inputs).then(function (category) {
        if (!category) return;
        _this4.search();
      });
    }
  }, {
    key: 'delete',
    value: function _delete(category) {
      var _this5 = this;

      this.DialogService.confirm("Do you want to delete?").then(function (confirmed) {
        if (!confirmed) return;
        _this5.CategoryApi.delete(category._id).then(function (result) {
          _this5.search();
          toastr.success('Deleted successfully');
        }).catch(function (err) {
          toastr.error('Deleted failed');
        });
      });
    }
  }, {
    key: 'getParent',
    value: function getParent(category) {
      var parent = _.find(this.categories, function (item) {
        return item._id === category.parent;
      });
      return parent ? parent.name : "";
    }
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110,"../category-dialog":119}],74:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<ol class="breadcrumb">\n  <li><a href="#">Dashboard</a></li>\n  <li class="active">Category</li>\n</ol>\n<br/>\n<table class="table"> \n  <thead> \n    <tr> \n      <th>Category Name</th> \n      <th>Display Index</th> \n      <th>Parent Category</th> \n      <th>\n        <a href="javascript:;" ng-click="$ctrl.create()" class="btn btn-primary btn-xs" role="button">\n          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Create\n        </a>\n      </th>\n    </tr> \n  </thead> \n  <tbody> \n    <tr ng-repeat="category in $ctrl.categories"> \n      <td>{{category.name}}</td> \n      <td>{{category.displayIndex}}</td>\n      <td>{{$ctrl.getParent(category)}}</td>\n      <td>\n        <a href="javascript:;" ng-click="$ctrl.edit(category)" class="btn btn-default btn-xs" role="button">\n          <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit\n        </a>\n        <a href="javascript:;" ng-click="$ctrl.delete(category)" class="btn btn-danger btn-xs" role="button">\n          <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete\n        </a>\n      </td>\n    </tr>\n  </tbody> \n</table>\n';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":104}],122:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$scope', '$http', 'posgram', '$uibModalInstance', 'UserApi', 'user', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $scope, $http, posgram, $uibModalInstance, UserApi, user) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$http = $http;
    _this.$scope = $scope;
    _this.$uibModalInstance = $uibModalInstance;
    _this.UserApi = UserApi;
    _this.user = user || {};
    _this.isPasswordEditing = false;
    return _this;
  }

  _createClass(Controller, [{
    key: 'cancel',
    value: function cancel() {
      this.$uibModalInstance.close(false);
    }
  }, {
    key: 'save',
    value: function save() {
      var _this2 = this;

      if (!this.validate()) return;

      if (this.user._id) {
        this.user.password = this.newPassword;
        return this.UserApi.update(this.user._id, this.user).then(function (result) {
          toastr.success('Updated successfully');
          _this2.$uibModalInstance.close(_this2.user);
        }).catch(function (err) {
          toastr.error(err.data.message);
        });
      } else {
        return this.UserApi.create(this.user).then(function (user) {
          toastr.success('Created successfully');
          _this2.$uibModalInstance.close(user);
        }).catch(function (err) {
          toastr.error(err.data.message);
        });
      }
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (!this.user.username) {
        toastr.error("Username is required");
        return false;
      }

      if (!this.user.password && !this.user._id) {
        toastr.error("Password is required");
        return false;
      }

      if (!this.user.name) {
        toastr.error("Name is required");
        return false;
      }

      return true;
    }
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110}],120:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<div class="modal-header">\n  <h4 class="modal-title">Create user</h4>\n</div>\n<div class="modal-body">\n  <form class="form-horizontal" role="form" novalidate>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Username</label>\n      <div class="col-sm-9">\n        <input class="form-control lowercase" ng-model="$ctrl.user.username" />\n      </div>\n    </div>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Password</label>\n      <div ng-if="$ctrl.user._id" class="col-sm-9">\n        <a ng-if="!$ctrl.isPasswordEditing" href="javascript:;" ng-click="$ctrl.isPasswordEditing = true">*****</a>\n        <input ng-if="$ctrl.isPasswordEditing" class="form-control" ng-model="$ctrl.newPassword" />\n      </div>\n      <div ng-if="!$ctrl.user._id" class="col-sm-9">\n        <input class="form-control" ng-model="$ctrl.user.password" />\n      </div>\n    </div>\n    <hr/>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Name</label>\n      <div class="col-sm-9">\n        <input class="form-control" ng-model="$ctrl.user.name" />\n      </div>\n    </div>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Role</label>\n      <div class="col-sm-9">\n        <div class="checkbox">\n          <label><input type="checkbox" ng-model="$ctrl.user.isManager"/>Manager</label>\n        </div>        \n      </div>\n    </div>\n    <div class="form-group">\n      <label class="control-label col-sm-3">Status</label>\n      <div class="col-sm-9">\n        <div class="checkbox">\n          <label><input type="checkbox" ng-model="$ctrl.user.isLocked"/>Locked</label>\n        </div>        \n      </div>\n    </div>\n  </form>\n</div>\n<div class="modal-footer">\n  <button type="button" ng-click="$ctrl.cancel()" class="btn btn-default" data-dismiss="modal">Cancel</button>\n  <button type="button" ng-click="$ctrl.save()" class="btn btn-primary" data-dismiss="modal">Save</button>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":122}],105:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseController = require('../base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _userDialog = require('../user-dialog');

var _userDialog2 = _interopRequireDefault(_userDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$rootScope', '$state', '$timeout', '$sce', 'posgram', 'DialogService', 'UserApi', function (_BaseController) {
  _inherits(Controller, _BaseController);

  function Controller($rootScope, $state, $timeout, $sce, posgram, DialogService, UserApi) {
    _classCallCheck(this, Controller);

    var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

    _this.$rootScope = $rootScope;
    _this.$state = $state;
    _this.$timeout = $timeout;
    _this.$sce = $sce;
    _this.posgram = posgram;
    _this.DialogService = DialogService;
    _this.UserApi = UserApi;
    return _this;
  }

  _createClass(Controller, [{
    key: '$onInit',
    value: function $onInit() {
      this.pagination = {
        page: 1,
        limit: 10
      };

      this.search();
    }
  }, {
    key: 'search',
    value: function search() {
      var _this2 = this;

      var query = this.searchText ? 'text=' + this.searchText : null;
      this.UserApi.find(query, this.pagination).then(function (result) {
        _this2.users = result.docs || [];
        _this2.pagination = _.extend(_this2.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
      });
    }
  }, {
    key: 'create',
    value: function create() {
      var _this3 = this;

      var inputs = {
        user: null
      };

      this.DialogService.open(_userDialog2.default, inputs).then(function (user) {
        if (!user) return;
        _this3.users.push(user);
      });
    }
  }, {
    key: 'edit',
    value: function edit(user) {
      var _this4 = this;

      var inputs = {
        user: _.clone(user)
      };

      this.DialogService.open(_userDialog2.default, inputs).then(function (user) {
        if (!user) return;
        var item = _.find(_this4.users, function (item) {
          return item._id === user._id;
        });
        if (item) _.extend(item, user);
      });
    }
  }, {
    key: 'getRole',
    value: function getRole(user) {
      if (user.isAdmin) return "Admin";
      if (user.isManager) return "Manager";
      return "Staff";
    }
  }, {
    key: 'getStatus',
    value: function getStatus(user) {
      if (user.isLocked) return "Locked";
      return null;
    }
  }]);

  return Controller;
}(_baseController2.default)];
},{"../base-controller":110,"../user-dialog":120}],75:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<div class="row">\n  <div class="col-sm-10">\n    <input ng-model="$ctrl.searchText" type="text" class="form-control" placeholder="Search for...">\n  </div>\n  <div class="col-sm-2">\n    <button ng-click="$ctrl.search()" class="btn btn-default" type="button">\n      <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Search\n    </button>\n  </div>\n</div>\n<br/>\n<table class="table"> \n  <thead> \n    <tr> \n      <th>Name</th> \n      <th>Username</th> \n      <th>Role</th> \n      <th>Status</th> \n      <th>\n        <a href="javascript:;" ng-click="$ctrl.create()" class="btn btn-primary btn-xs" role="button">\n          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Create\n        </a>\n      </th>\n    </tr> \n  </thead> \n  <tbody> \n    <tr ng-repeat="user in $ctrl.users"> \n      <td>{{user.name}}</td> \n      <td>{{user.username}}</td>\n      <td>{{$ctrl.getRole(user)}}</td>\n      <td>{{$ctrl.getStatus(user)}}</td>\n      <td>\n        <a href="javascript:;" ng-click="$ctrl.edit(user)" class="btn btn-default btn-xs" role="button">\n          <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit\n        </a>        \n      </td>\n    </tr>\n  </tbody> \n</table>\n<div class="clearfix">\n  <div class="pull-left pagination-info">\n    <p>Found {{$ctrl.pagination.total}} items</p>\n  </div>\n  <div class="pull-right">\n    <uib-pagination total-items="$ctrl.pagination.total" ng-model="$ctrl.pagination.page" ng-change="$ctrl.search()"\n      class="pagination-sm" previous-text="&lsaquo;" next-text="&rsaquo;" force-ellipses="true" rotate="true"\n      max-size="$ctrl.pagination.limit" items-per-page="$ctrl.pagination.limit"></uib-pagination>\n  </div>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":105}],21:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = ['$rootScope', function () {
  function Service($rootScope) {
    _classCallCheck(this, Service);

    this.$rootScope = $rootScope;
  }

  _createClass(Service, [{
    key: 'isAuthenticated',
    get: function get() {
      return true;
    }
  }]);

  return Service;
}()];
},{}],109:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = ['$scope', '$modalInstance', 'type', 'message', function () {
  function Controller($scope, $modalInstance, type, message) {
    _classCallCheck(this, Controller);

    this.$scope = $scope;
    this.$uibModalInstance = $modalInstance;
    this.type = type;
    this.message = message;
  }

  _createClass(Controller, [{
    key: 'closeModal',
    value: function closeModal(result) {
      this.$uibModalInstance.close(result);
    }
  }]);

  return Controller;
}()];
},{}],93:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<div class="modal-header">\n  <h4 ng-if="$ctrl.type == \'confirm\'" class="modal-title">Confirmation</h4>\n  <h4 ng-if="$ctrl.type == \'info\'" class="modal-title">Information</h4>\n</div>\n<div class="modal-body">\n  <p class="text-center">{{$ctrl.message}}</p>\n</div>\n<div class="modal-footer">\n  <button ng-if="$ctrl.type == \'info\'" type="button" ng-click="$ctrl.closeModal(true)" class="btn btn-default" data-dismiss="modal">Ok</button>\n  <button ng-if="$ctrl.type == \'confirm\'" type="button" ng-click="$ctrl.closeModal(false)" class="btn btn-default" data-dismiss="modal">No</button>\n  <button ng-if="$ctrl.type == \'confirm\'" type="button" ng-click="$ctrl.closeModal(true)" class="btn btn-primary" data-dismiss="modal">Yes</button>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":94,"./controller.js":109}],22:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _confirmDialog = require('../components/confirm-dialog');

var _confirmDialog2 = _interopRequireDefault(_confirmDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = ['$modal', '$rootScope', function () {
  function Service($modal, $rootScope) {
    _classCallCheck(this, Service);

    this.$uibModal = $modal;
    this.$rootScope = $rootScope;
  }

  _createClass(Service, [{
    key: 'open',
    value: function open(dialog, inputs, size) {
      var options = {
        size: size || 'md',
        template: dialog.template,
        controller: dialog.controller,
        controllerAs: '$ctrl',
        backdrop: 'static'
      };

      if (inputs) {
        var resolve = {};

        Object.keys(inputs).forEach(function (key) {
          resolve[key] = function () {
            return inputs[key];
          };
        });

        Object.assign(options, { resolve: resolve });
      }

      return this.$uibModal.open(options).result;
    }
  }, {
    key: 'confirm',
    value: function confirm(message) {
      var inputs = {
        type: 'confirm',
        message: message
      };

      return this.open(_confirmDialog2.default, inputs, 'sm');
    }
  }, {
    key: 'info',
    value: function info(message) {
      var inputs = {
        type: 'info',
        message: message
      };

      return this.open(_confirmDialog2.default, inputs, 'sm');
    }
  }]);

  return Service;
}()];
},{"../components/confirm-dialog":93}],23:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = ['$rootScope', function () {
  function WebsocketService($rootScope) {
    _classCallCheck(this, WebsocketService);

    this.$rootScope = $rootScope;
    this.init();
  }

  _createClass(WebsocketService, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.registers = []; //{id, topic, handler}

      var arr = window.location.href.split("/");
      this.url = arr[0] + "//" + arr[2];

      this.socket = io(this.url);
      this.socket.on('connect', function () {
        var token = window.localStorage.getItem('token');
        _this.socket.emit('authenticate', { token: token }).on('authenticated', function () {
          console.log('authenticated socket');
        }).on('unauthorized', function (msg) {
          console.log("unauthorized: " + JSON.stringify(msg.data));
        });
      });

      this.socket.on('event', function (messsage) {
        var data = JSON.parse(messsage);

        var doDispatch = function doDispatch(register) {
          if (register.topic !== data.topic) return;
          if (!register.handler || !angular.isFunction(register.handler)) return;
          register.handler(data.data);
        };
        _.forEach(_this.registers, function (register) {
          return doDispatch(register);
        });
      });

      this.socket.on('disconnect', function (socket) {
        console.log('disconnected socket');
      });
    }
  }, {
    key: "register",
    value: function register(topic, handler) {
      var id = new Date().getTime();
      this.registers.push({
        id: id,
        topic: topic,
        handler: handler
      });
      return id;
    }
  }, {
    key: "unregister",
    value: function unregister(id) {
      _.remove(this.registers, function (item) {
        return item.id === id;
      });
    }
  }, {
    key: "socketId",
    get: function get() {
      return this.socket && this.socket.id;
    }
  }]);

  return WebsocketService;
}()];
},{}],91:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseApi = function () {
  function BaseApi($http, $q, posgram, resource) {
    _classCallCheck(this, BaseApi);

    this.$http = $http;
    this.$q = $q;
    this.posgram = posgram;
    this.endpoint = this.posgram.config.api + '/' + resource;
  }

  _createClass(BaseApi, [{
    key: 'findById',
    value: function findById(id) {
      var _this = this;

      var url = this.endpoint + '/' + id;

      return this.$q(function (resolve, reject) {
        _this.$http.get(url).then(function (res) {
          resolve(res.data);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: 'find',
    value: function find(query, options) {
      var _this2 = this;

      var url = '' + this.endpoint;
      if (query) url = url + '?' + query;
      if (options) {
        if (url.indexOf('?') < 0) url = url + '?';
        if (options.page) url = url + '&page=' + options.page;
        if (options.limit) url = url + '&limit=' + options.limit;
      }

      return this.$q(function (resolve, reject) {
        _this2.$http.get(url).then(function (res) {
          resolve(res.data);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: 'create',
    value: function create(data) {
      var _this3 = this;

      var url = '' + this.endpoint;

      return this.$q(function (resolve, reject) {
        _this3.$http.post(url, data).then(function (res) {
          resolve(res.data);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: 'update',
    value: function update(id, data) {
      var _this4 = this;

      var url = this.endpoint + '/' + id;

      return this.$q(function (resolve, reject) {
        _this4.$http.put(url, data).then(function (res) {
          resolve(res.data);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: 'delete',
    value: function _delete(id) {
      var _this5 = this;

      var url = this.endpoint + '/' + id;

      return this.$q(function (resolve, reject) {
        _this5.$http.delete(url).then(function (res) {
          resolve(res.data);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }]);

  return BaseApi;
}();

exports.default = BaseApi;
},{}],24:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseApi = require('./base-api');

var _baseApi2 = _interopRequireDefault(_baseApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$http', '$q', 'posgram', function (_BaseApi) {
  _inherits(AuthApi, _BaseApi);

  function AuthApi($http, $q, posgram) {
    _classCallCheck(this, AuthApi);

    return _possibleConstructorReturn(this, (AuthApi.__proto__ || Object.getPrototypeOf(AuthApi)).call(this, $http, $q, posgram, 'auth'));
  }

  _createClass(AuthApi, [{
    key: 'login',
    value: function login(username, password) {
      return this.$http.post(this.endpoint + '/login', null, {
        headers: {
          'Authorization': 'Basic ' + window.btoa(username + ':' + password)
        }
      });
    }
  }]);

  return AuthApi;
}(_baseApi2.default)];
},{"./base-api":91}],25:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseApi = require('./base-api');

var _baseApi2 = _interopRequireDefault(_baseApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$http', '$q', 'posgram', function (_BaseApi) {
  _inherits(TenantApi, _BaseApi);

  function TenantApi($http, $q, posgram) {
    _classCallCheck(this, TenantApi);

    return _possibleConstructorReturn(this, (TenantApi.__proto__ || Object.getPrototypeOf(TenantApi)).call(this, $http, $q, posgram, 'tenants'));
  }

  return TenantApi;
}(_baseApi2.default)];
},{"./base-api":91}],26:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseApi = require('./base-api');

var _baseApi2 = _interopRequireDefault(_baseApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$http', '$q', 'posgram', function (_BaseApi) {
  _inherits(UserApi, _BaseApi);

  function UserApi($http, $q, posgram) {
    _classCallCheck(this, UserApi);

    return _possibleConstructorReturn(this, (UserApi.__proto__ || Object.getPrototypeOf(UserApi)).call(this, $http, $q, posgram, 'users'));
  }

  return UserApi;
}(_baseApi2.default)];
},{"./base-api":91}],27:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseApi = require('./base-api');

var _baseApi2 = _interopRequireDefault(_baseApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$http', '$q', 'posgram', function (_BaseApi) {
  _inherits(MenuApi, _BaseApi);

  function MenuApi($http, $q, posgram) {
    _classCallCheck(this, MenuApi);

    return _possibleConstructorReturn(this, (MenuApi.__proto__ || Object.getPrototypeOf(MenuApi)).call(this, $http, $q, posgram, 'menus'));
  }

  return MenuApi;
}(_baseApi2.default)];
},{"./base-api":91}],28:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseApi = require('./base-api');

var _baseApi2 = _interopRequireDefault(_baseApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$http', '$q', 'posgram', function (_BaseApi) {
  _inherits(CategoryApi, _BaseApi);

  function CategoryApi($http, $q, posgram) {
    _classCallCheck(this, CategoryApi);

    return _possibleConstructorReturn(this, (CategoryApi.__proto__ || Object.getPrototypeOf(CategoryApi)).call(this, $http, $q, posgram, 'categories'));
  }

  return CategoryApi;
}(_baseApi2.default)];
},{"./base-api":91}],29:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseApi = require('./base-api');

var _baseApi2 = _interopRequireDefault(_baseApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = ['$http', '$q', 'posgram', function (_BaseApi) {
  _inherits(OrderApi, _BaseApi);

  function OrderApi($http, $q, posgram) {
    _classCallCheck(this, OrderApi);

    return _possibleConstructorReturn(this, (OrderApi.__proto__ || Object.getPrototypeOf(OrderApi)).call(this, $http, $q, posgram, 'orders'));
  }

  return OrderApi;
}(_baseApi2.default)];
},{"./base-api":91}],10:[function(require,module,exports) {
'use strict';

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var _app = require('./components/app');

var _app2 = _interopRequireDefault(_app);

var _login = require('./components/login');

var _login2 = _interopRequireDefault(_login);

var _dashboard = require('./components/dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _tenantList = require('./components/tenant-list');

var _tenantList2 = _interopRequireDefault(_tenantList);

var _tenantDetail = require('./components/tenant-detail');

var _tenantDetail2 = _interopRequireDefault(_tenantDetail);

var _cart = require('./components/cart');

var _cart2 = _interopRequireDefault(_cart);

var _orderList = require('./components/order-list');

var _orderList2 = _interopRequireDefault(_orderList);

var _orderDetail = require('./components/order-detail');

var _orderDetail2 = _interopRequireDefault(_orderDetail);

var _menuList = require('./components/menu-list');

var _menuList2 = _interopRequireDefault(_menuList);

var _categoryList = require('./components/category-list');

var _categoryList2 = _interopRequireDefault(_categoryList);

var _userList = require('./components/user-list');

var _userList2 = _interopRequireDefault(_userList);

var _authService = require('./services/auth-service');

var _authService2 = _interopRequireDefault(_authService);

var _dialogService = require('./services/dialog-service');

var _dialogService2 = _interopRequireDefault(_dialogService);

var _websocketService = require('./services/websocket-service');

var _websocketService2 = _interopRequireDefault(_websocketService);

var _authApi = require('./api/auth-api');

var _authApi2 = _interopRequireDefault(_authApi);

var _tenantApi = require('./api/tenant-api');

var _tenantApi2 = _interopRequireDefault(_tenantApi);

var _userApi = require('./api/user-api');

var _userApi2 = _interopRequireDefault(_userApi);

var _menuApi = require('./api/menu-api');

var _menuApi2 = _interopRequireDefault(_menuApi);

var _categoryApi = require('./api/category-api');

var _categoryApi2 = _interopRequireDefault(_categoryApi);

var _orderApi = require('./api/order-api');

var _orderApi2 = _interopRequireDefault(_orderApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('posgram', ['ui.router', 'ui.bootstrap']).component('posApp', _app2.default).component('posLogin', _login2.default).component('posDashboard', _dashboard2.default).component('posTenantList', _tenantList2.default).component('posTenantDetail', _tenantDetail2.default).component('posCart', _cart2.default).component('posOrderList', _orderList2.default).component('posOrderDetail', _orderDetail2.default).component('posMenuList', _menuList2.default).component('posCategoryList', _categoryList2.default).component('posUserList', _userList2.default).service('AuthService', _authService2.default).service('DialogService', _dialogService2.default).service('WebsocketService', _websocketService2.default).service('AuthApi', _authApi2.default).service('TenantApi', _tenantApi2.default).service('UserApi', _userApi2.default).service('MenuApi', _menuApi2.default).service('CategoryApi', _categoryApi2.default).service('OrderApi', _orderApi2.default).constant('posgram', { config: _config2.default }).config(_route2.default).config(['$locationProvider', function ($locationProvider) {
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
.run(['$rootScope', '$window', '$state', '$timeout', 'posgram', 'AuthService', function ($rootScope, $window, $state, $timeout, posgram, AuthService) {
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
}]);

angular.element(document).ready(function () {
  angular.bootstrap(document, ['posgram']);
});
},{"./config":19,"./route":20,"./components/app":65,"./components/login":66,"./components/dashboard":67,"./components/tenant-list":68,"./components/tenant-detail":69,"./components/cart":70,"./components/order-list":71,"./components/order-detail":72,"./components/menu-list":73,"./components/category-list":74,"./components/user-list":75,"./services/auth-service":21,"./services/dialog-service":22,"./services/websocket-service":23,"./api/auth-api":24,"./api/tenant-api":25,"./api/user-api":26,"./api/menu-api":27,"./api/category-api":28,"./api/order-api":29}],124:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '49349' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[124,10], null)
//# sourceMappingURL=/app.e6b7ef8d.map