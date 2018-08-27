import React from 'react';
import { AsyncStorage, ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 30, 
    margin: 10
  },

  logo: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 50
  },

  background: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: "#fff",
    justifyContent: 'space-between'
  }  
});

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('payload', (err, payload) => {
      if (!payload) return;
      this.setState({
        isSignedIn: true,
        payload: JSON.parse(payload)
      });
    });
  }

  render() {
    if (!this.state.isSignedIn) return null;

    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f3f4'}}>
        <List style={{marginTop: 40}}>
          <ListItem icon>
            <Left>
              <MaterialIcons name='assignment' color={'#6c757d'} size={20} />
            </Left>
            <Body>
              <TouchableOpacity onPress={this.props.gotoOrder}>
                <Text>Order</Text>
              </TouchableOpacity>
            </Body>
            <Right>
            </Right>
          </ListItem>        
          <ListItem icon>
            <Left>
              <MaterialIcons name='assessment' color={'#6c757d'} size={20} />
            </Left>
            <Body>
              <TouchableOpacity onPress={this.props.gotoReport}>
                <Text>Report</Text>
              </TouchableOpacity>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <MaterialIcons name='restaurant-menu' color={'#6c757d'} size={20} />
            </Left>
            <Body>
              <TouchableOpacity onPress={this.props.gotoCooks}>
                <Text>Cooks</Text>
              </TouchableOpacity>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <MaterialIcons name='print' color={'#6c757d'} size={20} />
            </Left>
            <Body>
              <TouchableOpacity onPress={this.props.gotoPrinters}>
                <Text>Printers</Text>
              </TouchableOpacity>
            </Body>
            <Right>
            </Right>
          </ListItem>
        </List>

        <View style={{flex: 1}}/>

        <View style={{marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10}}>
          <MaterialIcons name='account-circle' color={'#6c757d'} size={60} style={{textAlign: 'center', marginBottom: 20}} />
          <Text style={{textAlign: 'center', marginBottom: 40}}>
            {(() => { return this.state.payload.firstName + " " + this.state.payload.lastName })()}
          </Text>
          <Button full onPress={this.props.logout} style={{backgroundColor: '#2177b4'}}><Text> SIGN OUT </Text></Button>
        </View>
      </View>
    );
  }
}

Sidebar.propTypes = {
};

export default Sidebar;

