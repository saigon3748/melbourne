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
        reject('Retrieved orders failed');
      });
    });
  });
}

const markCooked = (ids) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + '/cooks/cooked', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token
        },
        body: JSON.stringify(ids)
      })
      .then(response => resolve(response))
      .catch(error => {
        reject('Marked cooked failed');
      });
    });
  });
}

const markUncooked = (ids) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + '/cooks/uncooked', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token
        },
        body: JSON.stringify(ids)
      })
      .then(response => resolve(response))
      .catch(error => {
        reject('Marked uncooked failed');
      });
    });
  });
}

export default {
  getToday,
  markCooked,
  markUncooked
}
