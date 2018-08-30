import React from 'react'
import { Animated, Easing } from 'react-native'
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label } from 'native-base';
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const menu = (navigation) => {
  return (
    <Button transparent style={{padding: 10}} onPress={navigation.toggleDrawer}>
      <MaterialIcons name='menu' size={20} color={"#F5F8F9"} />
    </Button>
  )
}

const order = (navigation) => {
  let tenantName = "";
  if (navigation.state.params && navigation.state.params.payload) {
    tenantName = navigation.state.params.payload.tenant.name;
  }

  return (
    <Text style={{color: '#F5F8F9', marginRight: 10}}>
      {(() => { return tenantName })()}
    </Text>
  )
}

export default ({navigation}) => ({
  headerStyle: {backgroundColor: '#13699A'},
  title: 'retailr',
  headerTintColor: '#F5F8F9',
  gesturesEnabled: false,
  headerLeft: menu(navigation),
  headerRight: order(navigation)
})
