import { createStore, combineReducers } from 'redux';
import router from './router';

export default createStore(combineReducers({
  router
}));
