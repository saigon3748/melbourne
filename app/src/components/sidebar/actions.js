import { AsyncStorage } from 'react-native';

export default (dispatch) => {
  return {
    logout: () => {
      AsyncStorage.multiRemove(['token', 'payload'], (err) => {
        dispatch({
          type: "LOGIN"
        })
      });
    },    
    gotoDashboard: () => {
      dispatch({
        type: "DASHBOARD"
      })
    },
    gotoOrder: () => {
      dispatch({
        type: "ORDER"
      })
    },
    gotoCooks: () => {
      dispatch({
        type: "COOKS"
      })
    },
    gotoPrinters: () => {
      dispatch({
        type: "PRINTERS"
      })
    }
  }  
};

