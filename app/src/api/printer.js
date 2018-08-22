import { AsyncStorage } from 'react-native';
import Config from '../config';

const get = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + '/printers', {
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
        reject('Retrieved printers failed');
      });
    });
  });
}

const create = (data) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + '/printers', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject('Created printer failed');
      });
    });
  });
}

const update = (id, data) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + `/printers/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token
        },
        body: JSON.stringify(data)
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject('Updated printer failed');
      });
    });
  });
}

export default {
  get,
  create,
  update
}
