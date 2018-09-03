import _ from 'lodash';
import moment from "moment";
import React from 'react';
import { Dimensions, NativeModules, AsyncStorage, Alert, ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label, Toast } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MenuApi, OrderApi, TenantApi, CookApi } from '../../api';
import { Helper } from '../../utils';

class Cooks extends React.Component {
  constructor(props) {
    super(props);
    this.intervalId;
    this.state = {
      isSignedIn: false,
      cooks: []
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('payload', (err, payload) => {
      if (!payload) return;
      this.payload = JSON.parse(payload);

      this.setState({
        isSignedIn: true
      });   

      TenantApi.getById(this.payload.tenant._id)
        .then(result => {
          this.tenant = result;

          CookApi.getToday()
            .then(result => {
              this.setState({
                cooks: result
              });
            })
        })
    });
  }

  componentDidMount() {
    CookApi.getToday()
      .then(result => {
        this.setState({
          cooks: result
        });
      })

    this.intervalId = setInterval(() => {
      CookApi.getToday()
        .then(result => {
          this.setState({
            cooks: result
          });
        })
    }, 1000 * 60 * 5)
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  refresh() {
    CookApi.getToday()
      .then(result => {
        this.setState({
          cooks: result
        });
      })    
  }

  completeAll() {
    Alert.alert(
      'Confirmation', 
      'Do you want to mark completed all?',
      [ { text: 'Cancel' }, 
        { text: 'OK', onPress: () => {
          CookApi.completeAll()
            .then(result => {
              this.setState({
                cooks: []
              });

              CookApi.getToday()
                .then(result => {
                  this.setState({
                    cooks: result
                  });
                })
            })
        }} ]
    );
  }

  complete(id) {
    let cooks = [...this.state.cooks];
    let order = _.find(cooks, item => {
      return item._id === id;
    });

    if (order) {
      order.isCooked = true;
    }

    this.setState({
      cooks: cooks
    });

    setTimeout(() => {
      let order = _.find(this.state.cooks, item => {
        return item._id === id;
      });

      if (!order) return;
      if (!order.isCooked) return;

      CookApi.complete(id)
        .then(result => {
          let cooks = _.filter(this.state.cooks, item => {
            return item._id != id;
          });

          this.setState({
            cooks: cooks
          });
        })
    }, 1000 * 5)
  }

  undo(id) {
    CookApi.undo(id)
      .then(result => {
        let cooks = [...this.state.cooks];
        let order = _.find(cooks, item => {
          return item._id === id;
        });

        if (order) {
          order.isCooked = false;
        }

        this.setState({
          cooks: cooks
        });
      })
  }

  getItem(item) {
    let text = "";

    text += `${item.quantity} x ${item.menuName}`;

    if (item.addons && item.addons.length > 0) {
      text += " ( ";
      item.addons.forEach(addon => {
        text += `${addon.quantity} x ${addon.name}  `;
      })
      text += ") ";
    } else {
      text += "  ";
    }

    return text;
  }

  render() {
    const {height: screenHeight} = Dimensions.get('window');

    return (
      <Container style={{backgroundColor: '#fff'}}>
        <Content>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            height: screenHeight - 65
          }}>
            <List style={{marginTop: 40}}>
              <ListItem icon>
                <Left>
                  <MaterialIcons name='assignment' color={'#6c757d'} size={20} />            
                </Left>
                <Body>
                  <Text>Cooks</Text>
                </Body>
                <Right>
                </Right>
              </ListItem>
            </List>

            <ScrollView style={{flex: 1, flexDirection: 'column', marginLeft: 30, marginRight: 10, marginBottom: 10}}>
              <List>
                {this.state.cooks.map(item => (
                  <ListItem key={item._id} style={{height: 50}}>
                    <Body>
                      <View style={{flexDirection: "row"}}>
                        <Text style={{width: 50}}>#{item.orderRef}</Text>
                        <Text style={{flex: 1}}>{this.getItem(item)}</Text>
                        <Text style={{width: 50}}>
                          {(() => { return moment(item.localCreatedAt).format("HH:mm") })()}
                        </Text>
                        <View style={{width: 130, alignItems: 'center'}}>
                          <View style={{width: 110, alignItems: 'center'}}>
                            {(() => {
                              if (item.isCooked) {
                                return (
                                  <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.undo(item._id)}}><Text> UNDO </Text></Button>                      
                                )
                              } else {
                                return (
                                  <Button full small style={{backgroundColor: '#DE544E'}} onPress={() => {this.complete(item._id)}}><Text> COMPLETE </Text></Button>                      
                                )
                              }
                            })()}
                          </View>
                        </View>
                      </View>
                    </Body>
                  </ListItem>
                ))}
              </List>
            </ScrollView>

            <View style={{height: 65, flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
              <View style={{width: 10}}></View>
              <View style={{flex: 1}}>
                <Button full style={{marginTop: 10, backgroundColor: '#6c757d'}} onPress={() => this.refresh()}><Text> REFRESH </Text></Button>
              </View>
              <View style={{width: 10}}></View>
              <View style={{flex: 1}}>
                <Button full style={{marginTop: 10, backgroundColor: '#2177b4'}} onPress={() => this.completeAll()}><Text> COMPLETE ALL </Text></Button>
              </View>
              <View style={{width: 10}}></View>
            </View>
          </View>      
        </Content>
      </Container>            
    );
  }
}

Cooks.propTypes = {
};

export default Cooks;
