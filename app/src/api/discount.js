import { AsyncStorage } from 'react-native';
import Config from '../config';

const get = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token', (err, token) => {
      fetch(Config.API + '/discounts', {
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
        reject('Get discounts failed');
      });
    });
  });
}

export default {
  get
}
