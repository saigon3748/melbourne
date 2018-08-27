import _ from 'lodash';
import moment from "moment";
import React from 'react';
import { Dimensions, NativeModules, AsyncStorage, Alert, ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label, Toast } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MenuApi, OrderApi, TenantApi, PrinterApi } from '../../api';
import { Helper } from '../../utils';

class Report extends React.Component {
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
      `#${order.ref}`, 
      'Do you want to delete?',
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
    let items = "";

    order.items.forEach(item => {
      items += `${item.quantity} x ${item.name}`;

      if (item.addons && item.addons.length > 0) {
        items += " ( ";
        item.addons.forEach(addon => {
          items += `${addon.quantity} x ${addon.name}  `;
        })
        items += ") ";
      } else {
        items += "  ";
      }
    })

    if (order.note) {
      items += order.note;
    }

    return items;
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
                  <Text>Report</Text>
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
                            <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.print(order)}}><Text> Print </Text></Button>                      
                          </View>
                        </View>
                        <View style={{width: 100, alignItems: 'center'}}>
                          <View style={{width: 80, alignItems: 'center'}}>
                            <Button full small style={{backgroundColor: '#DE544E'}} onPress={() => {this.delete(order)}}><Text> Delete </Text></Button>                      
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
  }
}

Report.propTypes = {
};

export default Report;
