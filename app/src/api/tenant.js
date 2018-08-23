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

export default {
  getById
}
