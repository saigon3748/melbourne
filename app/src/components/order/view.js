import _ from 'lodash';
import React from 'react';
import { Dimensions, NativeModules, AsyncStorage, Alert, ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList, ListView } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label, Toast } from 'native-base';
import { TextInputMask } from 'react-native-masked-text'
import Modal from "react-native-modal";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MenuApi, OrderApi, TenantApi, PrinterApi, AddonApi, CashApi, CategoryApi, DiscountApi } from '../../api';
import { Helper } from '../../utils';

const DISPLAY_MODE = {
  MENU: 1,
  ADDON: 2,
  DISCOUNT: 3,
  CHECKOUT: 4
}

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.menus = [];
    this.cashes = [];
    this.addons = [];
    this.printers = [];
    this.discounts = [];
    this.categories = [];
    this.categoryStack = [];
    this.selectedCategory = null;

    this.state = {
      displayMode: DISPLAY_MODE.MENU,
      isSignedIn: false,
      selectedMenu: { addons: [], discounts: [] },
      filteredMenus: [],
      filteredCategories: [],
      order: {
        subtotal: 0.00,
        discount: 0.00,
        tax: 0.00,
        total: 0.00,
        cash: 0.00,
        change: 0.00,
        items: [],
        discounts: []
      }
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
    MenuApi.get()
      .then(result => {
        this.menus = result;
        this.setState({
          filteredMenus: this.filterMenus()
        });
      })

    CategoryApi.get()
      .then(result => {
        this.categories = result;
        this.setState({
          filteredCategories: this.filterCategories()
        });
      })

    CashApi.get()
      .then(result => {
        this.cashes = result;
      })

    AddonApi.get()
      .then(result => {
        this.addons = result;
      })

    DiscountApi.get()
      .then(result => {
        this.discounts = result;
      })

    PrinterApi.get()
      .then(result => {
        this.printers = result;
      })
  }

  filterMenus() {
    let menus = this.menus || [];

    if (this.selectedCategory) {
      return _.filter(menus, item => {
        return item.category._id === this.selectedCategory._id;
      })
    }

    if (this.categoryStack.length === 0) {
      return menus;
    }

    let category = this.categoryStack[this.categoryStack.length - 1];
    let subCategories = this.getSubCategories(category);

    return _.filter(menus, item => {
      return _.some(subCategories, category => {
        return category._id === item.category._id;
      });
    })
  }

  getSubCategories(category) {
    let subs = [category];

    this.categories.forEach(item => {
      if (!item.parent) return;
      if (item.parent._id === category._id) {
        subs = subs.concat(this.getSubCategories(item));
      }
    })

    return subs;
  }

  filterCategories() {
    let categories = this.categories || [];

    if (this.categoryStack.length === 0) {
      return _.sortBy(_.filter(categories, item => {
        return !item.parent;
      }), ['displayIndex'])
    }

    let category = this.categoryStack[this.categoryStack.length - 1];
    let subs = _.filter(categories, item => {
      return item.parent && item.parent._id === category._id;
    });

    if (subs.length > 0) {
      return _.sortBy(subs, ['displayIndex']);
    }

    return _.sortBy(this.state.filteredCategories, ['displayIndex']);
  }

  selectCategory(category) {
    this.categoryStack = this.categoryStack || [];

    let subs = _.filter(this.categories, item => {
      return item.parent && item.parent._id === category._id;
    });

    if (subs.length > 0) {
      this.categoryStack.push(category);
    } else {
      if (this.selectedCategory && this.selectedCategory._id === category._id) {
        this.selectedCategory = null;
      } else {
        this.selectedCategory = category;
      }
    }
    
    this.setState({
      filteredMenus: this.filterMenus(),
      filteredCategories: this.filterCategories()
    });
  }

  backCategory() {
    this.categoryStack = this.categoryStack || [];

    if (this.categoryStack.length > 0) {
      this.categoryStack = this.categoryStack.slice(0, this.categoryStack.length - 1)
    }
    
    this.selectedCategory = null;
    this.setState({
      filteredMenus: this.filterMenus(),
      filteredCategories: this.filterCategories()
    });
  }

  reset() {
    this.categoryStack = [];
    this.selectedCategory = null;

    this.setState({
      displayMode: DISPLAY_MODE.MENU,
      selectedMenu: { addons: [], discounts: [] },
      filteredMenus: this.filterMenus(),
      filteredCategories: this.filterCategories(),      
      order: {
        subtotal: 0.00,
        discount: 0.00,
        tax: 0.00,
        total: 0.00,
        cash: 0.00,
        change: 0.00,
        items: [],
        discounts: []
      }
    })
  }

  discard() {
    Alert.alert(
      `Alert`, 
      'Do you want to discard?',
      [ { text: 'Cancel' }, 
        { text: 'OK', onPress: () => {
          this.reset();
        }} ]
    );    
  }

  checkout() {
    if (!this.state.order || !this.state.order.items || this.state.order.items.length === 0) {
      alert("Select items to create order");
      return;
    }

    this.showCheckoutScreen()
  }

  save() {
    if (!this.state.order || !this.state.order.items || this.state.order.items.length === 0) {
      alert("Select items to create order");
      return;
    }

    let data = {
      ...this.state.order,
      localCreatedAt: Date.now()
    }

    OrderApi.create(data)
      .then(order => {
        this.print(order);
        this.reset();
      })
      .catch(err => {
        alert(err)
      })    
  }

  print(order) {
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
        if (!printer.isOrderAndPrint) return;

        if (printer.isCookingReceipt) {
          let receipt = Helper.getCookingPrint(printer.macAddress, data);
          NativeModules.RNPrinter.print(receipt);
          return;
        }

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
  }

  noteMenu(menu) {
    let order = {...this.state.order};

    order.items.forEach(item => {
      if (item._id === menu._id) {
        item.isEdittingNote = !item.isEdittingNote;
      } else {
        item.isEdittingNote = false;
      }
    });

    this.setState({
      order: order
    })
  }

  onMenuNoteChanged(menu, text) {
    let order = {...this.state.order};
    let item = _.find(order.items, item => {
      return item._id === menu._id;
    });

    if (item) {
      item.note = text;
    }

    this.setState({
      order: order
    });    
  }

  takeawayMenu(menu) {
    let order = {...this.state.order};
    let item = _.find(order.items, item => {
      return item._id === menu._id;
    });

    item.isTakeaway = !item.isTakeaway;

    this.setState({
      order: order
    });
  }

  showMenuScreen() {
    this.setState({
      displayMode: DISPLAY_MODE.MENU
    });
  }

  showAddonScreen(menu) {
    this.setState({
      displayMode: DISPLAY_MODE.ADDON,
      selectedMenu: menu
    });
  }

  showDiscountScreen() {
    this.setState({
      displayMode: DISPLAY_MODE.DISCOUNT
    });
  }

  showCheckoutScreen() {
    this.setState({
      displayMode: DISPLAY_MODE.CHECKOUT
    });
  }

  calculate(order) {
    let discount = 0;
    let subtotal = 0;
    let addonsSubtotal = 0;
    let mostExpensiveSubtotal = 0;
    let mostExpensiveAddonsSubtotal = 0;
    let leastExpensiveSubtotal = 0;
    let leastExpensiveAddonsSubtotal = 0;

    order.taxRate = this.tenant.taxRate;
    order.isTaxInclusive = this.tenant.isTaxInclusive;

    order.items.forEach(item => {
      item.subtotal = _.round(item.quantity * item.price, 2);
      subtotal += item.subtotal;

      let tempAddonsSubtotal = 0;
      
      item.addons.forEach(addon => {
        addon.subtotal = _.round(addon.quantity * addon.price, 2);
        addonsSubtotal += addon.subtotal;
        tempAddonsSubtotal += addon.subtotal;
      })

      if (item.subtotal > mostExpensiveSubtotal) {
        mostExpensiveSubtotal = item.subtotal;
      }

      if (item.subtotal + tempAddonsSubtotal > mostExpensiveAddonsSubtotal) {
        mostExpensiveAddonsSubtotal = item.subtotal + tempAddonsSubtotal;
      }

      if (leastExpensiveSubtotal === 0) {
        leastExpensiveSubtotal = item.subtotal;
      }

      if (item.subtotal < leastExpensiveSubtotal) {
        leastExpensiveSubtotal = item.subtotal;
      }

      if (item.subtotal + tempAddonsSubtotal < leastExpensiveAddonsSubtotal) {
        leastExpensiveAddonsSubtotal = item.subtotal + tempAddonsSubtotal;
      }

      if (leastExpensiveAddonsSubtotal === 0) {
        leastExpensiveAddonsSubtotal = item.subtotal + tempAddonsSubtotal;
      }
    })

    order.discounts.forEach(item => {
      if (!item.isPercentOff) {
        item.amount = _.round(item.quantity * item.discount, 2);
      } else {
        if (item.isAddonsInclusive) {
          if (item.isLeastExpensive) {
            item.amount = _.round(leastExpensiveAddonsSubtotal * item.quantity * item.discount / 100, 2);
          } else {
            if (item.isMostExpensive) {
              item.amount = _.round(mostExpensiveAddonsSubtotal * item.quantity * item.discount / 100, 2);
            } else {
              item.amount = _.round((subtotal + addonsSubtotal) * item.quantity * item.discount / 100, 2);
            }
          }
        } else {
          if (item.isLeastExpensive) {
            item.amount = _.round(leastExpensiveAddonsSubtotal * item.quantity * item.discount / 100, 2);
          } else {
            if (item.isMostExpensive) {
              item.amount = _.round(mostExpensiveAddonsSubtotal * item.quantity * item.discount / 100, 2);
            } else {
              item.amount = _.round(subtotal * item.quantity * item.discount / 100, 2);            
            }
          }
        }
      }

      discount += item.amount;
    })

    order.subtotal = _.round(subtotal + addonsSubtotal, 2);
    order.discount = _.round(discount, 2);

    if (order.isTaxInclusive) {
      order.total = order.subtotal - order.discount;
      order.tax = _.round(order.total * order.taxRate / 100, 2);
    } else {
      order.tax = _.round((order.subtotal - order.discount) * order.taxRate / 100, 2);
      order.total = order.subtotal - order.discount + order.tax;      
    }

    order.cash = order.cash || 0;
    order.change = order.change || 0;
    if (order.cash > 0) {
      order.change = order.cash - order.total;
    }

    this.setState({
      order: order
    });
  }

  addMenu(menu) {
    let order = {...this.state.order};
    let item = _.find(order.items, item => {
      return item._id === menu._id;
    })

    if (item) {
      item.quantity++;
    } else {
      order.items.push({
        ...menu, 
        quantity: 1, 
        addons: [], 
        discounts: [],
        isTakeaway: this.tenant.isTakeaway
      });
    }

    this.calculate(order);
  }

  removeMenu(menu) {
    let order = {...this.state.order};
    let item = _.find(order.items, item => {
      return item._id === menu._id;
    })

    if (!item) return;

    item.quantity--;

    if (item.quantity === 0) {
      order.items = _.filter(order.items, item => {
        return item._id != menu._id;
      })
    }

    this.calculate(order);
  }

  addAddon(addon) {
    let order = {...this.state.order};
    let menu = _.find(order.items, item => {
      return item._id === this.state.selectedMenu._id;
    })
    let item = _.find(menu.addons, item => {
      return item._id === addon._id;
    })

    if (item) {
      item.quantity++;
    } else {
      menu.addons.push({
        ...addon, 
        quantity: 1
      });
    }

    this.setState({
      selectedMenu: menu
    });

    this.calculate(order);
  }

  removeAddon(addon) {
    let order = {...this.state.order};
    let menu = _.find(order.items, item => {
      return item._id === this.state.selectedMenu._id;
    })
    let item = _.find(menu.addons, item => {
      return item._id === addon._id;
    })

    if (!item) return;

    item.quantity--;

    if (item.quantity === 0) {
      menu.addons = _.filter(menu.addons, item => {
        return item._id != addon._id;
      })
    }

    this.setState({
      selectedMenu: menu
    });

    this.calculate(order);    
  }

  addDiscount(discount) {
    let order = {...this.state.order};
    let item = _.find(order.discounts, item => {
      return item._id === discount._id;
    })

    if (item) {
      item.quantity++;
    } else {
      order.discounts.push({
        ...discount, 
        quantity: 1
      });
    }

    this.calculate(order);
  }

  removeDiscount(discount) {
    let order = {...this.state.order};
    let item = _.find(order.discounts, item => {
      return item._id === discount._id;
    })

    if (!item) return;

    item.quantity--;

    if (item.quantity === 0) {
      order.discounts = _.filter(order.discounts, item => {
        return item._id != discount._id;
      })
    }

    this.calculate(order);
  }

  selectCash(cash){
    try {
      let order = {...this.state.order};
      if (cash.cash === 0) {
        order.cash = 0;
        order.change = 0;
      } else {
        order.cash += _.round(cash.cash, 2);
        order.change = _.round(order.cash - order.total, 2);
      }

      this.setState({
        order: order
      });

    }
    catch(err) {}
  }

  onCashChanged(text){
    try {
      let cash = Number(text.replace(/[^0-9\.-]+/g,""));

      let order = {...this.state.order};
      order.cash = _.round(cash, 2);
      order.change = _.round(order.cash - order.total, 2);

      this.setState({
        order: order
      });

    }
    catch(err) {}
  }

  onNoteChanged(text){
    let order = {...this.state.order};
    order.note = text;

    this.setState({
      order: order
    });
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
            <View style={{
              flex: 8, 
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <View style={{width: 650, marginBottom: 10}}>
                <ScrollView vertical={true}>
                  <View style={{
                    flex: 1,
                    flexDirection: 'row', 
                    flexWrap: 'wrap'
                  }}>
                    {(() => {
                      switch(this.state.displayMode) {
                        case DISPLAY_MODE.MENU:
                          return this.state.filteredMenus.map(menu => {
                            return (
                              <TouchableOpacity key={menu._id} activeOpacity={1.0} onPress={() => this.addMenu(menu)}>
                                <View style={{width: 150, height: 150, marginTop: 10, marginLeft: 10, backgroundColor: '#D1CABD'}}>
                                  {(() => { 
                                    if (menu.imageUrl) {
                                      return (
                                        <ImageBackground
                                          style={{width: 150, height: 150}}
                                          source={{uri: menu.imageUrl}}>
                                          <View style={{backgroundColor: 'rgba(221, 226, 229, 0.85)'}}>
                                            <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3}}>
                                              {menu.name}
                                            </Text>
                                            <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3, marginBottom: 3}}>
                                              {(() => { return Helper.formatCurrency(menu.price) })()}
                                            </Text>
                                          </View>
                                        </ImageBackground>
                                      )
                                    } else {
                                      return (
                                        <View style={{backgroundColor: 'rgba(221, 226, 229, 0.85)'}}>
                                          <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3}}>
                                            {menu.name}
                                          </Text>
                                          <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3, marginBottom: 3}}>
                                            {(() => { return Helper.formatCurrency(menu.price) })()}
                                          </Text>
                                        </View>
                                      )
                                    }
                                  })()}
                                </View>
                              </TouchableOpacity>
                            )
                          })
                          break;

                        case DISPLAY_MODE.ADDON:
                          return this.addons.map(addon => {
                            return (
                              <TouchableOpacity key={addon._id} activeOpacity={1.0} onPress={() => this.addAddon(addon)}>
                                <View style={{width: 150, height: 150, marginTop: 10, marginLeft: 10, backgroundColor: '#D1CABD'}}>
                                  {(() => { 
                                    if (addon.imageUrl) {
                                      return (
                                        <ImageBackground
                                          style={{width: 150, height: 150}}
                                          source={{uri: addon.imageUrl}}>
                                          <View style={{backgroundColor: 'rgba(221, 226, 229, 0.85)'}}>
                                            <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3}}>
                                              {addon.name}
                                            </Text>
                                            <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3, marginBottom: 3}}>
                                              {(() => { return Helper.formatCurrency(addon.price) })()}
                                            </Text>
                                          </View>
                                        </ImageBackground>
                                      )
                                    } else {
                                      return (
                                        <View style={{backgroundColor: 'rgba(221, 226, 229, 0.85)'}}>
                                          <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3}}>
                                            {addon.name}
                                          </Text>
                                          <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3, marginBottom: 3}}>
                                            {(() => { return Helper.formatCurrency(addon.price) })()}
                                          </Text>
                                        </View>
                                      )
                                    }
                                  })()}
                                </View>
                              </TouchableOpacity>
                            )
                          })
                          break;

                        case DISPLAY_MODE.DISCOUNT:
                          return this.discounts.map(discount => {
                            return (
                              <TouchableOpacity key={discount._id} activeOpacity={1.0} onPress={() => this.addDiscount(discount)}>
                                <View style={{width: 150, height: 150, marginTop: 10, marginLeft: 10, backgroundColor: '#D1CABD'}}>
                                  <View style={{backgroundColor: 'rgba(221, 226, 229, 0.85)'}}>
                                    <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3}}>
                                      {discount.name}
                                    </Text>
                                    <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3, marginBottom: 3}}>
                                      {(() => { 
                                        if (discount.isPercentOff) {
                                          return `${discount.discount}%`;
                                        } else {
                                          return Helper.formatCurrency(discount.discount);
                                        }
                                      })()}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )
                          })
                          break;

                        case DISPLAY_MODE.CHECKOUT:
                          return this.cashes.map(cash => {
                            return (
                              <TouchableOpacity key={cash._id} activeOpacity={1.0} onPress={() => this.selectCash(cash)}>
                                <View style={{width: 150, height: 150, marginTop: 10, marginLeft: 10, backgroundColor: '#D1CABD'}}>
                                  <View style={{backgroundColor: 'rgba(221, 226, 229, 0.85)'}}>
                                    <Text style={{fontSize: 25, marginTop: 3, marginLeft: 3, marginRight: 3}}>
                                      {(() => { return Helper.formatCurrency(cash.cash); })()}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )
                          })
                          break;
                      }
                    })()}
                  </View>
                </ScrollView>
              </View>
              
              <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f3f4', marginTop: 10, marginBottom: 10}}>
                {(() => {
                  switch(this.state.displayMode) {
                    case DISPLAY_MODE.MENU:
                      return (
                        <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10}}>
                          <Text style={{fontSize: 25, color: 'rgb(70, 70, 70)'}}>ORDER</Text>
                        </View>
                      )
                      break;

                    case DISPLAY_MODE.ADDON:
                      return (
                        <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10}}>
                          <Text style={{fontSize: 25, color: 'rgb(70, 70, 70)'}}>ADD-ONS</Text>
                          <View style={{flex: 1}}/>
                          <Text>{this.state.selectedMenu.name}</Text>
                        </View>
                      )
                      break;

                    case DISPLAY_MODE.DISCOUNT:
                      return (
                        <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10}}>
                          <Text style={{fontSize: 25, color: 'rgb(70, 70, 70)'}}>DISCOUNTS</Text>
                        </View>
                      )
                      break;

                    case DISPLAY_MODE.CHECKOUT:
                      return (
                        <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10}}>
                          <Text style={{fontSize: 25, color: 'rgb(70, 70, 70)'}}>ORDER</Text>
                        </View>
                      )                    
                      break;
                  }
                })()}

                <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                  {(() => {
                    switch(this.state.displayMode) {
                      case DISPLAY_MODE.MENU:
                        return (
                          <FlatList style={{marginLeft: 10, marginRight: 10}}
                            data={this.state.order.items}
                            keyExtractor={(item) => item._id}
                            renderItem={({item, separators}) => (
                              <View style={{marginTop: 20}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                  <Text style={{flex: 1}}>{item.name}</Text>
                                  <Text style={{width: 70, textAlign: 'right'}}>
                                    {(() => { return Helper.formatCurrency(item.price) })()}
                                  </Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                                  <View style={{width: 50}}>
                                    <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.addMenu(item)}}>
                                      <MaterialIcons name='add' color={'#fff'} size={20} />
                                    </Button>
                                  </View>
                                  <View style={{width: 50}}>
                                    <Button full small style={{backgroundColor: '#6c757d'}} onPress={() => {this.removeMenu(item)}}>
                                      <MaterialIcons name='remove' color={'#fff'} size={20} />
                                    </Button>
                                  </View>
                                  <View style={{width: 50}}>
                                    {(() => {
                                      if (item.isTakeaway) {
                                        return (
                                          <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.takeawayMenu(item)}}>
                                            <MaterialIcons name='layers' color={'#fff'} size={20} />
                                          </Button>
                                        )
                                      } else {
                                        return (
                                          <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.takeawayMenu(item)}}>
                                            <MaterialIcons name='local-dining' color={'#fff'} size={20} />
                                          </Button>
                                        )
                                      }
                                    })()}
                                  </View>
                                  <View style={{width: 50}}>
                                    <Button full small style={{backgroundColor: '#6c757d'}} onPress={() => {this.noteMenu(item)}}>
                                      <MaterialIcons name='subject' color={'#fff'} size={20} />
                                    </Button>
                                  </View>
                                  <View style={{width: 50}}>
                                    {(() => {
                                      if (item.addons && item.addons.length > 0) {
                                        return (
                                          <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.showAddonScreen(item)}}>
                                            <MaterialIcons name='star' color={'#fff'} size={20} />
                                          </Button>
                                        )
                                      } else {
                                        return (
                                          <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.showAddonScreen(item)}}>
                                            <MaterialIcons name='code' color={'#fff'} size={20} />
                                          </Button>
                                        )
                                      }
                                    })()}
                                  </View>
                                  <View style={{flex: 1}}/>
                                  <Text style={{width: 70, textAlign: 'right', color: '#DE544E', fontSize: 22}}>x{item.quantity}</Text>
                                </View>
                                {(() => {
                                  if (item.isEdittingNote) {
                                    return (
                                      <TextInput defaultValue={item.note} onChangeText={(text) => this.onMenuNoteChanged(item, text)} multiline = {true} style={{marginTop: 10, fontSize: 20, height: 85, backgroundColor: '#fff', borderColor: '#d2d3d4', borderWidth: 1}}/>          
                                    )
                                  } else {
                                    return (
                                      <View />
                                    )
                                  } 
                                })()}
                              </View>
                            )}
                          />
                        )
                        break;

                      case DISPLAY_MODE.ADDON:
                        return (
                          <FlatList style={{marginLeft: 10, marginRight: 10}}
                            data={this.state.selectedMenu.addons}
                            keyExtractor={(item) => item._id}
                            renderItem={({item, separators}) => (
                              <View style={{marginTop: 20}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                  <Text style={{flex: 1}}>{item.name}</Text>
                                  <Text style={{width: 70, textAlign: 'right'}}>
                                    {(() => { return Helper.formatCurrency(item.price) })()}
                                  </Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                                  <View style={{width: 50}}>
                                    <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.addAddon(item)}}>
                                      <MaterialIcons name='add' color={'#fff'} size={20} />
                                    </Button>
                                  </View>
                                  <View style={{width: 50}}>
                                    <Button full small style={{backgroundColor: '#6c757d'}} onPress={() => {this.removeAddon(item)}}>
                                      <MaterialIcons name='remove' color={'#fff'} size={20} />
                                    </Button>
                                  </View>
                                  <View style={{flex: 1}}/>
                                  <Text style={{width: 70, textAlign: 'right', color: '#DE544E', fontSize: 22}}>x{item.quantity}</Text>
                                </View>
                              </View>
                            )}
                          />
                        )
                        break;

                      case DISPLAY_MODE.DISCOUNT:
                        return (
                          <FlatList style={{marginLeft: 10, marginRight: 10}}
                            data={this.state.order.discounts}
                            keyExtractor={(item) => item._id}
                            renderItem={({item, separators}) => (
                              <View style={{marginTop: 20}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                  <Text style={{flex: 1}}>{item.name}</Text>
                                  <Text style={{width: 70, textAlign: 'right'}}>
                                    {(() => { 
                                      if (item.isPercentOff) {
                                        return `${item.discount}%`;
                                      } else {
                                        return Helper.formatCurrency(item.discount);
                                      } 
                                    })()}
                                  </Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                                  <View style={{width: 50}}>
                                    <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.addDiscount(item)}}>
                                      <MaterialIcons name='add' color={'#fff'} size={20} />
                                    </Button>
                                  </View>
                                  <View style={{width: 50}}>
                                    <Button full small style={{backgroundColor: '#6c757d'}} onPress={() => {this.removeDiscount(item)}}>
                                      <MaterialIcons name='remove' color={'#fff'} size={20} />
                                    </Button>
                                  </View>
                                  <View style={{flex: 1}}/>
                                  <Text style={{width: 70, textAlign: 'right', color: '#DE544E', fontSize: 22}}>x{item.quantity}</Text>
                                </View>
                              </View>
                            )}
                          />
                        )                      
                        break;

                      case DISPLAY_MODE.CHECKOUT:
                        return (
                          <View style={{marginTop: 20, marginLeft: 10, marginRight: 10}}>
                            <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                              <Text style={{flex: 1}}>CASH</Text>
                            </View>

                            <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                              <TextInputMask type={'money'} options={{unit: '$', separator: '.', delimiter: ','}} selectTextOnFocus value={(() => { return Helper.formatCurrency(this.state.order.cash) })()} onChangeText={(text) => this.onCashChanged(text)} style={{fontSize: 25, height: 40, backgroundColor: '#fff', borderColor: '#d2d3d4', borderWidth: 1, textAlign: 'right', flex: 1}}/>          
                            </View>

                            <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                              <Text style={{flex: 1}}>CHANGE</Text>
                              <Text style={{width: 200, textAlign: 'right', fontSize: 25, color: '#DE544E'}}>
                                {(() => { 
                                  if (this.state.order.change >= 0) {
                                    return Helper.formatCurrency(this.state.order.change) 
                                  } else {
                                    return "(" + Helper.formatCurrency(-1 * this.state.order.change) + ")"
                                  }
                                })()}
                              </Text>
                            </View>

                            <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                              <Text style={{flex: 1}}>NOTE</Text>
                            </View>

                            <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                              <TextInput defaultValue={this.state.order.note} onChangeText={(text) => this.onNoteChanged(text)} multiline = {true} style={{marginTop: 10, fontSize: 20, height: 85, backgroundColor: '#fff', borderColor: '#d2d3d4', borderWidth: 1, flex: 1}}/>                              
                            </View>                           
                          </View>
                        )
                        break;
                    }
                  })()}
                </ScrollView>

                <View style={{height: 90, marginTop: 30, marginLeft: 10, marginRight: 10}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{flex: 1}}>SUBTOTAL</Text>
                    <Text style={{width: 200, textAlign: 'right'}}>
                      {(() => { return Helper.formatCurrency(this.state.order.subtotal) })()}
                    </Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{flex: 1}}>DISCOUNT</Text>
                    <Text style={{width: 200, textAlign: 'right'}}>
                      {(() => { return Helper.formatCurrency(this.state.order.discount) })()}
                    </Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{flex: 1}}>TAX</Text>
                    <Text style={{width: 200, textAlign: 'right'}}>
                      {(() => { return Helper.formatCurrency(this.state.order.tax) })()}
                    </Text>
                  </View>
                </View>

                <View style={{height: 40, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{flex: 1, fontSize: 30, color: 'rgb(70, 70, 70)'}}>TOTAL</Text>
                    <Text style={{width: 200, textAlign: 'right', fontSize: 30, color: '#DE544E'}}>
                      {(() => { return Helper.formatCurrency(this.state.order.total) })()}
                    </Text>
                  </View>
                </View>

                {(() => { 
                  if (this.state.displayMode === DISPLAY_MODE.CHECKOUT) {
                    return (
                      <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                        <View style={{flex: 1}}>
                          <Button full onPress={() => this.save()} style={{backgroundColor: '#28a745'}}><Text> SAVE </Text></Button>
                        </View>
                      </View>
                    )
                  } else {
                    return (
                      <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                        <View style={{width: 170}}>
                          <Button full onPress={() => this.discard()} style={{backgroundColor: '#6c757d'}}><Text> DISCARD </Text></Button>
                        </View>
                        <View style={{flex: 1}} />
                        <View style={{width: 170}}>
                          <Button full onPress={() => this.checkout()} style={{backgroundColor: '#2177b4'}}><Text> ORDER </Text></Button>
                        </View>
                      </View>
                    )
                  }
                })()}
              </View>
            </View>

            {(() => {
              switch(this.state.displayMode) {
                case DISPLAY_MODE.MENU:
                  return (
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
                      <View style={{width: 150, height: 60, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                        {(() => {
                          return (
                            <Button full large onPress={() => this.showDiscountScreen()} style={{backgroundColor: '#2177b4'}}>
                              <Text style={{fontSize: 20}}> DISCOUNT </Text>              
                            </Button>
                          )
                        })()}
                      </View>
                      <View style={{width: 60, height: 60, marginTop: 10, marginLeft: 10, marginRight: 20}}>
                        {(() => {
                          return (
                            <Button full large onPress={() => this.backCategory()} style={{backgroundColor: '#2177b4'}}>
                              <MaterialIcons name='arrow-upward' color={'#fff'} size={20} />              
                            </Button>
                          )
                        })()}
                      </View>
                      <View style={{flex: 1, marginRight: 10}}>
                        <ScrollView horizontal={true} style={{flex: 1, flexDirection: 'row'}}>
                          {this.state.filteredCategories.map(category => (
                            <View key={category._id} style={{width: 150, height: 60, marginTop: 10, marginRight: 10}}>
                              {(() => {
                                if (this.selectedCategory && this.selectedCategory._id === category._id) {
                                  return (
                                    <Button full large success onPress={() => this.selectCategory(category)} style={{backgroundColor: '#2177b4'}}><Text style={{fontSize: 18}}> {category.name} </Text></Button>
                                  )
                                } else {
                                  return (
                                    <Button full large success onPress={() => this.selectCategory(category)} style={{backgroundColor: '#DE544E'}}><Text style={{fontSize: 18}}> {category.name} </Text></Button>
                                  )
                                }
                              })()}
                            </View>
                          ))}
                        </ScrollView>
                      </View>
                    </View>
                  )
                  break;

                case DISPLAY_MODE.ADDON:
                  return (
                    <View style={{flex: 1, flexDirection: 'row', height: 60, backgroundColor: '#f2f3f4'}}>
                      <View style={{width: 150, height: 60, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                        <Button full large onPress={() => this.showMenuScreen()} style={{backgroundColor: '#2177b4'}}>
                          <Text style={{fontSize: 20}}> MENU </Text>
                        </Button>
                      </View>
                    </View>
                  )
                  break;

                case DISPLAY_MODE.DISCOUNT:
                  return (
                    <View style={{flex: 1, flexDirection: 'row', height: 60, backgroundColor: '#f2f3f4'}}>
                      <View style={{width: 150, height: 60, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                        <Button full large onPress={() => this.showMenuScreen()} style={{backgroundColor: '#2177b4'}}>
                          <Text style={{fontSize: 20}}> MENU </Text>              
                        </Button>
                      </View>
                      <View style={{flex: 1}}>
                      </View>
                    </View>
                  )
                  break;

                case DISPLAY_MODE.CHECKOUT:
                  return (
                    <View style={{flex: 1, flexDirection: 'row', height: 60, backgroundColor: '#f2f3f4'}}>
                      <View style={{width: 150, height: 60, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                        <Button full large onPress={() => this.showMenuScreen()} style={{backgroundColor: '#2177b4'}}>
                          <Text style={{fontSize: 20}}> MENU </Text>              
                        </Button>
                      </View>
                      <View style={{flex: 1}}>
                      </View>
                    </View>
                  )
                  break;
              }
            })()}
          </View>
        </Content>
      </Container>
    );
  }
}

Order.propTypes = {
};

export default Order;
