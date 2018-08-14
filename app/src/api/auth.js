import base64 from 'base-64';
import Config from '../config';

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    fetch(Config.API + '/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode(username + ':' + password)        
      }
    })
    .then(response => response.json())
    .then(result => {
      let payload = result.token.split('.')[1];
      payload = payload.replace('-', '+').replace('_', '/');
      payload = JSON.parse(base64.decode(payload));

      resolve({
        token: result.token,
        payload: payload
      });
    })
    .catch(error => {
      reject('Incorrect login ID or password');
    });    
  });
}

export default {
  login
}
