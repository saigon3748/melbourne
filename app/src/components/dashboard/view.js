import _ from 'lodash';
import moment from "moment";
import React from 'react';
import { Dimensions, NativeModules, AsyncStorage, Alert, ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label, Toast } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MenuApi, OrderApi, TenantApi } from '../../api';
import { Helper } from '../../utils';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
      selectedOrder: null,
      orders: []
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('payload', (err, payload) => {
      if (!payload) return;
      payload = JSON.parse(payload);

      this.setState({
        isSignedIn: true
      });

      TenantApi.getById(payload.tenant._id)
        .then(result => {
          this.tenant = result;
        })      
    });
  }

  componentDidMount() {
    OrderApi.getToday()
      .then(result => {
        this.setState({
          orders: result
        });
      })
  }

  onSelectOrder(order) {
    this.setState({
      selectedOrder: order
    })    
  }

  onDelete(order) {
    Alert.alert(
      `#${order.ref}`, 
      'Do you want to delete?',
      [ { text: 'Cancel' }, 
        { text: 'OK', onPress: () => {
          OrderApi.markDeleted(order._id)
            .then(result => {
              let orders = {...this.state.orders};
              orders = _.filter(orders, item => {
                return item._id != order._id;
              });

              this.setState({
                selectedOrder: null,
                orders: orders
              });                  
            })
        }} ]
    );    
  }

  onPrint(order) {
    Alert.alert(
      `#${order.ref}`, 
      'Do you want to print?',
      [ { text: 'Cancel' }, 
        { text: 'OK', onPress: () => {
          this.print(order)
        }} ]
    );    
  }

  print(order) {
    if (!this.tenant || !this.tenant.settings || !this.tenant.settings.receiptTemplate) {
      alert('No setting found')
      return;
    }

    if (!this.tenant.settings.receiptPrinter || this.tenant.settings.receiptPrinter.trim() === "") {
      alert('No setting found for receipt printer')
      return;
    }

    let setting = {
      name: this.tenant.settings.receiptTemplate.receiptName,
      receiptPrinter: this.tenant.settings.receiptPrinter,
      header1: this.tenant.settings.receiptTemplate.header1,
      header2: this.tenant.settings.receiptTemplate.header2,
      header3: this.tenant.settings.receiptTemplate.header3,
      header4: this.tenant.settings.receiptTemplate.header4,
      header5: this.tenant.settings.receiptTemplate.header5,
      footer1: this.tenant.settings.receiptTemplate.footer1,
      footer2: this.tenant.settings.receiptTemplate.footer2,
      footer3: this.tenant.settings.receiptTemplate.footer3
    }

    let data = {
      code: order.ref,
      createdAt: order.createdAt,
      subtotal: order.subtotal,
      discount: order.discountAmt,
      tax: order.tax,
      total: order.total,
      cash: order.cash,
      change: order.change,
      items: order.items
    };

    let receipt = Helper.getReceiptPrint(setting, data);
    NativeModules.RNPrinter.print(receipt)

    if (this.tenant.settings.kitchenPrinter && this.tenant.settings.kitchenPrinter.trim() != "") {
      setTimeout(() => {
        let kitchen = Helper.getKitchenPrint(setting, data);
        NativeModules.RNPrinter.print(kitchen)
      }, 2000)
    }    
  }

  render() {
    if (!this.state.isSignedIn) return null;
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

        <View style={{
          flex: 8, 
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{width: 650, marginBottom: 10}}>
            <ScrollView style={{flex: 1, flexDirection: 'column', marginLeft: 35, marginRight: 10}}>
              <List>
                {this.state.orders.map(item => (
                  <ListItem key={item._id} style={{height: 50}} onPress={() => this.onSelectOrder(item)}>
                    <Body>
                      <View style={{flexDirection: "row"}}>
                        <Text style={{width: 60}}>#{item.ref}</Text>
                        <Text style={{width: 100, textAlign: 'right'}}>
                          {(() => { return Helper.formatCurrency(item.total) })()}
                        </Text>
                        <Text style={{flex: 1}}>{item.note}</Text>
                        <Text style={{width: 60}}>
                          {(() => { return moment(item.createdAt).format("HH:mm") })()}
                        </Text>
                      </View>
                    </Body>
                  </ListItem>
                ))}
              </List>
            </ScrollView>
          </View>
          {(() => {
            if (!this.state.selectedOrder) {
              return (
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f3f4', marginTop: 10, marginBottom: 10}}>
                  <View style={{height: 30, marginTop: 20, marginLeft: 10, marginRight: 10}}>
                    <Text style={{textAlign: 'center', color: 'rgb(70, 70, 70)'}}>Select order to view detail</Text>
                  </View>
                </View>
              )
            } else {
              return (
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f3f4', marginTop: 10, marginBottom: 10}}>
                  <View style={{height: 30, marginTop: 20, marginLeft: 10, marginRight: 10}}>
                    <Text style={{textAlign: 'center', fontSize: 20, color: 'rgb(70, 70, 70)'}}>ORDER  #{this.state.selectedOrder.ref}</Text>
                  </View>

                  <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                    <FlatList style={{marginLeft: 10, marginRight: 10}}
                      data={this.state.selectedOrder.items}
                      keyExtractor={(item) => item._id}
                      renderItem={({item, separators}) => (
                        <View style={{marginTop: 20}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={{flex: 1}}>{item.name}</Text>
                            <Text style={{width: 70, textAlign: 'right'}}>
                              {(() => { return Helper.formatCurrency(item.unitPrice) })()}
                            </Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex: 1}}/>
                            <Text style={{width: 70, textAlign: 'right', color: '#EE2738'}}>x{item.quantity}</Text>
                          </View>
                        </View>
                      )}
                    />
                  </ScrollView>

                  <View style={{height: 90, marginTop: 30, marginLeft: 10, marginRight: 10}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1}}>SUBTOTAL</Text>
                      <Text style={{width: 200, textAlign: 'right'}}>
                        {(() => { return Helper.formatCurrency(this.state.selectedOrder.subtotal) })()}
                      </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1}}>DISCOUNT</Text>
                      <Text style={{width: 200, textAlign: 'right'}}>
                        {(() => { return Helper.formatCurrency(this.state.selectedOrder.discountAmt) })()}
                      </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1}}>TAX</Text>
                      <Text style={{width: 200, textAlign: 'right'}}>
                        {(() => { return Helper.formatCurrency(this.state.selectedOrder.tax) })()}
                      </Text>
                    </View>
                  </View>

                  <View style={{height: 40, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1, fontSize: 30, color: 'rgb(70, 70, 70)'}}>TOTAL</Text>
                      <Text style={{width: 200, textAlign: 'right', fontSize: 30, color: '#EE2738'}}>
                        {(() => { return Helper.formatCurrency(this.state.selectedOrder.total) })()}
                      </Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                    <View style={{width: 170}}>
                      <Button full onPress={() => this.onDelete(this.state.selectedOrder)} style={{backgroundColor: '#6c757d'}}><Text> DELETE </Text></Button>
                    </View>
                    <View style={{flex: 1}} />
                    <View style={{width: 170}}>
                      <Button full onPress={() => this.onPrint(this.state.selectedOrder)} style={{backgroundColor: '#2177b4'}}><Text> PRINT </Text></Button>
                    </View>
                  </View>
                </View>
              )
            }
          })()}
        </View>

        <View style={{flex: 1}}>
        </View>
      </View>
    </Content>
  </Container>      
    );
  }
}

Dashboard.propTypes = {
};

export default Dashboard;
