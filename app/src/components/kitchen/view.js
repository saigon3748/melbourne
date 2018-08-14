import _ from 'lodash';
import moment from "moment";
import React from 'react';
import { Dimensions, NativeModules, AsyncStorage, Alert, ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label, Toast } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MenuApi, OrderApi, TenantApi, KitchenApi } from '../../api';
import { Helper } from '../../utils';

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.intervalId;
    this.state = {
      isSignedIn: false,
      orders: []
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('payload', (err, payload) => {
      if (!payload) return;
      this.setState({
        isSignedIn: true
      });     
    });
  }

  componentDidMount() {
    KitchenApi.getToday()
      .then(result => {
        this.setState({
          orders: result
        });
      })

    this.intervalId = setInterval(() => {
      KitchenApi.getToday()
        .then(result => {
          this.setState({
            orders: result
          });
        })
    }, 1000 * 60 * 5)
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  onRefresh() {
    KitchenApi.getToday()
      .then(result => {
        this.setState({
          orders: result
        });
      })    
  }

  onCompleteAll() {
    Alert.alert(
      'Alert', 
      'Do you want to mark completed all?',
      [ { text: 'Cancel' }, 
        { text: 'OK', onPress: () => {
          let ids = this.state.orders.map(item => item._id);
          KitchenApi.markCompleted(ids)
            .then(result => {
              this.setState({
                orders: []
              });

              KitchenApi.getToday()
                .then(result => {
                  this.setState({
                    orders: result
                  });
                })
            })
        }} ]
    );
  }

  onComplete(id) {
    let orders = [...this.state.orders];
    let order = _.find(orders, item => {
      return item._id === id;
    });

    if (order) {
      order.isCompleted = true;
    }

    this.setState({
      orders: orders
    });

    setTimeout(() => {
      let order = _.find(this.state.orders, item => {
        return item._id === id;
      });

      if (!order.isCompleted) return;

      KitchenApi.markCompleted([id])
        .then(result => {
          let orders = _.filter(this.state.orders, item => {
            return item._id != id;
          });

          this.setState({
            orders: orders
          });
        })
    }, 1000 * 5)
  }

  onUncomplete(id) {
    KitchenApi.markUncompleted([id])
      .then(result => {
        let orders = [...this.state.orders];
        let order = _.find(orders, item => {
          return item._id === id;
        });

        if (order) {
          order.isCompleted = false;
        }

        this.setState({
          orders: orders
        });
      })
  }

  getNote(item) {
    let note = item.note || ''
    if (item.extra && item.extra.length > 0) {
      item.extra.forEach(extra => {
        note += ` - x${extra.quantity} ${extra.name}`
      })
    }

    return note;
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
        height: screenHeight - 50
      }}>
        <List style={{marginTop: 40}}>
          <ListItem icon>
            <Left>
              <MaterialIcons name='assignment' color={'#6c757d'} size={20} />            
            </Left>
            <Body>
              <Text>Today</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
        </List>

        <View style={{flex: 1, marginBottom: 10}}>
          <ScrollView style={{flex: 1, flexDirection: 'column', marginLeft: 30, marginRight: 10}}>
            <List>
              {this.state.orders.map(item => (
                <ListItem key={item._id} style={{height: 50}}>
                  <Body>
                    <View style={{flexDirection: "row"}}>
                      <Text style={{width: 50}}>#{item.orderRef}</Text>
                      <Text style={{width: 50, textAlign: 'right'}}>{item.quantity}</Text>
                      <View style={{width: 50}}>
                        {(() => {
                          if (item.isTakeaway) {
                            return (
                              <Button full small style={{backgroundColor: '#EE2738'}}>
                                <MaterialIcons name='directions-walk' color={'#fff'} size={20} />
                              </Button>
                            )
                          } else {
                            return (
                              <View/>
                            )
                          }
                        })()}
                      </View>
                      <Text style={{width: 200}}>{item.name}</Text>
                      <Text style={{flex: 1}}>{this.getNote(item)}</Text>
                      <Text style={{width: 50}}>
                        {(() => { return moment(item.createdAt).format("HH:mm") })()}
                      </Text>
                      <View style={{width: 100, alignItems: 'center'}}>
                        <View style={{width: 80, alignItems: 'center'}}>
                          {(() => {
                            if (item.isCompleted) {
                              return (
                                <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.onUncomplete(item._id)}}><Text> UNDO </Text></Button>                      
                              )
                            } else {
                              return (
                                <Button full small style={{backgroundColor: '#2FA495'}} onPress={() => {this.onComplete(item._id)}}><Text> DONE </Text></Button>                      
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
        </View>

        <View style={{height: 65, flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
          <View style={{flex: 1}}></View>
          <View style={{width: 180}}>
            <Button full style={{marginTop: 10, backgroundColor: '#6c757d'}} onPress={() => this.onRefresh()}><Text> REFRESH </Text></Button>
          </View>
          <View style={{width: 50}}></View>
          <View style={{width: 180}}>
            <Button full style={{marginTop: 10, backgroundColor: '#2177b4'}} onPress={() => this.onCompleteAll()}><Text> COMPLETE ALL </Text></Button>
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </View>      
    </Content>
  </Container>            
    );
  }
}

Kitchen.propTypes = {
};

export default Kitchen;
