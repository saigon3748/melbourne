import _ from 'lodash';
import moment from "moment";
import React from 'react';
import { Dimensions, NativeModules, AsyncStorage, Alert, ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label, Toast } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MenuApi, OrderApi, TenantApi, PrinterApi } from '../../api';
import { Helper } from '../../utils';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.intervalId;
    this.state = {
      isSignedIn: false,
      selectedOrder: null,
      orders: []
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

    PrinterApi.get()
      .then(result => {
        this.printers = result;
      })      
  }

  delete(order) {
    Alert.alert(
      "Confirmation",
      `Do you want to delete #${order.ref}?`,
      [ { text: 'Cancel' }, 
        { text: 'OK', onPress: () => {
          OrderApi.deleteById(order._id)
            .then(result => {
              let orders = {...this.state.orders};
              orders = _.filter(orders, item => {
                return item._id != order._id;
              });

              this.setState({
                orders: orders
              });                  
            })
        }} ]
    );    
  }

  getItems(order) {
    let text = "";

    order.items.forEach(item => {
      text += `${item.quantity} x ${item.name}`;

      if (item.addons && item.addons.length > 0) {
        text += " ( ";
        item.addons.forEach(addon => {
          text += `${addon.quantity} x ${addon.name}  `;
        })
        text += ") ";
      } else {
        text += "  ";
      }
    })

    if (order.note) {
      text += " - " + order.note;
    }

    return text;
  }

  getItem(item) {
    let text = "";

    text += `${item.quantity} x ${item.name}`;

    if (item.addons && item.addons.length > 0) {
      text += " ( ";
      item.addons.forEach(addon => {
        text += `${addon.quantity} x ${addon.name}  `;
      })
      text += ") ";
    } else {
      text += "  ";
    }

    if (item.note) {
      text += " - " + item.note;
    }

    return text;
  }

  getDiscount(discount) {
    return `${discount.quantity} x ${discount.name}`;
  }

  view(order) {
    this.setState({
      selectedOrder: order
    });  
  }

  cancel() {
    this.setState({
      selectedOrder: null
    });  
  }

  print(order) {
    Alert.alert(
      `#${order.ref}`, 
      'Do you want to print?',
      [ { text: 'Cancel' }, 
        { text: 'OK', onPress: () => {
          if (!this.printers || this.printers.length === 0) return;

          let data = {
            code: order.ref,
            createdAt: order.createdAt,
            subtotal: order.subtotal,
            discount: order.discount,
            tax: order.tax,
            total: order.total,
            cash: order.cash,
            change: order.change,
            items: order.items
          };

          this.printers.forEach((printer, index) => {
            setTimeout(() => {
              if (printer.isCookingReceipt) return;

              // if (printer.isCookingReceipt) {
              //   let receipt = Helper.getCookingPrint(printer.macAddress, data);
              //   NativeModules.RNPrinter.print(receipt);
              //   return;
              // }

              let setting = {
                title: printer.title,
                macAddress: printer.macAddress,
                header1: printer.header1,
                header2: printer.header2,
                header3: printer.header3,
                header4: printer.header4,
                header5: printer.header5,
                footer1: printer.footer1,
                footer2: printer.footer2,
                footer3: printer.footer3
              }

              let receipt = Helper.getReceiptPrint(setting, data);
              NativeModules.RNPrinter.print(receipt); 
            }, 3000 * index);   
          }) 
        }} ]
    );    
  }  

  render() {
    const {height: screenHeight} = Dimensions.get('window');

    if (!this.state.selectedOrder) {
      return (
        <Container style={{backgroundColor: '#fff'}}>
          <Content>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#fff'
            }}>
              <List style={{marginTop: 40}}>
                <ListItem icon>
                  <Left>
                    <MaterialIcons name='assessment' color={'#6c757d'} size={20} />            
                  </Left>
                  <Body>
                    <Text>Transactions</Text>
                  </Body>
                  <Right>
                  </Right>
                </ListItem>
              </List>

              <ScrollView style={{flex: 1, flexDirection: 'column', marginLeft: 30, marginRight: 10}}>
                <List>
                  {this.state.orders.map(order => (
                    <ListItem key={order._id} style={{height: 50}}>
                      <Body>
                        <View style={{flexDirection: "row"}}>
                          <Text style={{width: 50}}>#{order.ref}</Text>
                          <Text style={{width: 70, textAlign: 'right'}}>
                            {(() => { return Helper.formatCurrency(order.total) })()}
                          </Text>
                          <Text style={{flex: 1}}>{this.getItems(order)}</Text>
                          <Text style={{width: 50}}>
                            {(() => { return moment(order.localCreatedAt).format("HH:mm") })()}
                          </Text>
                          <View style={{width: 100, alignItems: 'center'}}>
                            <View style={{width: 80, alignItems: 'center'}}>
                              <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.view(order)}}><Text> View </Text></Button>                      
                            </View>
                          </View>
                        </View>
                      </Body>
                    </ListItem>
                  ))}
                </List>
              </ScrollView>
            </View>      
          </Content>
        </Container>            
      );
    } else {
      return (
        <Container style={{backgroundColor: '#fff'}}>
          <Content>      
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#FFF',
              height: screenHeight - 65
            }}>
              <List style={{marginTop: 40}}>
                <ListItem icon>
                  <Left>
                    <MaterialIcons name='assessment' color={'#6c757d'} size={20} />            
                  </Left>
                  <Body>
                    <Text>Transaction Detail</Text>
                  </Body>
                  <Right>
                    <Text style={{width: 100, textAlign: 'right', fontSize: 30, color: '#2177b4'}}>
                      {(() => { 
                        return `#${this.state.selectedOrder.ref}`;
                      })()}
                    </Text>
                    <Text style={{width: 50}}></Text>
                    <Text style={{width: 100, textAlign: 'right', fontSize: 30, color: '#DE544E', marginRight: 20}}>
                      {(() => { 
                        // return `Transaction #${this.state.selectedOrder.ref}`;
                        return Helper.formatCurrency(this.state.selectedOrder.total); 
                      })()}
                    </Text>
                  </Right>
                </ListItem>
              </List>

              <ScrollView style={{flex: 1, flexDirection: 'column', marginLeft: 30, marginRight: 10}}>            
                <List>
                  {this.state.selectedOrder.items.map(item => (
                    <ListItem key={item._id} style={{height: 50}}>
                      <Body>
                        <View style={{flexDirection: "row"}}>
                          <Text style={{width: 70}}>Item</Text>
                          <Text style={{flex: 1}}>{this.getItem(item)}</Text>
                          <Text style={{width: 70, textAlign: 'right'}}>
                            {(() => { return Helper.formatCurrency(item.subtotal) })()}
                          </Text>
                        </View>
                      </Body>
                    </ListItem>
                  ))}
                  {this.state.selectedOrder.discounts.map(discount => (
                    <ListItem key={discount._id} style={{height: 50}}>
                      <Body>
                        <View style={{flexDirection: "row"}}>
                          <Text style={{width: 70}}>Discount</Text>
                          <Text style={{flex: 1}}>{this.getDiscount(discount)}</Text>
                          <Text style={{width: 70, textAlign: 'right'}}>
                            {(() => { return "(" + Helper.formatCurrency(discount.amount) + ")" })()}
                          </Text>
                        </View>
                      </Body>
                    </ListItem>
                  ))}
                </List>
              </ScrollView> 

              <View style={{height: 65, flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
                <View style={{width: 10}}></View>
                <View style={{flex: 1}}>
                  <Button full style={{marginTop: 10, backgroundColor: '#6c757d'}} onPress={() => this.cancel()}><Text> CANCEL </Text></Button>
                </View>
                <View style={{width: 10}}></View>
                <View style={{flex: 1}}>
                  <Button full style={{marginTop: 10, backgroundColor: '#2177b4'}} onPress={() => this.print(this.state.selectedOrder)}><Text> PRINT </Text></Button>
                </View>
                <View style={{width: 10}}></View>
                <View style={{flex: 1}}>
                  <Button full style={{marginTop: 10, backgroundColor: '#DE544E'}} onPress={() => this.delete(this.state.selectedOrder)}><Text> DELETE </Text></Button>
                </View>
                <View style={{width: 10}}></View>
              </View>              
            </View>
          </Content>
        </Container>
      )
    }
  }
}

Transactions.propTypes = {
};

export default Transactions;
