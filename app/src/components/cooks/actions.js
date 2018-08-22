
export default (dispatch) => {
  return {
    gotoCashier: id => {
      dispatch({
        type: "CASHIER"
      })
    },
    print: id => {
      dispatch({
        type: "PRINT"
      })
    }
  }  
};

