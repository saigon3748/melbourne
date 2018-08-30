import React from 'react';
import { AsyncStorage } from 'react-native';
import { Dimensions, ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label } from 'native-base';
import { AuthApi } from '../../api';

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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  login(username, password) {
    AuthApi.login(username, password)
      .then(result => {
        this.setState({
          username: "",
          password: ""
        }, () => {
          AsyncStorage.setItem('token', result.token, () => {
            AsyncStorage.setItem('payload', JSON.stringify(result.payload), () => {
              this.props.navigation.navigate('MAIN');
            });
          });
        });
      })
      .catch(error => {
        alert(error);
      })
  }

  render() {
    const {height: screenHeight} = Dimensions.get('window');
    
    return (
      <Container style={{backgroundColor: '#fff'}}>
        <Content>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#fff',
            height: screenHeight
          }}>
            <View style={{flex: 1}}></View>
            <View style={{width: 280}}>
              <Image style={{marginLeft: 40, marginTop: 100, width: 200, height: 70}} source={{uri: 'data:image/png;base64,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'}}/>
              <Text style={{marginTop: 50}}>Username</Text>
              <TextInput autoCapitalize='none' style={{marginTop: 10, height: 35, borderColor: '#d2d3d4', borderWidth: 1}} onChangeText={username => this.setState({ username })}/>          
              <Text style={{marginTop: 20}}>Password</Text>
              <TextInput secureTextEntry style={{marginTop: 10, height: 35, borderColor: '#d2d3d4', borderWidth: 1}} onChangeText={password => this.setState({ password })}/>          
              <Button full style={{marginTop: 30, backgroundColor: '#2177b4'}} onPress={() => this.login(this.state.username, this.state.password)}><Text> SIGN IN </Text></Button>
              <Text style={{marginLeft: 100, marginTop: 100}}>&copy; 2018 retailr</Text>
            </View>
            <View style={{flex: 1}}></View>        
          </View>
        </Content>
      </Container>
    );
  }
}

Login.propTypes = {
};

export default Login;
