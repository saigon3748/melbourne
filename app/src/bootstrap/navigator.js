import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import Login from '../components/login';
import Dashboard from '../components/dashboard';
import Order from '../components/order';
import Transactions from '../components/transactions';
import Cooks from '../components/cooks';
import Printers from '../components/printers';

export default createStackNavigator({
  LOGIN: { screen: Login },
  APP: { screen: createStackNavigator({
    MAIN: { screen: createDrawerNavigator({
        ORDER: { screen: Order },
        TRANSACTIONS: { screen: Transactions },
        COOKS: { screen: Cooks },
        PRINTERS: { screen: Printers }
      }, {
        gesturesEnabled: false,
        contentComponent: Sidebar
      })
    }
  }, {
    headerMode: 'float',
    navigationOptions: Topbar
  })
 }
}, {
  headerMode: 'none',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0
    }
  })
})