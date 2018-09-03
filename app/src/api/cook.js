import { AsyncStorage } from 'react-native';
import Config from '../config';

const getToday = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + '/cooks/today', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token
        }
      })
      .then(response => response.json())
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject('Get cooks failed');
      });
    });
  });
}

const completeAll = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + `/cooks/complete`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token
        }
      })
      .then(response => resolve(response))
      .catch(error => {
        reject('Marked all completed failed');
      });
    });
  });
}

const complete = (id) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + `/cooks/complete/${id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token
        }
      })
      .then(response => resolve(response))
      .catch(error => {
        reject('Marked completed failed');
      });
    });
  });
}

const undo = (id) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + `/cooks/undo/${id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token
        }
      })
      .then(response => resolve(response))
      .catch(error => {
        reject('Marked incompleted failed');
      });
    });
  });
}

export default {
  getToday,
  completeAll,
  complete,
  undo
}
