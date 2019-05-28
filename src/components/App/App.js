import React, { Component } from 'react';
import ons from 'onsenui';
import { register } from 'timeago.js';
import nlLocale from 'timeago.js/lib/lang/nl';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../lib/firebase';
import '../../style/index';
import './App.css';
import AuthStore from '../../stores/AuthStore';
import PublicChatStore from '../../stores/PublicChatStore';
import Loading from '../Loading/Loading';
import Routes from '../Routes/Routes';
import 'onsenui/css/onsenui.css';
import FirebaseContext from '../Firebase';
import firebase from '../../lib/firebase';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import nl from 'date-fns/locale/nl'

ons.platform.select('android');
register('nl', nlLocale);
console.log('nl test', nl);


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: AuthStore.isAuthenticated,
      userHasAuthenticated: AuthStore.userHasAuthenticated,
      user: AuthStore.user
    };

    AuthStore.on('change', this.handleAnyStoreChange);
    PublicChatStore.on('change', this.handleAnyStoreChange);
  }

  componentWillUnmount() {
    AuthStore.removeListener('change', this.handleAnyStoreChange);
    PublicChatStore.removeListener('change', this.handleAnyStoreChange);
  }

  handleAnyStoreChange = () => {
    if (this.state.userHasAuthenticated !== AuthStore.userHasAuthenticated
      || this.state.isAuthenticated !== AuthStore.isAuthenticated) {

      this.setState({
        userHasAuthenticated: AuthStore.userHasAuthenticated,
        isAuthenticated: AuthStore.isAuthenticated
      });
    }
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.state.userHasAuthenticated
    };

    console.log('child props', childProps);

    return (
      <div className="App">
        {this.state.userHasAuthenticated ? <Router>
          <Routes childProps={childProps} />
        </Router> : <Loading />}
      </div>
    );
  }
}

export default () => {
  return (
    <FirebaseContext.Provider value={firebase}>
      <App />
    </FirebaseContext.Provider>
  );
}
