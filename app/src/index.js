import React from 'react';
import { Provider } from 'react-redux';
import App from './bootstrap/app'
import Store from './bootstrap/store'

export default () => (
  <Provider store = { Store }>
    <App />
  </Provider>
);
