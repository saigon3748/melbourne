import { NativeModules } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Navigator from './navigator';
import { Helper } from '../utils';

const initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('LOGIN'));

const router = (state = initialState, action) => {
  let nextState = Navigator.router.getStateForAction(action, state);

  switch(action.type) {
    case "LOGIN":
      nextState = Navigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'LOGIN' }),
        state
      );
      break;
    case "MAIN":
      nextState = Navigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MAIN', params: { payload: action.payload } }),
        state
      );
      break;
    case "DASHBOARD":
      nextState = Navigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'DASHBOARD', params: { payload: action.payload } }),
        state
      );
      break;
    case "ORDER":
      nextState = Navigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ORDER', params: { payload: action.payload } }),
        state
      );
      break;
    case "KITCHEN":
      nextState = Navigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'KITCHEN', params: { payload: action.payload } }),
        state
      );
      break;
    case "SETTINGS":
      nextState = Navigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SETTINGS', params: { payload: action.payload } }),
        state
      );
      break;
    case "PRINT":
      let setting = {
        name: "TAX INVOICE",
        receiptPrinter: "TCP:F8:D0:27:2B:0F:93",
        header1: "NOODLE HOUSE",
        header2: "The Original Noodle",
        header3: "30 Elizabeth",
        header4: "Phone 123",
        header5: "ABN 456",
        footer1: "Thank you!"
      }

      let order = {
        code: "0052",
        createdAt: new Date(),
        items: [
          {name: "Hokkien Mee", quantity: 1, subtotal: 12.00},
          {name: "Natural Turquoise", quantity: 5, subtotal: 28.50},
          {name: "Prawn Cracker", quantity: 2, subtotal: 2.50},
        ],
        subtotal: 20.50,
        discount: 2.00,
        tax: 3.00,
        total: 27.50,
        cash: 30.00,
        change: 2.50
      }

      let receipt = Helper.getReceiptPrint(setting, order);
      NativeModules.RNPrinter.print(receipt)

      setTimeout(() => {
        let kitchen = Helper.getKitchenPrint(setting, order);
        NativeModules.RNPrinter.print(kitchen)
      }, 2000)

      break;
  }

  return nextState || state;
}

export default router;
