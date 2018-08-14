import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

import Login from '../components/login';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import Dashboard from '../components/dashboard';
import Order from '../components/order';
import Kitchen from '../components/kitchen';
import Settings from '../components/settings';

export default StackNavigator({
  LOGIN: { screen: Login },
  APP: { screen: StackNavigator({
    MAIN: { screen: DrawerNavigator({
        ORDER: { screen: Order },
        DASHBOARD: { screen: Dashboard },
        KITCHEN: { screen: Kitchen },
        SETTINGS: { screen: Settings }
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