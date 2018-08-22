import _ from 'lodash';
import moment from "moment";
import React from 'react';
import { Dimensions, NativeModules, AsyncStorage, Alert, ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label, Toast, Switch } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PrinterApi } from '../../api';
import { Helper } from '../../utils';

class Printers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
      selectedPrinter: null,
      printers: []
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
    PrinterApi.get()
      .then(result => {
        this.setState({
          printers: result
        });
      });
  }

  onPrinterSelected(printer) {
    let selectedPrinter = {...printer}

    this.setState({
      selectedPrinter: printer
    });
  }

  onCancel() {
    this.setState({
      selectedPrinter: null
    });    
  }

  onSave() {
    if (!this.state.selectedPrinter) return;

    let selectedPrinter = {...this.state.selectedPrinter}

    PrinterApi.update(selectedPrinter._id, selectedPrinter)
      .then(result => {
        this.setState({
          selectedPrinter: null
        })    
      })
      .catch(err => {
        alert(err)
      })
  }

  onPrinterNameChanged(text) {
    let selectedPrinter = {...this.state.selectedPrinter};
    selectedPrinter.name = text;

    this.setState({
      selectedPrinter: selectedPrinter
    });    
  }

  onMacAddressChanged(text) {
    let selectedPrinter = {...this.state.selectedPrinter};
    selectedPrinter.macAddress = text;

    this.setState({
      selectedPrinter: selectedPrinter
    });    
  }

  onCookingReceiptChanged(value) {
    let selectedPrinter = {...this.state.selectedPrinter};
    selectedPrinter.isCookingReceipt = value;

    this.setState({
      selectedPrinter: selectedPrinter
    });
  }

  onOrderAndPrintChanged(value) {
    let selectedPrinter = {...this.state.selectedPrinter};
    selectedPrinter.isOrderAndPrint = value;

    this.setState({
      selectedPrinter: selectedPrinter
    });
  }

  onTitleChanged(text) {
    let selectedPrinter = {...this.state.selectedPrinter};
    selectedPrinter.title = text;

    this.setState({
      selectedPrinter: selectedPrinter
    });    
  }

  onHeader1Changed(text) {
    let selectedPrinter = {...this.state.selectedPrinter};
    selectedPrinter.header1 = text;

    this.setState({
      selectedPrinter: selectedPrinter
    });    
  }

  onHeader2Changed(text) {
    let selectedPrinter = {...this.state.selectedPrinter};
    selectedPrinter.header2 = text;

    this.setState({
      selectedPrinter: selectedPrinter
    });    
  }

  onHeader3Changed(text) {
    let selectedPrinter = {...this.state.selectedPrinter};
    selectedPrinter.header3 = text;

    this.setState({
      selectedPrinter: selectedPrinter
    });    
  }

  onHeader4Changed(text) {
    let selectedPrinter = {...this.state.selectedPrinter};
    selectedPrinter.header4 = text;

    this.setState({
      selectedPrinter: selectedPrinter
    });    
  }

  onHeader5Changed(text) {
    let selectedPrinter = {...this.state.selectedPrinter};
    selectedPrinter.header5 = text;

    this.setState({
      selectedPrinter: selectedPrinter
    });    
  }

  onFooter1Changed(text) {
    let selectedPrinter = {...this.state.selectedPrinter};
    selectedPrinter.footer1 = text;

    this.setState({
      selectedPrinter: selectedPrinter
    });    
  }

  onFooter2Changed(text) {
    let selectedPrinter = {...this.state.selectedPrinter};
    selectedPrinter.footer2 = text;

    this.setState({
      selectedPrinter: selectedPrinter
    });    
  }

  onFooter3Changed(text) {
    let selectedPrinter = {...this.state.selectedPrinter};
    selectedPrinter.footer3 = text;

    this.setState({
      selectedPrinter: selectedPrinter
    });    
  }  

  render() {
    const {height: screenHeight} = Dimensions.get('window');
    
    if (!this.state.selectedPrinter) {
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
                <ScrollView style={{flex: 1, flexDirection: 'column', marginLeft: 30, marginRight: 10}}>
                  <List style={{marginTop: 40}}>
                    <ListItem icon>
                      <Left>
                        <MaterialIcons name='print' color={'#6c757d'} size={20} />            
                      </Left>
                      <Body>
                        <Text>Printers</Text>
                      </Body>
                      <Right>
                      </Right>
                    </ListItem>
                  </List>

                  <View style={{flex: 1, marginBottom: 10}}>
                    <ScrollView style={{flex: 1, flexDirection: 'column', marginLeft: 30, marginRight: 10}}>
                      <List>
                        {this.state.printers.map(item => (
                          <ListItem key={item._id} style={{height: 50}}>
                            <Body>
                              <View style={{flexDirection: "row"}}>
                                <Text style={{width: 200}}>{item.name}</Text>
                                <Text style={{width: 200}}>{item.macAddress}</Text>
                              </View>
                            </Body>
                            <Right>
                              <TouchableOpacity activeOpacity={1.0} onPress={() => this.onPrinterSelected(item)}>
                                <Icon name="arrow-forward" />
                              </TouchableOpacity>
                            </Right>
                          </ListItem>
                        ))}
                      </List>
                    </ScrollView>
                  </View>
                </ScrollView>
              </View>   
          </Content>
        </Container>
      )
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
              <ScrollView style={{flex: 1, flexDirection: 'column', marginLeft: 30, marginRight: 10}}>            
                <View style={{ marginLeft: 50, marginTop: 50 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{width: 200}}>
                      <Text>Name</Text>
                    </View>
                    <View style={{width: 500}}>
                      <TextInput defaultValue={this.state.selectedPrinter.name} onChangeText={(text) => this.onPrinterNameChanged(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{width: 200}}>
                      <Text>MAC Address</Text>
                    </View>
                    <View style={{width: 500}}>
                      <TextInput defaultValue={this.state.selectedPrinter.macAddress} onChangeText={(text) => this.onMacAddressChanged(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{width: 200}}>
                      <Text>Cooking Receipt</Text>
                    </View>
                    <View style={{width: 500}}>
                      <Switch value={this.state.selectedPrinter.isCookingReceipt} onValueChange={(value) => this.onCookingReceiptChanged(value)} />
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{width: 200}}>
                      <Text>Order & Print</Text>
                    </View>
                    <View style={{width: 500}}>
                      <Switch value={this.state.selectedPrinter.isOrderAndPrint} onValueChange={(value) => this.onOrderAndPrintChanged(value)} />
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{width: 200}}>
                      <Text>Receipt Title</Text>
                    </View>
                    <View style={{width: 500}}>
                      <TextInput defaultValue={this.state.selectedPrinter.title} onChangeText={(text) => this.onTitleChanged(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{width: 200}}>
                      <Text>Receipt Header 1</Text>
                    </View>
                    <View style={{width: 500}}>
                      <TextInput defaultValue={this.state.selectedPrinter.header1} onChangeText={(text) => this.onHeader1Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{width: 200}}>
                      <Text>Receipt Header 2</Text>
                    </View>
                    <View style={{width: 500}}>
                      <TextInput defaultValue={this.state.selectedPrinter.header2} onChangeText={(text) => this.onHeader2Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{width: 200}}>
                      <Text>Receipt Header 3</Text>
                    </View>
                    <View style={{width: 500}}>
                      <TextInput defaultValue={this.state.selectedPrinter.header3} onChangeText={(text) => this.onHeader3Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{width: 200}}>
                      <Text>Receipt Header 4</Text>
                    </View>
                    <View style={{width: 500}}>
                      <TextInput defaultValue={this.state.selectedPrinter.header4} onChangeText={(text) => this.onHeader4Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{width: 200}}>
                      <Text>Receipt Header 5</Text>
                    </View>
                    <View style={{width: 500}}>
                      <TextInput defaultValue={this.state.selectedPrinter.header5} onChangeText={(text) => this.onHeader5Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{width: 200}}>
                      <Text>Receipt Footer 1</Text>
                    </View>
                    <View style={{width: 500}}>
                      <TextInput defaultValue={this.state.selectedPrinter.footer1} onChangeText={(text) => this.onFooter1Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{width: 200}}>
                      <Text>Receipt Footer 2</Text>
                    </View>
                    <View style={{width: 500}}>
                      <TextInput defaultValue={this.state.selectedPrinter.footer2} onChangeText={(text) => this.onFooter2Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{width: 200}}>
                      <Text>Receipt Footer 3</Text>
                    </View>
                    <View style={{width: 500}}>
                      <TextInput defaultValue={this.state.selectedPrinter.footer3} onChangeText={(text) => this.onFooter3Changed(text)} style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                </View>

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
              </ScrollView>                  
            </View>
          </Content>
        </Container>
      )
    }
  }
}

Printers.propTypes = {
};

export default Printers;
