export default [
  '$rootScope', '$state', '$timeout', 'posgram',
  class Controller {
    constructor($rootScope, $state, $timeout, posgram) {
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.posgram = posgram;
      $timeout(function() {
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
              display: false,
            }
          }
        });        
      }, 0);
    }

    get isLoggedIn() {
      return this.$rootScope.isLoggedIn;
    }

    get isSudo() {
      return this.$rootScope.global.user.name === "sudo";
    }

    get loggedUser() {
      return this.$rootScope.global.user;
    }

    get tenant() {
      return this.$rootScope.global.user.tenant;
    }

    logout() {
      window.localStorage.removeItem('token');
      this.$rootScope.global.user = null;
      this.$rootScope.isLoggedIn = false;
      this.$state.go(this.posgram.config.states.LOGIN);
    }    
  }
]