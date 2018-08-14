import { AsyncStorage } from 'react-native';
import Config from '../config';

const getToday = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + '/kitchens/today', {
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

const markCompleted = (ids) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + '/kitchens/markCompleted', {
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
        reject('Marked completed failed');
      });
    });
  });
}

const markUncompleted = (ids) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + '/kitchens/markUncompleted', {
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
        reject('Marked uncompleted failed');
      });
    });
  });
}

export default {
  getToday,
  markCompleted,
  markUncompleted
}
