import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';

import AppNavigator from './navigator';

class App extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isLoggedIn: false,
  //     isLoginChecked: false
  //   };
  // }

  // componentWillMount() {
  //   isSignedIn()
  //     .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
  //     .catch(err => alert("An error occurred"));
  // }

  // render() {
  //   const { checkedSignIn, signedIn } = this.state;

  //   // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
  //   if (!checkedSignIn) {
  //     return null;
  //   }

  //   const Layout = createRootNavigator(signedIn);
  //   return <Layout />;
  // }

  render() {
    const { dispatch, router } = this.props;
    const navigation = addNavigationHelpers({
      dispatch: dispatch,
      state: router,
    });

    return (
      <AppNavigator navigation = { navigation } />
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

const State = state => {
  return {
    router: state.router
  }
};

export default connect(State)(App);
