export default ['$rootScope',
  class WebsocketService {
    constructor($rootScope) {
      this.$rootScope = $rootScope;
      this.init();
    }

    get socketId() {
      return this.socket && this.socket.id;
    }

    init() {
      this.registers = []; //{id, topic, handler}

      let arr = window.location.href.split("/");
      this.url = arr[0] + "//" + arr[2];

      this.socket = io(this.url);
      this.socket.on('connect', () => {
        let token = window.localStorage.getItem('token');
        this.socket.emit('authenticate', { token: token })
          .on('authenticated', function () {
            console.log('authenticated socket');
          })
          .on('unauthorized', function (msg) {
            console.log("unauthorized: " + JSON.stringify(msg.data));
          })
      })

      this.socket.on('event', messsage => {
        let data = JSON.parse(messsage);

        let doDispatch = (register) => {
          if (register.topic !== data.topic) return;
          if (!register.handler || !angular.isFunction(register.handler)) return;
          register.handler(data.data);
        }
        _.forEach(this.registers, register => doDispatch(register));
      });

      this.socket.on('disconnect', (socket) => {
        console.log('disconnected socket');
      });
    }

    register(topic, handler) {
      let id = new Date().getTime();
      this.registers.push({
        id: id,
        topic: topic,
        handler: handler
      });
      return id;
    }

    unregister(id) {
      _.remove(this.registers, item => {
        return item.id === id;
      });
    }
  }
]