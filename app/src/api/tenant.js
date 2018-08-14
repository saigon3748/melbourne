import { AsyncStorage } from 'react-native';
import Config from '../config';

const getById = (id) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + `/tenants/${id}`, {
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
        reject('Received company failed');
      });
    });
  });
}

const updateById = (id, data) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + `/tenants/updateById/${id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + token
        },
        body: JSON.stringify(data)
      })
      .then(result => resolve(result))
      .catch(error => {
        reject('Updated company failed');
      });
    });
  });
}

export default {
  getById,
  updateById
}
