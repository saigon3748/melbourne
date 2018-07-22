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
    template: '<pos-dashboard/>'
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
},{}],53:[function(require,module,exports) {

},{}],54:[function(require,module,exports) {
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
},{}],38:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">\n  <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">\n    <span data-feather="airplay"></span> posgram\n  </a>\n  <ul class="navbar-nav px-3">\n    <li class="nav-item text-nowrap">\n      <a class="nav-link" href="#">Sign out</a>\n    </li>\n  </ul>\n</nav>\n\n<div class="container-fluid">\n  <div ui-view></div>\n</div>\n\n';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":53,"./controller.js":54}],56:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = ['$rootScope', '$state', '$timeout', 'posgram', 'AuthApi', function () {
  function Controller($rootScope, $state, $timeout, posgram, AuthApi) {
    _classCallCheck(this, Controller);

    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.posgram = posgram;
    this.AuthApi = AuthApi;
  }

  _createClass(Controller, [{
    key: 'login',
    value: function login() {
      var _this = this;

      this.AuthApi.login(this.username, this.password).then(function (result) {
        if (!result.token) return toastr.error(result.error);

        window.localStorage.setItem('token', result.token);

        var payload = result.token.split('.')[1];
        payload = payload.replace('-', '+').replace('_', '/');
        payload = JSON.parse(window.atob(payload));

        _this.$rootScope.global.user = payload;
        _this.$rootScope.isLoggedIn = true;
        _this.$state.go(_this.posgram.config.states.HOME);
      });
    }
  }]);

  return Controller;
}()];
},{}],40:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<div class="text-center">\n  <form class="form-signin">\n    <input ng-model="$ctrl.username" id="username" class="form-control" placeholder="Login ID" required autofocus>\n    <input ng-model="$ctrl.password" type="password" id="password" class="form-control" placeholder="Password" required>\n    <button class="btn btn-lg btn-primary btn-block" ng-click="$ctrl.login()">Sign in</button>\n  </form>\n</div>';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":53,"./controller.js":56}],55:[function(require,module,exports) {
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
},{}],39:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '<div class="row">\n  <nav class="col-md-2 d-none d-md-block bg-light sidebar">\n    <div class="sidebar-sticky">\n      <ul class="nav flex-column">\n        <li class="nav-item">\n          <a class="nav-link active" href="#">\n            <span data-feather="home"></span>\n            Dashboard <span class="sr-only">(current)</span>\n          </a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" href="#">\n            <span data-feather="file"></span>\n            Orders\n          </a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" href="#">\n            <span data-feather="shopping-cart"></span>\n            Products\n          </a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" href="#">\n            <span data-feather="users"></span>\n            Customers\n          </a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" href="#">\n            <span data-feather="bar-chart-2"></span>\n            Reports\n          </a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" href="#">\n            <span data-feather="layers"></span>\n            Integrations\n          </a>\n        </li>\n      </ul>\n\n      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">\n        <span>Saved reports</span>\n        <a class="d-flex align-items-center text-muted" href="#">\n          <span data-feather="plus-circle"></span>\n        </a>\n      </h6>\n      <ul class="nav flex-column mb-2">\n        <li class="nav-item">\n          <a class="nav-link" href="#">\n            <span data-feather="file-text"></span>\n            Current month\n          </a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" href="#">\n            <span data-feather="file-text"></span>\n            Last quarter\n          </a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" href="#">\n            <span data-feather="file-text"></span>\n            Social engagement\n          </a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" href="#">\n            <span data-feather="file-text"></span>\n            Year-end sale\n          </a>\n        </li>\n      </ul>\n    </div>\n  </nav>\n\n  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">\n    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">\n      <h3>Dashboard</h3>\n      <div class="btn-toolbar mb-2 mb-md-0">\n        <div class="btn-group mr-2">\n          <button class="btn btn-sm btn-outline-secondary">Share</button>\n          <button class="btn btn-sm btn-outline-secondary">Export</button>\n        </div>\n        <button class="btn btn-sm btn-outline-secondary dropdown-toggle">\n          <span data-feather="calendar"></span>\n          This week\n        </button>\n      </div>\n    </div>\n\n    <canvas class="my-4" id="myChart" width="900" height="380"></canvas>\n\n    <h3>Section title</h3>\n    <div class="table-responsive">\n      <table class="table table-striped">\n        <thead>\n          <tr>\n            <th>#</th>\n            <th>Header</th>\n            <th>Header</th>\n            <th>Header</th>\n            <th>Header</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>1,001</td>\n            <td>Lorem</td>\n            <td>ipsum</td>\n            <td>dolor</td>\n            <td>sit</td>\n          </tr>\n          <tr>\n            <td>1,002</td>\n            <td>amet</td>\n            <td>consectetur</td>\n            <td>adipiscing</td>\n            <td>elit</td>\n          </tr>\n          <tr>\n            <td>1,003</td>\n            <td>Integer</td>\n            <td>nec</td>\n            <td>odio</td>\n            <td>Praesent</td>\n          </tr>\n          <tr>\n            <td>1,003</td>\n            <td>libero</td>\n            <td>Sed</td>\n            <td>cursus</td>\n            <td>ante</td>\n          </tr>\n          <tr>\n            <td>1,004</td>\n            <td>dapibus</td>\n            <td>diam</td>\n            <td>Sed</td>\n            <td>nisi</td>\n          </tr>\n          <tr>\n            <td>1,005</td>\n            <td>Nulla</td>\n            <td>quis</td>\n            <td>sem</td>\n            <td>at</td>\n          </tr>\n          <tr>\n            <td>1,006</td>\n            <td>nibh</td>\n            <td>elementum</td>\n            <td>imperdiet</td>\n            <td>Duis</td>\n          </tr>\n          <tr>\n            <td>1,007</td>\n            <td>sagittis</td>\n            <td>ipsum</td>\n            <td>Praesent</td>\n            <td>mauris</td>\n          </tr>\n          <tr>\n            <td>1,008</td>\n            <td>Fusce</td>\n            <td>nec</td>\n            <td>tellus</td>\n            <td>sed</td>\n          </tr>\n          <tr>\n            <td>1,009</td>\n            <td>augue</td>\n            <td>semper</td>\n            <td>porta</td>\n            <td>Mauris</td>\n          </tr>\n          <tr>\n            <td>1,010</td>\n            <td>massa</td>\n            <td>Vestibulum</td>\n            <td>lacinia</td>\n            <td>arcu</td>\n          </tr>\n          <tr>\n            <td>1,011</td>\n            <td>eget</td>\n            <td>nulla</td>\n            <td>Class</td>\n            <td>aptent</td>\n          </tr>\n          <tr>\n            <td>1,012</td>\n            <td>taciti</td>\n            <td>sociosqu</td>\n            <td>ad</td>\n            <td>litora</td>\n          </tr>\n          <tr>\n            <td>1,013</td>\n            <td>torquent</td>\n            <td>per</td>\n            <td>conubia</td>\n            <td>nostra</td>\n          </tr>\n          <tr>\n            <td>1,014</td>\n            <td>per</td>\n            <td>inceptos</td>\n            <td>himenaeos</td>\n            <td>Curabitur</td>\n          </tr>\n          <tr>\n            <td>1,015</td>\n            <td>sodales</td>\n            <td>ligula</td>\n            <td>in</td>\n            <td>libero</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </main>\n</div>\n\n';

exports.default = {
  controller: _controller2.default,
  template: template
};
},{"fs":53,"./controller.js":55}],67:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseController = function BaseController() {
  _classCallCheck(this, BaseController);
};

exports.default = BaseController;
},{}],74:[function(require,module,exports) {
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
},{"../base-controller":67}],68:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":74}],57:[function(require,module,exports) {
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
},{"../base-controller":67,"../tenant-dialog":68}],41:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":57}],76:[function(require,module,exports) {
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
},{"../base-controller":67}],70:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":76}],59:[function(require,module,exports) {
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
},{"../base-controller":67,"../user-detail":70}],43:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":59}],75:[function(require,module,exports) {
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
},{"../base-controller":67}],69:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":75}],58:[function(require,module,exports) {
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
},{"../base-controller":67,"../receipt-dialog":69}],42:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":58}],60:[function(require,module,exports) {
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
},{"../base-controller":67,"../receipt-dialog":69}],44:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":60}],77:[function(require,module,exports) {
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
},{"../base-controller":67}],71:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":77}],61:[function(require,module,exports) {
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
},{"../base-controller":67,"../menu-dialog":71}],45:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":61}],62:[function(require,module,exports) {
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
},{"../base-controller":67,"../menu-dialog":71}],46:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":62}],79:[function(require,module,exports) {
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
},{"../base-controller":67}],73:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":79}],64:[function(require,module,exports) {
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
},{"../base-controller":67,"../category-dialog":73}],47:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":64}],78:[function(require,module,exports) {
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
},{"../base-controller":67}],72:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":78}],63:[function(require,module,exports) {
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
},{"../base-controller":67,"../user-dialog":72}],48:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":63}],65:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = ['$scope', '$uibModalInstance', 'type', 'message', function () {
  function Controller($scope, $uibModalInstance, type, message) {
    _classCallCheck(this, Controller);

    this.$scope = $scope;
    this.$uibModalInstance = $uibModalInstance;
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
},{}],50:[function(require,module,exports) {
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
},{"fs":53,"./controller.js":65}],21:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _confirmDialog = require('../components/confirm-dialog');

var _confirmDialog2 = _interopRequireDefault(_confirmDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.default = ['$uibModal', '$rootScope', function () {
  function Service($uibModal, $rootScope) {
    _classCallCheck(this, Service);

    this.$uibModal = $uibModal;
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
        _.forOwn(inputs, function (value, key) {
          _.set(resolve, key, function () {
            return value;
          });
        });

        if (_.size(resolve) > 0) {
          _.extend(options, { resolve: resolve });
        }
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
},{"../components/confirm-dialog":50}],22:[function(require,module,exports) {
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
},{}],51:[function(require,module,exports) {
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
},{}],23:[function(require,module,exports) {
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
},{"./base-api":51}],24:[function(require,module,exports) {
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
},{"./base-api":51}],25:[function(require,module,exports) {
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
},{"./base-api":51}],26:[function(require,module,exports) {
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
},{"./base-api":51}],27:[function(require,module,exports) {
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
},{"./base-api":51}],28:[function(require,module,exports) {
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
},{"./base-api":51}],10:[function(require,module,exports) {
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

angular.module('posgram', ['ui.router', 'angular-jwt']).component('posApp', _app2.default).component('posLogin', _login2.default).component('posDashboard', _dashboard2.default).component('posTenantList', _tenantList2.default).component('posTenantDetail', _tenantDetail2.default).component('posCart', _cart2.default).component('posOrderList', _orderList2.default).component('posOrderDetail', _orderDetail2.default).component('posMenuList', _menuList2.default).component('posCategoryList', _categoryList2.default).component('posUserList', _userList2.default).service('AuthApi', _authApi2.default).service('TenantApi', _tenantApi2.default).service('UserApi', _userApi2.default).service('MenuApi', _menuApi2.default).service('CategoryApi', _categoryApi2.default).service('OrderApi', _orderApi2.default).constant('posgram', { config: _config2.default }).config(_route2.default).config(['$locationProvider', function ($locationProvider) {
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
.run(['$rootScope', '$window', '$state', '$timeout', 'posgram', function ($rootScope, $window, $state, $timeout, posgram) {
  $rootScope.global = {};

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $window.scrollTo(0, 0);
    $timeout(feather.replace, 0);
    console.log('stateChangeSuccess');
  });

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    console.log('stateChangeStart');
    if (!$rootScope.isLoggedIn && toState.name != "Login") {
      event.preventDefault();
      $state.go(posgram.config.states.LOGIN);
    }
  });
}]);

angular.element(document).ready(function () {
  angular.bootstrap(document, ['posgram']);
});
},{"./config":19,"./route":20,"./components/app":38,"./components/login":40,"./components/dashboard":39,"./components/tenant-list":41,"./components/tenant-detail":43,"./components/cart":42,"./components/order-list":44,"./components/order-detail":45,"./components/menu-list":46,"./components/category-list":47,"./components/user-list":48,"./services/dialog-service":21,"./services/websocket-service":22,"./api/auth-api":23,"./api/tenant-api":24,"./api/user-api":25,"./api/menu-api":26,"./api/category-api":27,"./api/order-api":28}],81:[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '52972' + '/');
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
},{}]},{},[81,10], null)
//# sourceMappingURL=/app.e84d1df7.map