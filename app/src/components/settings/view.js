import _ from 'lodash';
import React from 'react';
import { NativeEventEmitter, Dimensions, NativeModules, AsyncStorage, Alert, ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label, Toast, Switch } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TenantApi } from '../../api';
import { Helper } from '../../utils';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.tenant = null;
    this.payload = null;
    this.state = {
      isSignedIn: false,
      edit: null,
      printers: [],
      settings: {
        receiptTemplate: {}
      }
    }

    this.emitter = new NativeEventEmitter(NativeModules.RNPrinterScanner);
    this.listener = this.emitter.addListener(
      'EventPrinterFound',
      (printer) => {
        let printers = [...this.state.printers]
        printers.push(printer);
        this.setState({
          printers: printers
        })         
      }
    );
  }

  componentWillMount() {
    NativeModules.RNPrinterScanner.scan();

    AsyncStorage.getItem('payload', (err, payload) => {
      if (!payload) return;
      this.payload = JSON.parse(payload);

      this.setState({
        isSignedIn: true
      });

      TenantApi.getById(this.payload.tenant._id)
        .then(result => {
          this.tenant = result;
          let settings = this.tenant.settings || {}
          settings.receiptTemplate = settings.receiptTemplate || {}
          
          this.setState({
            settings: settings
          })
        })
    });
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  componentDidMount() {

  }

  onEdit(setting) {
    this.setState({
      edit: setting
    })    
  }

  onCancel() {
    TenantApi.getById(this.payload.tenant._id)
      .then(result => {
        let settings = result.settings || {};
        settings.receiptTemplate = settings.receiptTemplate || {}
        
        this.setState({
          edit: null,
          settings: settings
        })
      })
  }

  onSave() {
    let tenant = {...this.tenant}
    tenant.settings = {...this.state.settings}

    TenantApi.updateById(this.payload.tenant._id, tenant)
      .then(result => {
        this.setState({
          edit: null
        })    
      })
      .catch(err => {
        alert(err)
      })
  }

  onReceiptPrinterChanged(text) {
    let settings = {...this.state.settings};
    settings.receiptPrinter = text;

    this.setState({
      settings: settings
    });    
  }

  onKitchenPrinterChanged(text) {
    let settings = {...this.state.settings};
    settings.kitchenPrinter = text;

    this.setState({
      settings: settings
    });    
  }

  onReceiptNameChanged(text) {
    let settings = {...this.state.settings};
    settings.receiptTemplate.receiptName = text;

    this.setState({
      settings: settings
    });    
  }

  onHeader1Changed(text) {
    let settings = {...this.state.settings};
    settings.receiptTemplate.header1 = text;

    this.setState({
      settings: settings
    });    
  }

  onHeader2Changed(text) {
    let settings = {...this.state.settings};
    settings.receiptTemplate.header2 = text;

    this.setState({
      settings: settings
    });    
  }

  onHeader3Changed(text) {
    let settings = {...this.state.settings};
    settings.receiptTemplate.header3 = text;

    this.setState({
      settings: settings
    });    
  }

  onHeader4Changed(text) {
    let settings = {...this.state.settings};
    settings.receiptTemplate.header4 = text;

    this.setState({
      settings: settings
    });    
  }

  onHeader5Changed(text) {
    let settings = {...this.state.settings};
    settings.receiptTemplate.header5 = text;

    this.setState({
      settings: settings
    });    
  }

  onFooter1Changed(text) {
    let settings = {...this.state.settings};
    settings.receiptTemplate.footer1 = text;

    this.setState({
      settings: settings
    });    
  }

  onFooter2Changed(text) {
    let settings = {...this.state.settings};
    settings.receiptTemplate.footer2 = text;

    this.setState({
      settings: settings
    });    
  }

  onFooter3Changed(text) {
    let settings = {...this.state.settings};
    settings.receiptTemplate.footer3 = text;

    this.setState({
      settings: settings
    });    
  }

  onConfirmAndPrintChanged(value) {
    let tenant = {...this.tenant}
    tenant.settings = {...this.state.settings}
    tenant.settings.confirmAndPrint = value;

    TenantApi.updateById(this.payload.tenant._id, tenant)
      .then(result => {
        this.setState({
          settings: tenant.settings
        });    
      })
      .catch(err => {
        alert(err)
      })
  }

  onInclusiveGSTChanged(value) {
    let tenant = {...this.tenant}
    tenant.settings = {...this.state.settings}
    tenant.settings.isInclusiveGST = value;

    TenantApi.updateById(this.payload.tenant._id, tenant)
      .then(result => {
        this.setState({
          settings: tenant.settings
        });    
      })
      .catch(err => {
        alert(err)
      })
  }

  onSelectReceiptPrinter(printer) {
    let settings = {...this.state.settings};
    settings.receiptPrinter = printer.target;

    this.setState({
      settings: settings
    });    
  }

  onSelectKitchenPrinter(printer) {
    let settings = {...this.state.settings};
    settings.kitchenPrinter = printer.target;

    this.setState({
      settings: settings
    });    
  }

  render() {
    if (!this.state.isSignedIn) return null;
const {height: screenHeight} = Dimensions.get('window');

    if (!this.state.edit) {
      return (
  <Container style={{backgroundColor: '#fff'}}>
    <Content>        
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FFF',
        height: screenHeight - 50
        }}>
          <List style={{marginTop: 40}}>
            <ListItem icon>
              <Left>
                <MaterialIcons name='print' color={'#6c757d'} size={20} />            
              </Left>
              <Body>
                <Text>Print</Text>
              </Body>
              <Right>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
              </Left>
              <Body style={{marginLeft: 20}}>
                <Text>Receipt Printer</Text>
              </Body>
              <Right>
                <Text>{this.state.settings.receiptPrinter}</Text>
                <TouchableOpacity activeOpacity={1.0} onPress={() => this.onEdit("RECEIPT_PRINTER")}>
                  <Icon name="arrow-forward" />
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
              </Left>
              <Body style={{marginLeft: 20}}>
                <Text>Kitchen Printer</Text>
              </Body>
              <Right>
                <Text>{this.state.settings.kitchenPrinter}</Text>
                <TouchableOpacity activeOpacity={1.0} onPress={() => this.onEdit("KITCHEN_PRINTER")}>
                  <Icon name="arrow-forward" />
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
              </Left>
              <Body style={{marginLeft: 20}}>
                <Text>Receipt Template</Text>
              </Body>
              <Right>
                <Text>{this.state.settings.receiptTemplate.receiptName}</Text>
                <TouchableOpacity activeOpacity={1.0} onPress={() => this.onEdit("RECEIPT_TEMPLATE")}>
                  <Icon name="arrow-forward" />
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
              </Left>
              <Body style={{marginLeft: 20}}>
                <Text>Confirm & Print</Text>
              </Body>
              <Right>
                <Switch value={this.state.settings.confirmAndPrint} onValueChange={(value) => this.onConfirmAndPrintChanged(value)} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
              </Left>
              <Body style={{marginLeft: 20}}>
                <Text>Inclusive GST</Text>
              </Body>
              <Right>
                <Switch value={this.state.settings.isInclusiveGST} onValueChange={(value) => this.onInclusiveGSTChanged(value)} />
              </Right>
            </ListItem>
          </List>

          <View style={{flex: 1}} />
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
        height: screenHeight - 50
        }}>
          <List style={{marginTop: 40}}>
          {(() => {
            switch(this.state.edit) {
              case "RECEIPT_PRINTER":
                return (
                  <ListItem icon>
                    <Left>
                      <MaterialIcons name='print' color={'#6c757d'} size={20} />            
                    </Left>
                    <Body>
                      <Text>Receipt Printer</Text>
                    </Body>
                    <Right>
                    </Right>
                  </ListItem>
                )

              case "KITCHEN_PRINTER":
                return (
                  <ListItem icon>
                    <Left>
                      <MaterialIcons name='print' color={'#6c757d'} size={20} />            
                    </Left>
                    <Body>
                      <Text>Kitchen Printer</Text>
                    </Body>
                    <Right>
                    </Right>
                  </ListItem>
                )

              case "RECEIPT_TEMPLATE":
                return (
                  <ListItem icon>
                    <Left>
                      <MaterialIcons name='print' color={'#6c757d'} size={20} />            
                    </Left>
                    <Body>
                      <Text>Receipt Template</Text>
                    </Body>
                    <Right>
                    </Right>
                  </ListItem>
                )
            }
          })()}
          </List>

          {(() => {
            switch(this.state.edit) {
              case "RECEIPT_PRINTER":
                return (
                  <View style={{ marginLeft: 50, marginTop: 50 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{width: 200}}>
                        <Text>Receipt Printer</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput defaultValue={this.state.settings.receiptPrinter} onChangeText={(text) => this.onReceiptPrinterChanged(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{width: 530, marginLeft: 170}}> 
                      <List style={{marginTop: 40}}> 
                        <ListItem icon>  
                          <Left> 
                          </Left>  
                          <Body> 
                            <Text>Select Printer</Text>  
                          </Body>  
                          <Right>  
                          </Right> 
                        </ListItem>  
                      {this.state.printers.map(item => (
                        <ListItem key={item.target} onPress={() => this.onSelectReceiptPrinter(item)}>  
                          <Left>
                            <Text>{item.name}</Text>
                          </Left>  
                          <Body> 
                            <Text>{item.target}</Text> 
                          </Body>  
                          <Right>  
                          </Right> 
                        </ListItem>
                      ))}
                      </List>  
                    </View>                    
                    <View style={{flex: 1}}></View>
                  </View>
                )

              case "KITCHEN_PRINTER":
                return (
                  <View style={{ marginLeft: 50, marginTop: 50 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{width: 200}}>
                        <Text>Kitchen Printer</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput defaultValue={this.state.settings.kitchenPrinter} onChangeText={(text) => this.onKitchenPrinterChanged(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{width: 530, marginLeft: 170}}> 
                      <List style={{marginTop: 40}}> 
                        <ListItem icon>  
                          <Left> 
                          </Left>  
                          <Body> 
                            <Text>Select Printer</Text>  
                          </Body>  
                          <Right>  
                          </Right> 
                        </ListItem>                        
                      {this.state.printers.map(item => (
                        <ListItem key={item.target} onPress={() => this.onSelectKitchenPrinter(item)}>  
                          <Left>
                            <Text>{item.name}</Text>
                          </Left>  
                          <Body> 
                            <Text>{item.target}</Text> 
                          </Body>  
                          <Right>  
                          </Right> 
                        </ListItem>
                      ))}
                      </List>  
                    </View>                      
                    <View style={{flex: 1}}></View>
                  </View>
                )

              case "RECEIPT_TEMPLATE":
                return (
                  <View style={{ marginLeft: 50, marginTop: 50 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{width: 200}}>
                        <Text>Receipt Name</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput defaultValue={this.state.settings.receiptTemplate.receiptName} onChangeText={(text) => this.onReceiptNameChanged(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Header 1</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput defaultValue={this.state.settings.receiptTemplate.header1} onChangeText={(text) => this.onHeader1Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Header 2</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput defaultValue={this.state.settings.receiptTemplate.header2} onChangeText={(text) => this.onHeader2Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Header 3</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput defaultValue={this.state.settings.receiptTemplate.header3} onChangeText={(text) => this.onHeader3Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Header 4</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput defaultValue={this.state.settings.receiptTemplate.header4} onChangeText={(text) => this.onHeader4Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Header 5</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput defaultValue={this.state.settings.receiptTemplate.header5} onChangeText={(text) => this.onHeader5Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Footer 1</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput defaultValue={this.state.settings.receiptTemplate.footer1} onChangeText={(text) => this.onFooter1Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Footer 2</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput defaultValue={this.state.settings.receiptTemplate.footer2} onChangeText={(text) => this.onFooter2Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Footer 3</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput defaultValue={this.state.settings.receiptTemplate.footer3} onChangeText={(text) => this.onFooter3Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                  </View>
                )
            }
          })()}

          <View style={{flex: 1}} />

          <View style={{height: 65, flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
            <View style={{flex: 1}}></View>
            <View style={{width: 180}}>
              <Button full style={{marginTop: 10, backgroundColor: '#6c757d'}} onPress={() => this.onCancel()}><Text> CANCEL </Text></Button>
            </View>
            <View style={{width: 50}}></View>
            <View style={{width: 180}}>
              <Button full style={{marginTop: 10, backgroundColor: '#2177b4'}} onPress={() => this.onSave()}><Text> SAVE </Text></Button>
            </View>
            <View style={{flex: 1}}></View>
          </View>
        </View>    
    </Content>
  </Container>                      
      );
    }
  }
}

Settings.propTypes = {
};

export default Settings;

